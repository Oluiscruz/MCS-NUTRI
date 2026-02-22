import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../../context/context";
import { Calendar } from 'react-calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, LogOut, UserCircle, CheckCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css'; // Garantir que o CSS base do calendário seja importado
import '../../styles/perfil-paciente/agendarConsulta.scss';

export default function AgendarConsulta() {
    const [diasDisponiveis, setDiasDisponiveis] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [horariosGerados, setHorariosGerados] = useState([]);
    const [horarioEscolhido, setHorarioEscolhido] = useState(null);
    const [nutriSelecionado, setNutriSelecionado] = useState('');
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [nutricionistas, setNutricionistas] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [erro, setErro] = useState('');

    const { usuario, logout } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchNutricionistas() {
            try {
                const response = await axios.get('/api/nutricionistas/listar');
                setNutricionistas(response.data.nutricionistas || []);
            } catch (error) {
                console.error('Erro ao buscar nutricionistas:', error);
            }
        }
        fetchNutricionistas();
    }, []);

    useEffect(() => {
        setErro(''); // Limpa erros ao trocar de profissional
        if (!nutriSelecionado) {
            setDiasDisponiveis([]);
            setHorariosOcupados([])
            return;
        }

        async function fetchAgenda() {
            try {
                // Busca os dias de trabalho
                const responseDias = await axios.get('/api/nutricionista/agenda/dias-disponiveis', {
                    params: { nutricionista_id: nutriSelecionado }
                });

                // Busca os horários que JÁ FORAM agendados por outros pacientes
                const responseOcupados = await axios.get('/api/nutricionista/agenda/horarios-ocupados', {
                    params: { nutricionista_id: nutriSelecionado }
                });


                setDiasDisponiveis(responseDias.data.dias || []);
                // backend returns { ocupados } — usar o nome correto
                setHorariosOcupados(responseOcupados.data.ocupados || []);

                if (!responseDias.data.dias || responseDias.data.dias.length === 0) {
                    setErro('Este nutricionista ainda não disponibilizou horários na agenda.');
                }

            } catch (error) {
                console.error("Erro ao buscar agenda: ", error);
                setErro("Não foi possível carregar a agenda. Tente novamente mais tarde.");
            }
        }

        fetchAgenda();
    }, [nutriSelecionado]);

    const horasParaMinutos = (str) => {
        const [h, m] = str.split(':').map(Number);
        return h * 60 + m;
    }

    const minutosParaHoras = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    const gerarHorarios = (inicio, fim, tempo_atendimento) => {
        const slots = [];
        let atual = horasParaMinutos(inicio);
        const limite = horasParaMinutos(fim);
        const duracao = horasParaMinutos(tempo_atendimento || `00:30`);

        while (atual + duracao <= limite) {
            slots.push(minutosParaHoras(atual));
            atual += duracao;
        }
        return slots;
    };

    const handleCalendario = (date) => {
        setDataSelecionada(date);
        setHorarioEscolhido(null);

        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const diaNum = date.getDate();
        const mesNome = meses[date.getMonth()];
        const anoNum = date.getFullYear();

        const diaConfig = diasDisponiveis.find(d =>
            d.dia === diaNum &&
            d.mes === mesNome &&
            d.ano === anoNum
        );

        if (diaConfig) {
            // 1. Gera todos os horários que o profissional atende
            const listaCompleta = gerarHorarios(diaConfig.hora_inicio, diaConfig.hora_fim, diaConfig.tempo_atendimento);

            // 2. Filtra os horários já agendados por outros
            // O backend retorna dia, mes (nome), ano e hora_agendamento (formato "HH:MM").
            // Comparar por dia/mes/ano e extrair os primeiros 5 chars de hora_agendamento.
            const ocupadosDoDia = (horariosOcupados || [])
                .filter(h => h.dia === diaNum && h.mes === mesNome && h.ano === anoNum)
                .map(h => (h.hora_agendamento || '').substring(0, 5));

            // 3. Remove da lista os horários ocupados
            const listaFiltrada = listaCompleta.filter(horario => !ocupadosDoDia.includes(horario));

            setHorariosGerados(listaFiltrada);
            
        } else {
            setHorariosGerados([]);
        }
    };

    const diasIndisponiveis = ({ date, view }) => {
        if (view === 'month') {
            if (!diasDisponiveis || diasDisponiveis.length === 0) return true;

            const meses = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            
            const taDisponivel = diasDisponiveis.some(d =>
                d.dia === date.getDate() &&
                d.mes === meses[date.getMonth()] &&
                d.ano === date.getFullYear()
            );
            return !taDisponivel; 
        }
        return false;
    };

    const handleConfirmar = async () => {
        if (!dataSelecionada || !horarioEscolhido) return;

        try {
            await axios.post(`/api/paciente/agendamento/novo`, {
                paciente_id: usuario.id,
                nutricionista_id: nutriSelecionado,
                data_selecionada: dataSelecionada,
                horario: horarioEscolhido,
                status: 'Pendente'
            });

            setConfirmModal(true);
        } catch (error) {
            const msgError = error.response?.data?.message || "Não foi possível concluir o agendamento.";
            setErro(msgError);
        }
    };

    const fecharModal = () => {
        setConfirmModal(false);
        navigate('/');
    }

    return (
        <div className="container-agendamento">
            {/* Topbar de Navegação */}
            <nav className="topbar">
                <button className="btn-nav" onClick={() => navigate('/')}>
                    <ArrowLeft size={18} /> Voltar
                </button>
                <button className="btn-nav btn-logout" onClick={() => { logout(); navigate('/'); }}>
                    Sair <LogOut size={18} />
                </button>
            </nav>

            {/* Cabeçalho */}
            <header className="header-agendamento">
                <div className="title-header">
                    <h1>Olá, {usuario?.nome?.split(' ')[0]} 👋</h1>
                    <p>Vamos agendar sua próxima consulta? Escolha o profissional e o melhor horário para você.</p>
                </div>

                <div className="select-nutricionista">
                    <label htmlFor="nutri-select">Com qual profissional você deseja se consultar?</label>
                    <div className="select-wrapper">
                        <UserCircle className="select-icon" size={20} />
                        <select
                            id="nutri-select"
                            value={nutriSelecionado}
                            onChange={(e) => {
                                setNutriSelecionado(e.target.value);
                                setDataSelecionada(null);
                                setHorarioEscolhido(null);
                            }}
                        >
                            <option value="" disabled>Selecione um especialista...</option>
                            {nutricionistas.map((nutri) => (
                                <option key={nutri.id} value={nutri.id}>
                                    {nutri.nome} (CRN: {nutri.crn})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {erro && <div className="mensagem-erro">{erro}</div>}
            </header>

            <div className="content-grid">
                {/* Coluna Esquerda: Calendário */}
                <div className="card card-calendario">
                    <div className="card-header">
                        <CalendarIcon size={20} className="icon-primary" />
                        <h3>Escolha a Data</h3>
                    </div>
                    
                    {!nutriSelecionado ? (
                        <div className="empty-state">
                            <p>👆 Selecione um profissional acima para visualizar o calendário.</p>
                        </div>
                    ) : (
                        <Calendar
                            onChange={handleCalendario}
                            value={dataSelecionada}
                            tileDisabled={diasIndisponiveis}
                            minDate={new Date()}
                            className="custom-calendar"
                        />
                    )}
                </div>

                {/* Coluna Direita: Horários */}
                <div className="card card-horarios">
                    <div className="card-header">
                        <Clock size={20} className="icon-primary" />
                        <h3>Escolha o Horário</h3>
                    </div>

                    {!dataSelecionada ? (
                        <div className="empty-state">
                            <p>Selecione um dia disponível no calendário para ver os horários.</p>
                        </div>
                    ) : horariosGerados.length === 0 ? (
                        <div className="empty-state">
                            <p>Não há horários disponíveis para esta data.</p>
                        </div>
                    ) : (
                        <div className="grid-botoes">
                            {horariosGerados.map((horario) => (
                                <button
                                    key={horario}
                                    className={`btn-horario ${horarioEscolhido === horario ? 'selected' : ''}`}
                                    onClick={() => setHorarioEscolhido(horario)}
                                >
                                    {horario}
                                </button>
                            ))}
                        </div>
                    )}

                    {horarioEscolhido && (
                        <div className="resumo-confirmacao slide-up">
                            <div className="info-box">
                                <p>Sua consulta será no dia <strong>{dataSelecionada.toLocaleDateString('pt-BR')}</strong> às <strong>{horarioEscolhido}</strong>.</p>
                            </div>
                            <button className="btn-confirmar" onClick={handleConfirmar}>
                                Confirmar Agendamento
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Sucesso */}
            {confirmModal && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon-wrapper">
                            <CheckCircle size={48} className="icon-success" />
                        </div>
                        <h2>Agendamento Confirmado!</h2>
                        <p>Sua consulta foi reservada com sucesso.</p>
                        <p className="modal-subtext">Enviamos um e-mail com todos os detalhes, incluindo endereço e preparações para a consulta.</p>
                        <button className="btn-fechar" onClick={fecharModal}>Ir para a tela inicial</button>
                    </div>
                </div>
            )}
        </div>
    )
}