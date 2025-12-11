import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from '../../context/context'; // Verifique se o caminho do context está correto
import axios from 'axios';
import { Calendar, Clock, User, LogOut, Stethoscope } from 'lucide-react';
import '../../styles/dashboard/pcDash.scss'; // Reutilizando estilos ou crie um pcDashboard.scss

export default function PacienteDashboard() {
    const { usuario, logout } = UseAuth();
    const navigate = useNavigate();

    const [listaMedicos, setListaMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
    const [medicoSelecionado, setMedicoSelecionado] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [horaConsulta, setHoraConsulta] = useState('');

    // Busca médicos ao carregar a página
    useEffect(() => {
        async function fetchMedicos() {
            try {
                const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const response = await axios.get(`${API}/api/medicos`);
                setListaMedicos(response.data);

                // Extrai especialidades únicas da lista de médicos
                const uniqueEspecialidades = [...new Set(response.data.map(m => m.especialidade))];
                setEspecialidades(uniqueEspecialidades);
            } catch (error) {
                console.error("Erro ao buscar médicos:", error);
                alert("Não foi possível carregar a lista de médicos.");
            }
        }
        fetchMedicos();
    }, []);

    // Busca consultas do paciente logado
    useEffect(() => {
        async function fetchConsultas() {
            try {
                const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const idPaciente = usuario?.id || usuario?.id_paciente;
                if (!idPaciente) return; // aguarda o contexto de autenticação

                const resp = await axios.get(`${API}/api/consultas/paciente/${idPaciente}`);
                setConsultas(resp.data || []);
            } catch (err) {
                console.error('Erro ao buscar consultas:', err);
            }
        }
        fetchConsultas();
    }, [usuario]);

    const handleLogout = () => {
        logout();
        navigate('/entrar');
    }

    const handleAgendamento = async (e) => {
        e.preventDefault();

        if (!medicoSelecionado || !dataConsulta || !horaConsulta) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Formata data e hora para o formato MySQL (YYYY-MM-DD HH:MM:SS)
        const dataFinal = `${dataConsulta} ${horaConsulta}:00`;

        try {
            const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            await axios.post(`${API}/api/agendar`, {
                id_medico: Number(medicoSelecionado),
                id_paciente: Number(usuario?.id || usuario?.id_paciente), // Garante que pega o ID correto do contexto
                data_horario: dataFinal
            });

            alert(`✅ Consulta agendada com sucesso!`);
            // Limpar campos
            setDataConsulta('');
            setHoraConsulta('');
            setMedicoSelecionado('');
            setEspecialidadeSelecionada('');
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao conectar.";
            alert(`❌ Falha ao agendar: ${msg}`);
        }
    }

    // Filtra médicos baseados na especialidade selecionada
    const medicosFiltrados = listaMedicos.filter(
        medico => medico.especialidade === especialidadeSelecionada
    );

    return (
        <div className="container-dashboard">

            <div className="container-box">
                <div className="box-title-dashboard" >
                    <div className="sair">
                        <button onClick={handleLogout} >
                            <LogOut size={18} /> Sair do perfil
                        </button>
                    </div>
                    <div className="banner-dashboard">
                        <h1>Olá, {usuario?.nome}</h1>
                        <p>Área do Paciente</p>
                        <p className="info">Essa é a área onde você pode agendar e visualizar suas consultas e exames.</p>
                    </div>
                </div>

                <div className="content-dashboard">

                    {/* Lado Esquerdo: Formulário de Agendamento */}
                    <div className="box-inputs-agendamento">
                        <div className="title">
                            <h3><Calendar size={20} /> Agendar Consulta</h3>
                        </div>
                        <form onSubmit={handleAgendamento}>

                            {/* Seleção de Especialidade */}
                            <label>Especialidade</label>
                            <select
                                value={especialidadeSelecionada}
                                onChange={(e) => {
                                    setEspecialidadeSelecionada(e.target.value);
                                    setMedicoSelecionado(''); // Reseta médico ao trocar especialidade
                                }}
                            >
                                <option value="">Selecione uma especialidade...</option>
                                {especialidades.map((esp, index) => (
                                    <option key={index} value={esp}>{esp}</option>
                                ))}
                            </select>

                            {/* Seleção de Médico (só aparece se especialidade for escolhida) */}
                            <label>Médico</label>
                            <select
                                value={medicoSelecionado}
                                onChange={(e) => setMedicoSelecionado(e.target.value)}
                                disabled={!especialidadeSelecionada}
                            >
                                <option value="">Selecione o médico...</option>
                                {medicosFiltrados.map((medico) => (
                                    <option key={medico.id_medico} value={medico.id_medico}>
                                        Dr(a). {medico.nome}
                                    </option>
                                ))}
                            </select>

                            {/* Data e Hora lado a lado */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label>Data</label>
                                    <input
                                        type="date"
                                        value={dataConsulta}
                                        onChange={(e) => setDataConsulta(e.target.value)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Horário</label>
                                    <input
                                        type="time"
                                        value={horaConsulta}
                                        onChange={(e) => setHoraConsulta(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button type="submit">
                                Confirmar Agendamento
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* abaixo: Informações ou Histórico (visual básico) */}
            <div className="info-painel">
                <h3><Stethoscope size={20} /> Suas Consultas</h3>
                <p>
                    Aqui aparecerão suas consultas futuras assim que você agendar.
                </p>

                {consultas.length === 0 ? (
                    <div style={{ marginTop: 10 }}>
                        <em>Nenhuma consulta encontrada.</em>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
                        {consultas.map((c) => {
                            const dt = new Date(c.data_consulta);
                            const formatted = isNaN(dt.getTime()) ? c.data_consulta : dt.toLocaleString();
                            return (
                                <div key={c.id_consulta} style={{ background: 'white', padding: '12px', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
                                    <strong>{c.especialidade || 'Consulta'}</strong>
                                    <div style={{ fontSize: 14, marginTop: 6 }}>
                                        Dr(a). {c.medico_nome} — {formatted}
                                    </div>
                                    {c.diagnostico && <div style={{ marginTop: 6, color: '#555' }}>{c.diagnostico}</div>}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}