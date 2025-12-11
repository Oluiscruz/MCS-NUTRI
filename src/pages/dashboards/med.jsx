import { useNavigate } from "react-router-dom";
import { UseAuth } from '../../context/context';

export default function MedicoDashboard() {

    const { logout, usuario } = UseAuth();
    const navigate = useNavigate();

    const goHome = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleLogout = () => {
        logout();
        navigate('/entrar')
    }

    const saudacao = () => {
        if (!usuario) return '';
        if (usuario.tipo !== 'medico') return 'Bem vindo(a)';
        if (usuario.sexo === 'M') return 'Bem vindo';
        if (usuario.sexo === 'F') return 'Bem vinda';
        return 'Bem vindo(a)';
    }

    return (
        <div className="container med-desh">
            <div>{saudacao()}, {usuario.nome}</div>
            <button onClick={goHome}>Início</button>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}