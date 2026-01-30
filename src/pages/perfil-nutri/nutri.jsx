import Sidebar from "./sidebar";
import '../../styles/perfil-nutri/nutricionista.scss';
import { UseAuth } from "../../context/context";
import { CalendarDays, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Nutricionista_perfil() {

    const { usuario } = UseAuth();

    const navigate = useNavigate() 
    const handleAgenda = () => { navigate('/nutricionista/agenda') }




    return (
        <div className="container-perfil-nutri">
            <Sidebar />
            <div className="home-content">
                <div className="user">
                    <h1>Olá, Dra. {usuario.nome}</h1>
                </div>

                <div className="bar"></div>

                <div className="box-content">
                    <div className="title-content">
                        <h2>Como deseja acessar?</h2>
                    </div>

                    <div className="grupo">

                        <ul className="box" onClick={handleAgenda}>
                            <li className="text">
                                <div className="icon">
                                    <i><CalendarDays size={28} /></i>
                                </div>
                                <span>Agenda</span>
                                <p>Agende suas consultas, marque seus horários de trabalho</p>
                            </li>
                        </ul>

                        <ul className="box" >
                            <li className="text">
                                <div className="icon">
                                    <i><User size={28} /></i>
                                </div>
                                <span>Pacientes</span>
                                <p>Visualize o prontuário dos pacientes</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}