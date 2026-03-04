import {
  ArrowLeft,
  CircleX,
  ClipboardClock,
  FilePlusCorner,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../../styles/perfil-nutri/visualizar-pacientes.scss";
import axios from "axios";
import { UseAuth } from "../../../context/context";
import { useState, useEffect } from "react";

export default function VisualizarPacientes() {
  const { usuario } = UseAuth();

  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFicha, setShowFicha] = useState(false);
  const [fichaData, setFichaData] = useState(null);
  const [modalOpenId, setModalOpenId] = useState(null);
  const [confirmMsgs, setConfirmMsgs] = useState({});
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Buscar agendamentos quando o componente carregar ou quando o usuário mudar
  useEffect(() => {
    if (usuario?.id) {
      fetchAgendamentos();
    }
  }, [usuario]);

  // 1. Função para buscar os agendamentos do nutricionista
  async function fetchAgendamentos() {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/nutricionista/pacientes-agendados",
        {
          params: { nutricionista_id: usuario.id },
        },
      );
      console.log("Dados recebidos:", response.data.agendamentos);
      setAgendamentos(response.data.agendamentos || []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  }

  // 2. Função para atualizar o status do agendamento
  async function atualizarStatus(agendamentoId, novoStatus) {
    console.log("🔄 Atualizando status:", { agendamentoId, novoStatus });
    try {
      setUpdatingStatusId(agendamentoId);
      const response = await axios.patch(`/api/nutricionista/agendamento/alterar-status`, {
        status: novoStatus,
        nutricionista_id: usuario.id,
        agendamento_id: agendamentoId,
      });
      console.log("✅ Resposta do servidor:", response.data);

      // Atualiza o estado local imediatamente após sucesso para refletir a mudança no UI.
      const novosAgendamentos = agendamentos.map((ag) =>
        ag.agendamento_id === agendamentoId ? { ...ag, status: novoStatus } : ag,
      );
      console.log("📋 Agendamentos atualizados:", novosAgendamentos);
      setAgendamentos(novosAgendamentos);

      // set o status-agendamento por item e exibe mensagem de confirmação temporária.
      setConfirmMsgs((prev) => ({ ...prev, [agendamentoId]: `Status atualizado para "${novoStatus}"!` }));
      setTimeout(() => {
        setConfirmMsgs((prev) => {
          const copy = { ...prev };
          delete copy[agendamentoId];
          return copy;
        });
      }, 5000);

      // Close modal shortly after success
      setTimeout(() => setModalOpenId(null), 2000);

      // Enviar email ao paciente (status capitalizado)
      const statusCapitalizado = novoStatus.charAt(0).toUpperCase() + novoStatus.slice(1);
      await axios.post("/api/nutricionista/notificar-paciente", {
        agendamento_id: agendamentoId,
        status: statusCapitalizado,
      });
      setUpdatingStatusId(null);
    } catch (error) {
      console.error("❌ Erro ao atualizar status:", error);
      setUpdatingStatusId(null);
    }
  }

  // 3. Função para visualizar a ficha de anamnese do paciente
  async function handleVerFicha(pacienteId) {
    try {
      const response = await axios.get(
        `/api/nutricionista/ficha/${pacienteId}`,
      );
      console.log("Dados da ficha recebidos:", response.data);
      setFichaData(response.data);
      setShowFicha(true);
    } catch (error) {
      console.error("Erro ao buscar ficha do paciente:", error);
      alert(
        "❌ Erro ao carregar ficha do paciente. Tente novamente mais tarde.",
      );
    }
  }

  // 4. Função para apagar um agendamento
  async function handleApagarAgendamento(agendamentoId) {
    if (!window.confirm("Tem certeza que deseja apagar este agendamento?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `/api/nutricionista/agendamento/${agendamentoId}`,
      );
      console.log("✅ Agendamento apagado:", response.data);
      fetchAgendamentos(); // Atualiza a lista de agendamentos após apagar
    } catch (error) {
      console.error("❌ Erro ao apagar agendamento:", error);
    }
  }

  const navigate = useNavigate();
  const voltar = () => {
    navigate("/nutricionista/perfil");
  };

  const emBreve = () => {
    alert("🚧🔨 Em breve esta funcionalidade estará disponível!");
  };

  return (
    <div className="container-viz-pacientes">
      <header className="main-header">
        <div className="infos">
          <h1>Visualizar agendamentos</h1>
          <p>
            Acompanhe os agendamentos dos seus pacientes e mantenha-se
            organizado(a).
          </p>
          <em>
            Cada paciente terá uma ficha de anamnese individual com informações
            detalhadas.
          </em>
        </div>
        <div className="btn-acoes">
          <button className="btn-back" onClick={voltar}>
            <ArrowLeft size={20} /> Voltar ao Perfil
          </button>
          <button className="historico" onClick={emBreve}>
            <ClipboardClock size={20} /> Histórico de Pacientes
          </button>
        </div>
      </header>

      <div className="content-pacientes">
        {loading ? (
          <p>Carregando agendamentos...</p>
        ) : agendamentos.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          agendamentos.map((agendamento) => {
            console.log(
              "Status do agendamento:",
              agendamento.status,
              "Tipo:",
              typeof agendamento.status,
            );
            return (
              <div key={agendamento.agendamento_id} className="box-paciente">
                <div className="div-ficha">
                  <h3>{agendamento.paciente_nome || "Nome não disponível"}</h3>
                  <div className="btn-flex">
                    <button
                      className="ver-ficha"
                      onClick={() => handleVerFicha(agendamento.paciente_id)}
                    >
                      <FilePlusCorner size={16} /> Ficha
                    </button>
                    <button
                      className="apagar"
                      onClick={() =>
                        handleApagarAgendamento(agendamento.agendamento_id)
                      }
                    >
                      <CircleX size={16} />
                      Apagar
                    </button>
                  </div>
                </div>
                <div className="infos-paragrafos">
                  <p className="p-info">
                    <strong>Email:</strong> {agendamento.paciente_email}
                  </p>
                  <p className="p-info">
                    <strong>Telefone:</strong> {agendamento.paciente_telefone}
                  </p>
                  <p className="p-info">
                    <strong>Data:</strong> {agendamento.dia}/
                    {agendamento.mes_ano}/{agendamento.ano}
                  </p>
                  <p className="p-info">
                    <strong>Horário:</strong> {agendamento.hora_agendamento}
                  </p>
                  <p className="p-info">
                    <div className="div-p-info-status">
                      <strong>Status:</strong>
                      {(() => {
                        const statusRaw = String(agendamento.status || "");
                        const statusNorm = statusRaw.toLowerCase();
                        const statusDisplay = statusRaw
                          ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1)
                          : "-";
                        return (
                          <>
                            <span className={`status-${statusNorm}`}>{statusDisplay}</span>
                            <button
                              className="show-modal-status"
                              onClick={() =>
                                setModalOpenId(
                                  modalOpenId === agendamento.agendamento_id
                                    ? null
                                    : agendamento.agendamento_id,
                                )
                              }
                            >
                              Alterar
                            </button>
                          </>
                        );
                      })()}
                    </div>

                    {/* Modal de alteração de status, exibido apenas para o agendamento selecionado */}

                    {modalOpenId === agendamento.agendamento_id && (
                      <div
                        className="status-modal" onClick={() => setModalOpenId(null)}>
                        {confirmMsgs[agendamento.agendamento_id] && (
                          <p className="confirm-msg">{confirmMsgs[agendamento.agendamento_id]}</p>
                        )}
                        <div
                          className="status-modal-content"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p>Alterar Status do Agendamento</p>
                          <div className="status-opcoes">

                            <button
                              onClick={() => atualizarStatus(agendamento.agendamento_id, "confirmado")}
                              disabled={updatingStatusId === agendamento.agendamento_id}>
                              {updatingStatusId === agendamento.agendamento_id ? "Atualizando..." : "Confirmar"}
                            </button>

                            <button
                              onClick={() => atualizarStatus(agendamento.agendamento_id, "cancelado")}
                              disabled={updatingStatusId === agendamento.agendamento_id}>
                              {updatingStatusId === agendamento.agendamento_id ? "Atualizando..." : "Cancelar"}
                            </button>

                            <button
                              onClick={() => atualizarStatus(agendamento.agendamento_id, "concluido")}
                              disabled={updatingStatusId === agendamento.agendamento_id}>
                              {updatingStatusId === agendamento.agendamento_id ? "Atualizando..." : "Concluído"}
                            </button>

                          </div>
                          <button
                            className="fechar-modal"
                            onClick={() => setModalOpenId(null)}>
                            Fechar
                          </button>

                        </div>
                      </div>
                    )}
                  </p>

                  {/* Exibir botões de ação apenas para status "pendente" */}

                  {(agendamento.status === "pendente" ||
                    agendamento.status === "Pendente") && (
                    <div className="acoes">
                      <button
                        className="btn-confirmar"
                        onClick={() => {
                          console.log("Botão confirmar clicado!");
                          atualizarStatus(
                            agendamento.agendamento_id,
                            "confirmado",
                          );
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        className="btn-recusar"
                        onClick={() => {
                          console.log("Botão recusar clicado!");
                          atualizarStatus(
                            agendamento.agendamento_id,
                            "cancelado",
                          );
                        }}
                      >
                        Recusar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de ficha de anamnese */}

      {showFicha && fichaData && (
        <div className="overlay-ficha" onClick={() => setShowFicha(false)}>
          <div className="modal-ficha" onClick={(e) => e.stopPropagation()}>
            <h2>Ficha de Anamnese - {fichaData.paciente_nome}</h2>
            <div className="ficha-content">
              <div className="info-basica">
                <p>
                  <strong>Email:</strong>{" "}
                  {fichaData.paciente_email || "Não informado"}
                </p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {fichaData.paciente_telefone || "Não informado"}
                </p>
              </div>
              <div className="info-anamnese">
                <p>
                  <strong>Altura:</strong> {`${fichaData.altura} m`}
                </p>
                <p>
                  <strong>Peso:</strong> {`${fichaData.peso} kg`}
                </p>
                <p>
                  <strong>Alergias:</strong> {fichaData.alergias || "Nenhuma"}
                </p>
                <p>
                  <strong>Restrições Alimentares:</strong>{" "}
                  {fichaData.restricoes_alimentares || "Nenhuma"}
                </p>
                <p>
                  <strong>Objetivos:</strong>{" "}
                  {fichaData.objetivos || fichaData.objetivo || "Não informado"}
                </p>
              </div>
            </div>
            <button className="btn-fechar" onClick={() => setShowFicha(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
