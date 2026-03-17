import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { ArrowLeft, CheckCircle, Save } from "lucide-react";
import { UseAuth } from "../../context/context";
import "../../styles/perfil-paciente/dados-paciente.scss";

function normalizePhone(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function isValidSexo(value) {
  return value === "M" || value === "F" || value === "Outro";
}

export default function DadosPaciente() {
  const { usuario, updateUsuario } = UseAuth();
  const navigate = useNavigate();

  const initialTelefone = useMemo(
    () => normalizePhone(usuario?.telefone),
    [usuario?.telefone],
  );

  const [telefone, setTelefone] = useState(initialTelefone);
  const [sexo, setSexo] = useState(isValidSexo(usuario?.sexo) ? usuario.sexo : "");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSalvar(e) {
    e.preventDefault();

    const telefoneNormalizado = normalizePhone(telefone);
    if (!telefoneNormalizado) {
      setMensagem("❌ Informe um telefone.");
      return;
    }
    if (!isValidSexo(sexo)) {
      setMensagem("❌ Selecione o sexo.");
      return;
    }
    if (!usuario?.id) {
      setMensagem("❌ Usuário não identificado. Faça login novamente.");
      return;
    }

    const mudouTelefone = telefoneNormalizado !== normalizePhone(usuario?.telefone);
    const mudouSexo = sexo !== usuario?.sexo;

    if (!mudouTelefone && !mudouSexo) {
      setMensagem("Nada para atualizar.");
      return;
    }

    setLoading(true);
    setMensagem("");

    try {
      const requests = [];
      if (mudouTelefone) {
        requests.push(
          axios.patch("/api/paciente/telefone", {
            paciente_id: usuario.id,
            telefone: telefoneNormalizado,
          }),
        );
      }
      if (mudouSexo) {
        requests.push(
          axios.patch("/api/paciente/sexo", {
            paciente_id: usuario.id,
            sexo,
          }),
        );
      }

      const responses = await Promise.all(requests);
      const merged = responses.reduce(
        (acc, r) => ({ ...acc, ...(r.data?.usuario || {}) }),
        {},
      );
      updateUsuario(merged);

      setMensagem("✅ Dados atualizados com sucesso!");
      setTimeout(() => navigate("/paciente/agendar-consulta"), 700);
    } catch (error) {
      console.error("Erro ao atualizar dados do paciente:", error);
      const msg = error.response?.data?.message || "Erro ao atualizar. Tente novamente.";
      setMensagem(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-dados-paciente">
      <nav className="topbar">
        <button className="btn-nav" onClick={() => navigate("/paciente/agendar-consulta")}>
          <ArrowLeft size={18} /> Voltar
        </button>
      </nav>

      <header className="header-dados">
        <h1>Completar dados</h1>
        <p>Atualize seu telefone e sexo para conseguir agendar a consulta.</p>
      </header>

      {mensagem && (
        <div className={`mensagem ${mensagem.includes("✅") ? "ok" : "erro"}`}>
          {mensagem.includes("✅") ? <CheckCircle size={18} /> : null}
          <span>{mensagem}</span>
        </div>
      )}

      <form className="form-dados" onSubmit={handleSalvar}>
        <label>
          <span>*</span>Telefone
        </label>
        <NumericFormat
          value={telefone}
          onValueChange={(values) => setTelefone(values.value)}
          format="(##) #####-####"
          allowEmptyFormatting
          mask="_"
          placeholder="(00) 00000-0000"
        />

        <label>
          <span>*</span>Sexo
        </label>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="" disabled>
            Selecione...
          </option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="Outro">Outro</option>
        </select>

        <button className="btn-salvar" type="submit" disabled={loading}>
          <Save size={18} />
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

