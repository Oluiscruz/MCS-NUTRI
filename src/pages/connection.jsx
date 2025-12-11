import { HeartPlus, User, Stethoscope, ArrowRight, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

import '../styles/connection.scss'

export default function Connection() {

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    }

    return (
        <div className='connection'>

            <div className="container-connection">
                <div className="box-left">
                    <i><HeartPlus size={64} /></i>
                    <div className="title">
                        <h1 onClick={goHome} alt="Voltar para página inicial">Mais Vida</h1>
                        <p>Gestão clínica simplificada para <br></br>pacientes e profissionais da saúde</p>
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
                                        <p>Agendar consultas e ver exames</p>
                                    </div>
                                    <div className="ir">
                                        <i><ArrowRight /></i>
                                    </div>
                                </div>
                            </button>
                        </Link>

                        <Link to='/medico/login'>
                            <button className="medico">
                                <div className="icon-right">
                                    <i><Stethoscope size={32} /></i>
                                </div>
                                <div className="infos">
                                    <div className="quem-sou">
                                        <h3>Sou médico</h3>
                                        <p>Gerenciar agenda e prontuários</p>
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