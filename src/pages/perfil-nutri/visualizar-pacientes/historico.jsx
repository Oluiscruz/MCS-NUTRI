import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../../context/context";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function HistoricoConsultas() {
    const [historico, setHistorico] = useState([]);
    const { usuario } = UseAuth();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const voltar = () => navigate("/nutricionista/visualizar-pacientes");

    useEffect(() => {
        if (usuario?.id) {
            fetchHistorico();
        }
    }, [usuario?.id]);

    async function fetchHistorico() {
        setLoading(true);

        try {
            const response = await axios.get(
                `/api/nutricionista/historico-consultas`,
                { params: { nutricionista_id: usuario.id } }
            );

            setHistorico(response.data.agendamentos || []);

        } catch (error) {
            console.error("Erro ao listar consultas", error.response?.data || error.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-viz-pacientes">
            <div className="main-header">
                <div className="infos">
                    <h1>Histórico de Consultas</h1>
                    <p>Consultas concluídas</p>
                </div>
                <div className="btn-acoes">
                    <button onClick={voltar}> <ArrowLeft size={20} /> Voltar</button>
                </div>
            </div>

            <div className="content-pacientes">
                {loading ? (
                    <p>Carregando histórico...</p>
                ) : historico.length === 0 ? (
                    <p>Nenhuma consulta concluída encontrada.</p>
                ) : (
                    historico.map((consulta) => (
                        <div key={consulta.agendamento_id} className="box-paciente">
                            <div className="div-ficha">
                                <h3>{consulta.paciente_nome}</h3>
                            </div>
                            <div className="infos-paragrafos">
                                <div className="p-info">
                                    <strong>Data:</strong>
                                    <span>{consulta.dia} de {consulta.mes_ano} de {consulta.ano}</span>
                                </div>
                                <div className="p-info">
                                    <strong>Horário:</strong>
                                    <span>{consulta.hora_agendamento}</span>
                                </div>
                                <div className="p-info">
                                    <strong>Email:</strong>
                                    <span>{consulta.paciente_email}</span>
                                </div>
                                <div className="p-info">
                                    <strong>Telefone:</strong>
                                    <span>{consulta.paciente_telefone || 'Não informado'}</span>
                                </div>
                                <div className="p-info">
                                    <strong>Status:</strong>
                                    <span className="status-concluido">Concluído</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
