import { useState } from "react";

export default function historicoConsultas() {

    const [historico, setHistorico] = useState([]);
    return (
        <div className="container-historico">
            <h2>Histórico de Consultas</h2>
        </div>
    )
}