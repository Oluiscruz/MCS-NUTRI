import { Link } from "react-router-dom";
import { HeartPlus } from 'lucide-react';
import '../../styles/home/home.scss';
import { UseAuth } from '../../context/context';


export default function Header() {

    const { usuario } = UseAuth();

    function soon() {
        alert('🚧 Em construção! 🚧')
    }

    return (
        <header className="header">

            <div className="logo">
                <h1> <i><HeartPlus size={40} /></i> Mais Vida</h1>
            </div>

            {usuario ? (
                <nav className="links-header">
                    <span>Olá, {usuario.nome}</span>

                    <li><a href="https://wa.me/5581999155751?text=🧑🏽‍💻 Olá Luis, vi seu projeto sobre a clínica médica e gostaria de algumas informações">Contato</a></li>
                    <li><a href="#" onClick={soon}>Sobre</a></li>

                    {usuario.tipo === 'medico' ? (
                        <li>
                            <button className='account'>
                                <Link to='/medico/dashboard'>Agenda</Link>
                            </button>
                        </li>
                    ) : usuario.tipo === 'paciente' ? (
                        <li>
                            <button className='account'>
                                <Link to='/paciente/dashboard'>Consultas & Exames</Link>
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button className='account'>
                                <Link to='/entrar'>Entrar</Link>
                            </button>
                        </li>
                    )}
                </nav>
            ) : (
                <nav className="links-header">
                    <li><a href="https://wa.me/5581999155751?text=🧑🏽‍💻 Olá Luis, vi seu projeto sobre a clínica médica e gostaria de algumas informações">Contato</a></li>
                    <li><a href="#" onClick={soon}>Sobre</a></li>
                    <li>
                        <button className='account'>
                            <Link to='/entrar'>Consultas & Exames</Link>
                        </button>
                    </li>
                </nav>
            )}
        </header>
    )
}