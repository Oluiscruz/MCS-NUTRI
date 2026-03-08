import { UseAuth } from "../../context/context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    Calendar as CalendarIcon,
    Settings,
    AlertCircle,
} from "lucide-react";
import { Calendar } from "react-calendar";
import { Swiper, SwiperSlide } from "swiper/react"; // biblioteca de sildes
import { EffectFade, EffectCoverflow, Navigation } from "swiper/modules"; // efeitos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/perfil-nutri/agenda.scss";
import "../../styles/react-calendar.css";
import axios from "axios";

export default function AgendaCustom() {
    const [data, setData] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");
    const [tempoAtendimento, setTempoAtendimento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [mensagemTempo, setMensagemTempo] = useState("");
    const [slidersPerView, setSlidersPerView] = useState(1);

    const { usuario } = UseAuth();
    const navigate = useNavigate();

    const handleData = (date) => {
        setData(date);
        setShowOverlay(true);
    };

    const handleTempoAtendimento = async () => {
        if (!tempoAtendimento) {
            setMensagem("Selecione um tempo de atendimento");
            return;
        }

        try {
            const response = await axios.post(
                "/api/nutricionista/agenda/tempo-atendimento",
                {
                    nutricionista_id: usuario.id,
                    tempo_atendimento: tempoAtendimento,
                },
            );
            setMensagem("✅ Tempo de atendimento salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
            setMensagem("Erro ao salvar tempo de atendimento.");
        }
    };

    async function SalvarData(e) {
        e.preventDefault();
        if (!data || !horaInicio || !horaFim) {
            setMensagemTempo("Preencha todos os campos do horário");
            setTimeout(() => {
                setShowOverlay(false);
                setMensagemTempo("");
            }, 2000);
            return;
        }

        const meses = [
            "Janeiro",
            "Fevereiro",
            "Marco",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];
        const dadosData = {
            nutricionista_id: usuario.id,
            mes: meses[data.getMonth()],
            dia: data.getDate(),
            ano: data.getFullYear(),
            hora_inicio: horaInicio,
            hora_fim: horaFim,
            tempo_atendimento: tempoAtendimento,
        };

        try {
            await axios.post("/api/nutricionista/agenda/salvar-data", dadosData);

            setMensagemTempo("Horário de atendimento configurado!");
            setHoraInicio("");
            setHoraFim("");
            setTimeout(() => {
                setShowOverlay(false);
                setMensagemTempo("");
            }, 2000);
        } catch (error) {
            const msgErro = error.response
                ? error.response.data.message
                : "Erro ao salvar.";
            setMensagemTempo(msgErro);
            setTimeout(() => {
                setShowOverlay(false);
                setMensagemTempo("");
            }, 2000);
        }
    }

    return (
        <div className="container-agenda">
            <header className="main-header">
                <button
                    className="btn-back"
                    onClick={() => navigate("/nutricionista/perfil")}
                >
                    <ArrowLeft size={20} /> Voltar
                </button>
                <div className="brand-title">
                    <h1>Gestão de Agenda</h1>
                    <div className="infos">
                        <p>Defina o tempo das consultas.</p>
                        <p>Escolha datas e horários para agendamento.</p>
                    </div>
                </div>
            </header>

            <div className="aviso">
                <em>arraste para o lado para acessar a agenda</em>
                
            </div>
            <main className="content-grid">
                {/* Slider */}
                <Swiper
                    navigation={true}
                    modules={[Navigation, EffectCoverflow, EffectFade]}
                    slidesPerView={slidersPerView}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                >
                    {/* Coluna de Configurações */}
                    <SwiperSlide>
                        <aside className="settings-card">
                            <div className="card-header">
                                <Settings size={20} />
                                <h3>Configuração Padrão</h3>
                            </div>
                            <div className="setting-item">
                                <label>Duração da Consulta</label>
                                <p className="helper-text">
                                    Quanto tempo dura cada atendimento?
                                </p>
                                <div className="input-group">
                                    <input
                                        type="time"
                                        value={tempoAtendimento}
                                        onChange={(e) => setTempoAtendimento(e.target.value)}
                                    />
                                    <button
                                        onClick={handleTempoAtendimento}
                                        className="btn-save-sm"
                                    >
                                        Definir
                                    </button>
                                </div>

                                {mensagem &&
                                    (mensagem.includes("sucesso") ? (
                                        <p className="confirm-tempo-atendimento">{mensagem}</p>
                                    ) : (
                                        <p className="error-tempo-atendimento">{mensagem}</p>
                                    ))}
                            </div>
                            <div className="info-box">
                                <AlertCircle size={18} />
                                <p>
                                    Datas passadas ficam bloqueadas automaticamente para
                                    agendamento.
                                </p>
                            </div>
                        </aside>
                    </SwiperSlide>

                    <SwiperSlide>
                        {/* Seção do Calendário */}
                        <section className="calendar-card">
                            <div className="calendar-wrapper">
                                <Calendar
                                    onChange={handleData}
                                    value={data}
                                    minDate={new Date()}
                                    locale="pt-BR"
                                />
                            </div>
                        </section>
                    </SwiperSlide>
                </Swiper>
            </main>

            {showOverlay && (
                <div className="overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <CalendarIcon size={24} />
                            <h3>Configurar: {data?.toLocaleDateString("pt-BR")}</h3>
                        </div>

                        <div className="time-picker-section">
                            <div className="time-field">
                                <label>Início do Expediente</label>
                                <div className="input-with-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        value={horaInicio}
                                        onChange={(e) => setHoraInicio(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="time-field">
                                <label>Término do Expediente</label>
                                <div className="input-with-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        value={horaFim}
                                        onChange={(e) => setHoraFim(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowOverlay(false)}
                            >
                                Cancelar
                            </button>
                            <button className="btn-confirm" onClick={SalvarData}>
                                Salvar Disponibilidade
                            </button>
                        </div>
                    </div>
                    {mensagemTempo &&
                        (mensagemTempo.includes("sucesso") ||
                            mensagemTempo.includes("configurado") ? (
                            <div className="confirm-msg">{mensagemTempo}</div>
                        ) : (
                            <div className="error-msg">{mensagemTempo}</div>
                        ))}
                </div>
            )}
        </div>
    );
}
