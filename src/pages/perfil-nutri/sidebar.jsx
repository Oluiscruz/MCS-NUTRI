import { UseAuth } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, LogOut, ChartPie, Star, Clock, Menu, UserRoundPen } from 'lucide-react';
import { FaChevronRight } from "react-icons/fa6";
import { FaHandPointUp } from "react-icons/fa6";
import '../../styles/perfil-nutri/sidebar.scss'

export default function Sidebar() {

    const { logout } = UseAuth()

    // const data = new Date();
    // const horas = String(data.getHours()).padStart(2, '0');
    // const minutos = String(data.getMinutes()).padStart(2, '0');

    const navigate = useNavigate();
    const [fechado, setFechado] = useState(true);

    const Inicio = () => navigate('/');
    const Sair = () => { logout(); navigate('/entrar'); }
    const toggleSidebar = () => setFechado(!fechado);


    return (
            <div className={`sidebar ${fechado ? 'close' : ''}`}>
                <div className="header-sidebar">

                    <div className="logo-nutri">
                        <div className="logo">
                            <h1>MCS</h1>
                        </div>

                        <div className="texto-header">
                            <span className="profissao">Nutricionista</span>
                        </div>
                    </div>

                    <i className="toggle"><FaChevronRight onClick={toggleSidebar}/></i>
                </div>

                <div className="menu-sidebar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <button onClick={Inicio}>
                                    <i><Home /></i>
                                    <span className="nav-text">Início</span>
                                </button>
                            </li>
                            <li className="nav-link">
                                <button onClick={Inicio}>
                                    <i><FaHandPointUp /></i>
                                    <span className="nav-text">Metas</span>
                                </button>
                            </li>
                            <li className="nav-link">
                                <button onClick={Inicio}>
                                    <i><ChartPie /></i>
                                    <span className="nav-text">Analytics</span>
                                </button>
                            </li>
                            <li className="nav-link">
                                <button onClick={Inicio}>
                                    <i><Star /></i>
                                    <span className="nav-text">Avaliações</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-conta">
                        <li className="bottom-links">
                            <button onClick={Inicio}>
                                <i><UserRoundPen /></i>
                                <span className="nav-text">Editar conta</span>
                            </button>
                        </li>
                        <li className="bottom-links">
                            <button onClick={Sair}>
                                <i><LogOut /></i>
                                <span className="nav-text">Sair</span>
                            </button>
                        </li>
                    </div>
                </div>
            </div>
    )
}