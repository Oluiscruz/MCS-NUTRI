import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UseAuth } from '../../context/context';
import '../../styles/perfil-paciente/agendarConsulta.scss'

export default function GoogleCallback() {
    
    const [searchParams] = useSearchParams();
    const { login } = UseAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const userParam = searchParams.get('user');
        const redirectTo = searchParams.get('redirectTo');

        if (userParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(userParam));

                if (!userData || !userData.id) {
                    throw new Error('Dados do usuário inválidos');
                }

                login(userData);

                let target = '/paciente/agendar-consulta';
                if (redirectTo) {
                    target = redirectTo;
                    
                } else if (userData.role === 'nutri') {
                    target = '/perfil-nutri/nutri';
                }

                window.location.replace(target);

            } catch (err) {
                console.error('Erro ao processar dados do usuário:', err);
                window.location.replace('/paciente/login?erro=true');
            }
        } else {
            window.location.replace('/paciente/login?erro=true');
        }
    }, [searchParams, login]);


    return (
        <div className="empty-state" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner"></div>
            <div>Processando login...</div>
        </div>
    )
}
