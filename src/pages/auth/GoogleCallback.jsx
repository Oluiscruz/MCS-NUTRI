import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseAuth } from '../../context/context';

export default function GoogleCallback() {
    
    const [searchParams] = useSearchParams();
    const { login } = UseAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const userParam = searchParams.get('user');
        
        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam));
                
                // Validar que userData tem as propriedades necessárias
                if (!userData || !userData.id) {
                    throw new Error('Dados do usuário inválidos');
                }
                
                login(userData);
                navigate('/paciente/agendar-consulta');
            } catch (error) {
                console.error('Erro ao processar dados do usuário:', error);
                setError('Erro ao processar login. Tente novamente.');
                setTimeout(() => {
                    navigate('/paciente/login?erro=true');
                }, 2000);
            }
        } else {
            setError('Nenhum dado de usuário recebido');
            setTimeout(() => {
                navigate('/paciente/login?erro=true');
            }, 2000);
        }
    }, [searchParams, login, navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {error ? (
                <>
                    <p style={{ color: 'red' }}>{error}</p>
                    <p>Redirecionando...</p>
                </>
            ) : (
                <p>Processando login...</p>
            )}
        </div>
    );
}
