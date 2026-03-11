import "../../styles/home/main.scss";
import ChatFixo from "./chat_fixo";
import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { UseAuth } from "../../context/context";
import { CircleCheckBig } from "lucide-react";

export default function Main() {
    const navigate = useNavigate();
    const entrar = () => {
        navigate("/entrar");
    };
    const consulta = () => {
        navigate('/paciente/agendar-consulta')
    }

    const agenda = () => {
        navigate('/nutricionista/perfil')
    }

    const { usuario } = UseAuth();

    return (
        <main className="banner-home">
            {usuario ? (
                <div className="content-banner">
                    {usuario.tipo === "paciente" ? (
                        <>
                            <div className="frase">
                                <h1>Olá, {usuario.nome}</h1>
                            </div>
                            <div className="content-info">
                                <div className="title">
                                    <h1 className="nome">Sou Manuela,</h1>
                                    <h1>Sua Nutricionista Pessoal</h1>
                                    <p>
                                        Especialista em nutrição comportamental.
                                    </p>
                                    <div className="start">
                                        <button onClick={consulta}>
                                            Agendar Consulta
                                        </button>

                                    </div>
                                </div>

                                <div className="banner-plano">
                                    <div className="plano">
                                        <h3>Plano Básico</h3>
                                        <div className="box-plano">
                                            <ul>
                                                <li>Consulta mensal <CircleCheckBig size={12} /></li>
                                                <li>Plano alimentar <CircleCheckBig size={12} /></li>
                                                <li>Acompanhamento <CircleCheckBig size={12} /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="follow">
                                    <span>Me siga</span> <div className="bar"></div>
                                    <div className="icons">
                                        <a href="#">
                                            <FaInstagram size={25} />
                                        </a>
                                    </div>
                                </div>


                            </div>
                        </>
                    ) : usuario.tipo === "nutricionista" ? (
                        <>
                            <div className="frase">
                                <h1>Bem Vinda, Doutora</h1>
                            </div>
                            <div className="content-info">
                                <div className="title">
                                    <h1 className="nome">Sou Manuela,</h1>
                                    <h1>Sua Nutricionista Pessoal</h1>
                                    <p>
                                        Especialista em nutrição comportamental.
                                    </p>
                                    <div className="start">
                                        <button onClick={agenda}>
                                            Agendar Consulta
                                        </button>
                                    </div>
                                </div>

                                <div className="banner-plano">
                                    <div className="plano">
                                        <h3>Plano Básico</h3>
                                        <div className="box-plano">
                                            <ul>
                                                <li>Consulta mensal <CircleCheckBig size={12} /></li>
                                                <li>Plano alimentar <CircleCheckBig size={12} /></li>
                                                <li>Acompanhamento <CircleCheckBig size={12} /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="follow">
                                    <span>Me siga</span> <div className="bar"></div>
                                    <div className="icons">
                                        <a href="#">
                                            <FaInstagram size={25} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="start">
                            <button onClick={entrar}>
                                Agendar Consulta
                            </button>
                        </div>
                    )}
                </div>

            ) : (
                <div className="content-banner">
                    <>
                        <div className="frase">
                            <h1>Inicie Uma Vida Saudável Hoje!</h1>

                        </div>
                        <div className="content-info">
                            <div className="title">
                                <h1 className="nome">Sou Manuela,</h1>
                                <h1>Sua Nutricionista Pessoal</h1>
                                <p>
                                    Especialista em nutrição comportamental.
                                </p>
                                <div className="start">
                                    <button onClick={entrar}>
                                        Agendar Consulta
                                    </button>

                                </div>
                            </div>

                            <div className="banner-plano">
                                <div className="plano">
                                    <h3>Plano Básico</h3>
                                    <div className="box-plano">
                                        <ul>
                                            <li>Consulta mensal <CircleCheckBig size={12} /></li>
                                            <li>Plano alimentar <CircleCheckBig size={12} /></li>
                                            <li>Acompanhamento <CircleCheckBig size={12} /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="follow">
                                <span>Me siga</span> <div className="bar"></div>
                                <div className="icons">
                                    <a href="#">
                                        <FaInstagram size={25} />
                                    </a>
                                </div>
                            </div>


                        </div>
                    </>
                </div>
            )}

            <ChatFixo />
        </main>
    );
}
