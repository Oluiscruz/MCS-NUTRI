import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseAuth } from '../../context/context';

export default function GoogleCallback() {
    
    const [searchParams] = useSearchParams();
    const { login } = UseAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userParam = searchParams.get('user');
        const redirectTo = searchParams.get('redirectTo');

        const safeNavigate = (path) => navigate(path, { replace: true });

        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam));

                if (!userData || !userData.id) {
                    throw new Error('Dados do usuário inválidos');
                }

                // Atualiza contexto imediatamente
                login(userData);

                // Determina destino do redirecionamento
                let target = '/paciente/agendar-consulta';
                if (redirectTo) {
                    target = redirectTo;
                } else if (userData.role) {
                    if (userData.role === 'nutri') target = '/perfil-nutri/nutri';
                    else if (userData.role === 'paciente') target = '/paciente/agendar-consulta';
                }

                // Mantém o spinner visível por um breve instante antes de redirecionar
                setTimeout(() => safeNavigate(target), 700);
            } catch (err) {
                console.error('Erro ao processar dados do usuário:', err);
                setError('Erro ao processar login. Tente novamente.');
                setLoading(false);
                setTimeout(() => safeNavigate('/paciente/login?erro=true'), 1500);
            }
        } else {
            setError('Nenhum dado de usuário recebido');
            setLoading(false);
            setTimeout(() => safeNavigate('/paciente/login?erro=true'), 1500);
        }
    }, [searchParams, login, navigate]);

    const Spinner = () => (
        <svg width="56" height="56" viewBox="0 0 50 50" aria-hidden="true">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#1976d2" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4">
                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
            </circle>
        </svg>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 12 }} aria-live="polite">
            {loading && !error ? (
                <>
                    <Spinner />
                    <p style={{ margin: 0 }}>Processando login...</p>
                </>
            ) : error ? (
                <>
                    <p style={{ color: 'red', margin: 0 }}>{error}</p>
                    <p style={{ margin: 0 }}>Redirecionando...</p>
                </>
            ) : null}
        </div>
    );
}
