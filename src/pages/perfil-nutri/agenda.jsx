import { Calendar } from "react-calendar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import '../../styles/perfil-nutri/agenda.scss';
import 'react-calendar/dist/Calendar.css';
import { UseAuth } from "../../context/context";

import { useState } from "react";
import axios from "axios";

export default function AgendaCustom() {
    const [data, setData] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [tempoAtendimento, setTempoAtendimento] = useState('');

    const { usuario } = UseAuth();
    const navigate = useNavigate();

    const handleData = (date) => {
        setData(date);
        setShowOverlay(true);
    }

    const handleTempoAtendimento = async () => {
        if (!tempoAtendimento) {
            alert('Selecione um tempo de atendimento');
            return;
        }

        try {
            const response = await axios.post('/api/nutricionista/agenda/tempo-atendimento', {
                nutricionista_id: usuario.id,
                tempo_atendimento: tempoAtendimento
            });
            console.log(response.data.message);
            alert('Tempo de atendimento salvo!');
        } catch (error) {
            console.error('Erro ao salvar tempo de atendimento:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`Erro: ${msgErro}`);
        }
    }

    async function SalvarData(e) {
        e.preventDefault();

        if (!data || !horaInicio || !horaFim) {
            alert('Selecione uma data e os horários');
            return;
        }

        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const dadosData = {
            nutricionista_id: usuario.id,
            mes: meses[data.getMonth()],
            dia: data.getDate(),
            ano: data.getFullYear(),
            hora_inicio: horaInicio,
            hora_fim: horaFim,
            tempo_atendimento: tempoAtendimento
        }

        try {
            const response = await axios.post('/api/nutricionista/agenda/salvar-data', dadosData);
            console.log(response.data.message);
            alert('Data salva com sucesso!');
            setShowOverlay(false);
            setHoraInicio('');
            setHoraFim('');
        } catch (error) {
            console.error('Erro ao salvar data:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`${msgErro}`);
        }
    }

    const Voltar = () => {
        navigate('/nutricionista/perfil');
    }

    return (
        <div className="container-agenda">
            <div className="header-agenda">
                <div className="voltar">
                    <button onClick={Voltar}><ArrowLeft />Voltar</button>
                </div>
                <div className="title-agenda">
                    <h1>Essa é sua agenda</h1>
                    <p>Marque abaixo seus dias e horários de atendimento</p>
                    <span>As datas passadas não podem ser marcadas.</span><br />
                    <span>Os pacientes irão agendar a data que você marcar aqui.</span>
                </div>

                <div className="tempo-de-atendimento">
                    <span>*Importante</span>
                    <p>defina o seu tempo de atendimento</p>
                    <p className="ex">Ex 00:30 = 30 min</p>
                    <div className="box-tempo">
                    <input 
                        type="time" 
                        value={tempoAtendimento}
                        onChange={(e) => setTempoAtendimento(e.target.value)}
                        />
                    <button onClick={handleTempoAtendimento}>Salvar</button>
                        </div>
                </div>
            </div>



            <div className="calendar">
                <div className="data">
                    <Calendar 
                        onChange={handleData} 
                        value={data} 
                        minDate={new Date()}
                    />
                </div>
            </div>

            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h3>Horário para {data?.toLocaleDateString('pt-BR')}</h3>
                        <div className="horario-inputs">
                            <label>Horário de início:</label>
                            <input 
                                type="time" 
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                            />
                            <label>Horário de fim:</label>
                            <input 
                                type="time" 
                                value={horaFim}
                                onChange={(e) => setHoraFim(e.target.value)}
                            />
                        </div>
                        <div className="overlay-buttons">
                            <button onClick={() => setShowOverlay(false)}>Cancelar</button>
                            <button onClick={SalvarData}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
