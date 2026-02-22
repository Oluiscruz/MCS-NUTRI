import { Link, useNavigate } from "react-router-dom";
import { HeartPlus } from 'lucide-react';
import { UseAuth } from '../../context/context';
import '../../styles/home/home.scss';


export default function Header() {

    const { usuario } = UseAuth();

    function soon() {
        alert('🚧 Em construção! 🚧')
    }

    function scrollToServices() {
        document.querySelector('.container-section-home-dois')?.scrollIntoView({ behavior: 'smooth' });
    }

    const navigate = useNavigate();
    const Entrar = () => { navigate('/entrar'); }
    const Agendamento = () => { navigate('/paciente/agendar-consulta'); }
    const Perfil = () => { navigate('/nutricionista/perfil'); }

    return (
        <header className="header">

            <div className="logo">
                <h1> <i><HeartPlus size={35} /></i> Nutri<span>Ms</span></h1>
            </div>

            {usuario ? (

                <nav className="links-header">

                    {usuario.tipo === 'nutricionista' ? (
                        <>
                            <li><p>Bem vinda, {usuario.nome}</p></li>
                            <li><button className='account' onClick={Perfil}> Ver agendamentos</button></li>
                        </>
                        
                    ) : usuario.tipo === 'paciente' ? (
                        <>

                            <li><a href="https://wa.me/5581999155751?text=🧑🏽‍💻 Olá Luis, vi seu projeto sobre a clínica médica e gostaria de algumas informações">Contato</a></li>
                            <li><a href="#" onClick={soon}>Sobre</a></li>
                            <li>
                                <button className='account' onClick={Agendamento}>
                                    Agendar Consultas
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button className='account'>
                                    <Link to='/entrar'>Entrar</Link>
                                </button>
                            </li>
                        </>
                    )}
                </nav>
            ) : (
                <nav className="links-header">
                    <li><a href="#" onClick={scrollToServices}>Serviços</a></li>
                    <li><a href="https://wa.me/5581999155751?text=🧑🏽‍💻 Olá Luis, vi seu projeto sobre a clínica médica e gostaria de algumas informações">Contato</a></li>
                    <li><a href="#" onClick={soon}>Sobre</a></li>
                    <li>
                        <button className='account' onClick={Entrar}>Marcar Consulta</button>
                    </li>
                </nav>
            )}
        </header>
    )
}