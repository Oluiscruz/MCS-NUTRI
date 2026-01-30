import { HeartPlus, User, Stethoscope, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

import '../../styles//acesso/acessar.scss';

export default function Acessar() {

    const navigate = useNavigate();
    const inicio = () => {
        navigate('/');
    }

    return (
        <div className='connection'>

            <div className="container-connection">
                <div className="box-left">
                    <div className="sair">
                        <button onClick={inicio}><i><ArrowLeft size={25} /></i></button>
                    </div>
                    <i><HeartPlus size={64} /></i>
                    <div className="title">
                        <h1 >NutriMs</h1>
                        <p>Nutricionista Comportamental</p>
                    </div>
                </div>
                
                <div className="box-right">
                    <h2>Como deseja acessar?</h2>
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