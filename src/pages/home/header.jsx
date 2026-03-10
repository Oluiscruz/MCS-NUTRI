import { Link, useNavigate } from "react-router-dom";
import { HeartPlus, TextAlignJustify, X } from "lucide-react";
import { UseAuth } from "../../context/context";
import "../../styles/home/home.scss";
import { useState } from "react";

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const { usuario } = UseAuth();

    function soon() {
        alert("🚧 Em construção! 🚧");
    }

    function scrollToServices() {
        document
            .querySelector(".container-section-home-dois")
            ?.scrollIntoView({ behavior: "smooth" });
    }

    const navigate = useNavigate();
    const Entrar = () => {
        navigate("/entrar");
    };
    const Agendamento = () => {
        navigate("/paciente/agendar-consulta");
    };
    const Perfil = () => {
        navigate("/nutricionista/perfil");
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>
                    {" "}
                    <i>
                        <HeartPlus size={35} />
                    </i>{" "}
                    Nutri<span>Ms</span>
                </h1>
            </div>

            {usuario ? (
                <nav className="links-header">
                    {usuario.tipo === "nutricionista" ? (
                        <>
                            <li>
                                <p>Bem vinda, {usuario.nome}</p>
                            </li>
                            <li>
                                <button className="account" onClick={Perfil}>
                                    {" "}
                                    Ver agendamentos
                                </button>
                            </li>

                            <button className="btn-menu" onClick={() => setOpenMenu(true)}>
                                <TextAlignJustify size={24} color="#4f46e5" />
                            </button>

                            <div
                                className={`overlay ${openMenu ? "show" : ""}`}
                                onClick={() => setOpenMenu(false)}
                            />

                            <div className={`side-menu ${openMenu ? "open" : ""}`}>
                                <button
                                    className="close-btn"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    <X size={24} />
                                </button>

                                <nav>
                                    <li>
                                        <p>Bem vinda, {usuario.nome}</p>
                                    </li>

                                    <button
                                        className="account"
                                        onClick={() => {
                                            Entrar();
                                            setOpenMenu(false);
                                        }}
                                    >
                                        Marcar Consulta
                                    </button>
                                </nav>
                            </div>
                        </>
                    ) : usuario.tipo === "paciente" ? (
                        <div className="links">
                            <nav className="links-header">
                                <li>
                                    <a href="#" onClick={scrollToServices}>
                                        Serviços
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.me/5581999154208?text=🧑🏽💻 Olá dra Manuela!, gostaria de mais informações sobre sua consulta">
                                        Contato
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={soon}>
                                        Sobre
                                    </a>
                                </li>
                                <li>
                                    <button className="account" onClick={Agendamento}>
                                    </button>
                                </li>
                            </nav>

                            <button className="btn-menu" onClick={() => setOpenMenu(true)}>
                                <TextAlignJustify size={24} color="#4f46e5" />
                            </button>

                            <div
                                className={`overlay ${openMenu ? "show" : ""}`}
                                onClick={() => setOpenMenu(false)}
                            />

                            <div className={`side-menu ${openMenu ? "open" : ""}`}>
                                <button
                                    className="close-btn"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    <X size={24} />
                                </button>
                                <nav>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            scrollToServices();
                                            setOpenMenu(false);
                                        }}
                                    >
                                        Serviços
                                    </a>
                                    <a href="https://wa.me/5581999154208?text=🧑🏽💻 Olá dra Manuela!, gostaria de mais informações sobre sua consulta">
                                        Contato
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            soon();
                                            setOpenMenu(false);
                                        }}
                                    >
                                        Sobre
                                    </a>
                                    <button
                                        className="account"
                                        onClick={() => {
                                            Entrar();
                                            setOpenMenu(false);
                                        }}
                                    >
                                        Marcar Consulta
                                    </button>
                                </nav>
                            </div>
                        </div>
                    ) : (
                        <>
                            <li>
                                <button className="account">
                                    <Link to="/entrar">Entrar</Link>
                                </button>
                            </li>
                        </>
                    )}
                </nav>
            ) : (
                <div className="links">
                    <nav className="links-header">
                        <li>
                            <a href="#" onClick={scrollToServices}>
                                Serviços
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/5581999154208?text=🧑🏽💻 Olá dra Manuela!, gostaria de mais informações sobre sua consulta">
                                Contato
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={soon}>
                                Sobre
                            </a>
                        </li>
                        <li>
                            <button className="account" onClick={Entrar}>
                                Marcar Consulta
                            </button>
                        </li>
                    </nav>

                    <button className="btn-menu" onClick={() => setOpenMenu(true)}>
                        <TextAlignJustify size={24} color="#4f46e5" />
                    </button>

                    <div
                        className={`overlay ${openMenu ? "show" : ""}`}
                        onClick={() => setOpenMenu(false)}
                    />

                    <div className={`side-menu ${openMenu ? "open" : ""}`}>
                        <button className="close-btn" onClick={() => setOpenMenu(false)}>
                            <X size={24} />
                        </button>
                        <nav>
                            <a
                                href="#"
                                onClick={() => {
                                    scrollToServices();
                                    setOpenMenu(false);
                                }}
                            >
                                Serviços
                            </a>
                            <a href="https://wa.me/5581999154208?text=🧑🏽💻 Olá dra Manuela!, gostaria de mais informações sobre sua consulta">
                                Contato
                            </a>
                            <a
                                href="#"
                                onClick={() => {
                                    soon();
                                    setOpenMenu(false);
                                }}
                            >
                                Sobre
                            </a>
                            <button
                                className="account"
                                onClick={() => {
                                    Entrar();
                                    setOpenMenu(false);
                                }}
                            >
                                Marcar Consulta
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
