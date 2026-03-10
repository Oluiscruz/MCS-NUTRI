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
                setTimeout(() => {
                    // Navegação completa com recarregamento para garantir o estado atualizado
                    try {
                        window.location.replace(target);
                    } catch (e) {
                        // Fallback para SPA navigation se replace falhar
                        safeNavigate(target);
                    }
                }, 700);

            } catch (err) {
                console.error('Erro ao processar dados do usuário:', err);
                setError('Erro ao processar login. Tente novamente.');
                setTimeout(() => safeNavigate('/paciente/login?erro=true'), 1500);
            }
        } else {
            setError('Nenhum dado de usuário recebido');
            setTimeout(() => safeNavigate('/paciente/login?erro=true'), 1500);
        }
    }, [searchParams, login, navigate]);


    return (
        <></>
    )
}
