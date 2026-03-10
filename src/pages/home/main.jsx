import "../../styles/home/main.scss";
import ChatFixo from "./chat_fixo";
import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Main() {
    const navigate = useNavigate();
    const Agendamento = () => {
        navigate("/entrar");
    };

    return (
        <main className="banner-home">
            <div className="content-banner">
                    <div className="frase">
                        <h1>Inicie uma vida saudável hoje!</h1>
                    </div>
                <div className="title">
                    <h1 className="nome">Sou Manuela,</h1>
                    <h1>Sua Nutricionista Pessoal</h1>
                    <p>
                        Especialista em nutrição comportamental. Transforme sua vida por
                        meio de uma alimentação consciente e saudável.
                    </p>
                    <button className="get-started" onClick={Agendamento}>
                        Agendar Consulta
                    </button>

                    <div className="follow">
                        <span>Me siga</span> <div className="bar"></div>
                        <div className="icons">
                            <a href="#">
                                <FaInstagram size={25} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="cards-banner">
                    <div className="card">
                        <span>6+</span>
                        <p>Experiência</p>
                    </div>
                    <div className="card">
                        <span>1000+</span>
                        <p>Consultas realizadas</p>
                    </div>
                    <div className="card">
                        <span>100+</span>
                        <p>Dietas personalizadas</p>
                    </div>
                </div>
            </div>

            <ChatFixo />
        </main>
    );
}
