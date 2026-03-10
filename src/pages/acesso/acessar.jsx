import { HeartPlus, User, Stethoscope, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

import '../../styles//acesso/acessar.scss';

export default function Acessar() {

    const navigate = useNavigate();
    const inicio = () => {
        navigate('/');
    }

    return (
        <div className="container-connection">
            <div className="content">
                <div className="header">
                    <div className="sair">
                        <button onClick={inicio}><i><ArrowLeft size={25} /></i></button>
                    </div>
                    <div className="title">
                    <i><HeartPlus size={34} /></i>
                        <h1 >NutriMs</h1>
                    </div>
                </div>

                <div className="content-acess">
                    <div className="title">
                    <h2>Como deseja acessar?</h2>
                    </div>
                    <div className="cards">

                        <Link to='/paciente/login'>
                            <button className="paciente">
                                <div className="icon-right">
                                    <i><User size={32} /></i>
                                </div>
                                <div className="infos">
                                    <div className="quem-sou">
                                        <h3>Sou Paciente</h3>
                                        <p>Agendar consultas</p>
                                    </div>
                                    <div className="ir">
                                        <i><ArrowRight /></i>
                                    </div>
                                </div>
                            </button>
                        </Link>

                        <Link to='/nutricionista/login'>
                            <button className="medico">
                                <div className="icon-right">
                                    <i><Stethoscope size={32} /></i>
                                </div>
                                <div className="infos">
                                    <div className="quem-sou">
                                        <h3>Sou nutri</h3>
                                        <p>Gerenciar agenda</p>
                                    </div>
                                    <div className="ir">
                                        <i><ArrowRight /></i>
                                    </div>
                                </div>
                            </button></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}