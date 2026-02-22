import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseAuth } from '../../context/context';

export default function GoogleCallback() {
    
    const [searchParams] = useSearchParams();
    const { login } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userParam = searchParams.get('user');
        
        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam));
                login(userData);
                navigate('/paciente/agendar-consulta');
            } catch (error) {
                console.error('Erro ao processar dados do usuário:', error);
                navigate('/paciente/login?erro=true');
            }
        } else {
            navigate('/paciente/login?erro=true');
        }
    }, [searchParams, login, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p>Processando login...</p>
        </div>
    );
}
