import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../../context/context";
import { Calendar } from 'react-calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, LogOut, UserCircle, CheckCircle, ClipboardClock } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react"; // biblioteca de sildes
import { EffectFade, EffectCoverflow, Navigation } from "swiper/modules"; // efeitos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../../styles/react-calendar.css'
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
    const [loading, setLoading] = useState(false);
    const [loadingAgenda, setLoadingAgenda] = useState(false);
    const [horariosFixos, setHorariosFixos] = useState([]);
    const swiperRef = useRef(null);

    const { usuario, logout } = UseAuth();
    const navigate = useNavigate();

    const sexoValido = usuario?.sexo === "M" || usuario?.sexo === "F" || usuario?.sexo === "Outro";
    const faltaInfo = !usuario?.telefone || !sexoValido;

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
        setErro('');
        if (!nutriSelecionado) {
            setDiasDisponiveis([]);
            setHorariosOcupados([]);
            setHorariosFixos([]);
            return;
        }

        async function fetchAgenda() {
            setLoadingAgenda(true);
            try {
                const responseDias = await axios.get('/api/nutricionista/agenda/dias-disponiveis', {
                    params: { nutricionista_id: nutriSelecionado }
                });

                const responseOcupados = await axios.get('/api/nutricionista/agenda/horarios-ocupados', {
                    params: { nutricionista_id: nutriSelecionado }
                });

                const responseFixos = await axios.get('/api/nutricionista/horario-fixo/listar', {
                    params: { nutricionista_id: nutriSelecionado }
                })

                setDiasDisponiveis(responseDias.data.dias || []);
                setHorariosOcupados(responseOcupados.data.ocupados || []);
                setHorariosFixos(responseFixos.data.horarios || []);

                if ((!responseDias.data.dias || responseDias.data.dias.length === 0) &&
                    (!responseFixos.data.horarios || responseFixos.data.horarios.length === 0)) {
                    setErro('Este nutricionista ainda não disponibilizou horários na agenda.');
                }

            } catch (error) {
                console.error("Erro ao buscar agenda: ", error);
                setErro("Não foi possível carregar a agenda. Tente novamente mais tarde.");
            } finally {
                setLoadingAgenda(false);
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
        if (swiperRef.current) {
            swiperRef.current.slideTo(1);
        }

        const diaSemana = date.getDay();
        const diaNum = date.getDate();
        const meses = [
            'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const mesNome = meses[date.getMonth()];
        const anoNum = date.getFullYear();

        // 1. Prioriza data manual (se houver), senão usa a fixa
        const configManual = diasDisponiveis.find(d => d.dia === diaNum && d.mes === mesNome && d.ano === anoNum);
        const configFixa = horariosFixos.find(h => h.dia_semana === diaSemana);

        let slotsBrutos = [];

        if (configManual) {
            slotsBrutos = gerarHorarios(configManual.hora_inicio, configManual.hora_fim, configManual.tempo_atendimento);
        } else if (configFixa) {
            // Converte o intervalo fixo (ex: 60) para o formato string esperado pela função gerarHorarios
            const intervaloStr = minutosParaHoras(configFixa.intervalo_consulta);
            slotsBrutos = gerarHorarios(configFixa.hora_inicio, configFixa.hora_fim, intervaloStr);
        }

        // 2. Filtrar ocupados (Mantém sua lógica original)
        const ocupadosDoDia = (horariosOcupados || [])
            .filter(h => h.dia === diaNum && h.mes === mesNome && h.ano === anoNum)
            .map(h => (h.hora_agendamento || '').substring(0, 5));

        const listaFinal = slotsBrutos.filter(h => !ocupadosDoDia.includes(h));
        setHorariosGerados(listaFinal);

    };

    const diasIndisponiveis = ({ date, view }) => {
        if (view === 'month') {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            if (date < hoje) return true; // Bloqueia passado

            const diaSemana = date.getDay(); // 0 (Dom) a 6 (Sab)
            const diaNum = date.getDate();
            const meses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            const mesNome = meses[date.getMonth()];
            const anoNum = date.getFullYear();

            // Verifica se tem horário fixo para este dia da semana
            const temFixo = horariosFixos.some(h => h.dia_semana === diaSemana);

            // Verifica se tem data manual (específica)
            const temManual = diasDisponiveis.some(d =>
                d.dia === diaNum && d.mes === mesNome && d.ano === anoNum
            );

            return !(temFixo || temManual);
        }
        return false;
    };

    const handleConfirmar = async () => {
        if (!dataSelecionada || !horarioEscolhido) return;
        if (faltaInfo) {
            setErro('Para agendar, complete seu telefone e sexo.');
            return;
        }
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    const fecharModal = () => {
        setConfirmModal(false);
        navigate('/');
    }

    const ficha = () => {
        navigate('/paciente/ficha');
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
                    <em>O preenchimento da ficha médica é opcional.</em>
                </div>

                {faltaInfo && (
                    <div className="alert-falta-info">
                        <div className="alert-text">
                            <strong>Antes de agendar:</strong> complete seu <span>telefone</span> e <span>sexo</span>.
                        </div>
                        <button className="btn-completar" onClick={() => navigate('/paciente/dados')}>
                            Completar dados
                        </button>
                    </div>
                )}

                <div className="select-nutricionista">
                    <label>Selecione um profissional e preencha sua ficha</label>
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
                        <div className="ficha-paciente">
                            <button onClick={ficha}><ClipboardClock size={20} /> Preencher ficha</button>
                        </div>
                        <div className="dados-paciente">
                            <button onClick={() => navigate('/paciente/dados')}>
                                Editar dados
                            </button>
                        </div>
                    </div>
                </div>

                {erro && <div className="mensagem-erro">{erro}</div>}
            </header>

            <div className="content-grid">
                <Swiper
                    navigation={true}
                    modules={[Navigation, EffectCoverflow, EffectFade]}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        900: { slidesPerView: 2 }
                    }}
                >
                    {/* Coluna Esquerda: Calendário */}
                    <SwiperSlide>
                        <div className="card card-calendario">
                            <div className="card-header">
                                <CalendarIcon size={20} className="icon-primary" />
                                <h3>Escolha a Data</h3>
                            </div>

                            {!nutriSelecionado ? (
                                <div className="empty-state">
                                    <p>👆 Selecione um profissional acima para visualizar o calendário.</p>
                                </div>
                            ) : loadingAgenda ? (
                                <div className="empty-state">
                                    <div className="spinner"></div>
                                    <p>Carregando agenda...</p>
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
                    </SwiperSlide>

                    {/* Coluna Direita: Horários */}
                    <SwiperSlide>
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
                                    <button className="btn-confirmar" onClick={handleConfirmar} disabled={loading || faltaInfo}>
                                        {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Modal de Sucesso */}
            {confirmModal && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon-wrapper">
                            <CheckCircle size={48} className="icon-success" />
                        </div>
                        <h2>Agendamento enviado para nutricionista!</h2>
                        <p>Aguarde a confirmação</p>
                        <p className="modal-subtext">Um e-mail de confirmação ou cancelamento será enviado com todas as informações</p>
                        <button className="btn-fechar" onClick={fecharModal}>Ir para a tela inicial</button>
                    </div>
                </div>
            )}
        </div>
    )
}
