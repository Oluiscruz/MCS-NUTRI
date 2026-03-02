import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAuth } from "../../../context/context";
import "./crn_validacao.css";

export default function CRNValidacao() {
    const [loading, setLoading] = useState(true);
    const [msgErro, setMsgErro] = useState('');
    const [validado, setValidado] = useState(false);
    const [emailEnviado, setEmailEnviado] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = UseAuth();

    useEffect(() => {
        
        // Pega o ID do usuario do contexto OU do state da navegação
        const usuarioId = usuario?.id || location.state?.usuarioId;
        
        if (usuarioId) {
            console.log('✅ Usuario ID encontrado:', usuarioId);
            validarCRN(usuarioId);
        } else {
            console.log('❌ Usuario ID não disponível');
            setMsgErro('Usuário não encontrado. Faça login novamente.');
            setLoading(false);
        }
    }, [usuario, location.state]);

    async function validarCRN(usuarioId) {
        try {
            if (!usuarioId) {
                setMsgErro('Usuário não encontrado. Faça login novamente.');
                console.log('❌ ID do usuário não disponível');
                setLoading(false);
                return;
            }

            // Chama a rota que retorna o status de validação e os dados do nutricionista (incluindo email)
            const response = await axios.get(`/api/nutricionista/status-validacao/${usuarioId}`);
            console.debug('Resposta /status-validacao:', response.data);

            // Normalizar valor para booleano (p.ex. 0/1 vindo do banco)
            const isValidado = !!response.data?.validado;
            console.log('🔍 isValidado:', isValidado);
            console.log('🔍 response.data:', response.data);

            if (isValidado) {
                console.log('✅ Definindo validado como true');
                setValidado(true);
                await enviarEmail(true, response.data.nutricionista);
            } else {
                console.log('❌ CRN não validado');
                setMsgErro('CRN inválido. Por favor, verifique seu número de registro.');
                await enviarEmail(false, response.data.nutricionista);
            }
        } catch (error) {
            console.error('Erro ao validar CRN:', error);
            const msgErro = error.response?.data?.message || 'Erro de conexão com o servidor.';
            setMsgErro(`Falha na validação do CRN: ${msgErro}`);
            await enviarEmail(false);
        } finally {
            console.log('🏁 Finalizando validação - loading: false');
            setLoading(false);
        }
    }

    async function enviarEmail(sucesso, nutricionista = null) {
        try {
            const payload = { sucesso };
            
            if (nutricionista) {
                payload.nutricionista = nutricionista;
            } else {
                // Buscar ID do nutricionista do contexto
                if (usuario?.id) {
                    payload.nutricionista_id = usuario.id;
                }
            }
            
            await axios.post('/api/nutricionista/enviar-email-validacao', payload);
            setEmailEnviado(true);
        } catch (error) {
            console.error('Erro ao enviar email:', error);
        }
    }

    const voltarInicio = () => {
        navigate('/entrar');
    };

    const irParaDashboard = () => {
        navigate('/nutricionista/perfil');
    };

    return (
        <div className="container-crn-validacao">
            <div className="card-validacao">
                {console.log('📺 Renderizando - loading:', loading, 'validado:', validado, 'msgErro:', msgErro)}
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <h2>Validando CRN...</h2>
                        <p>Aguarde enquanto verificamos seu registro profissional</p>
                    </div>
                ) : validado ? (
                    <div className="sucesso-container">
                        <div className="icone-sucesso">✓</div>
                        <h2>CRN Validado com Sucesso!</h2>
                        <p>Seu cadastro foi realizado com sucesso.</p>
                        {emailEnviado && (
                            <p className="email-info">Um email de confirmação foi enviado para você.</p>
                        )}
                        <button onClick={irParaDashboard} className="btn-primary">
                            Ir para Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="erro-container">
                        <div className="icone-erro">✕</div>
                        <h2>CRN Inválido</h2>
                        <p className="msg-erro">{msgErro}</p>
                        {emailEnviado && (
                            <p className="email-info">Um email com mais informações foi enviado para você.</p>
                        )}
                        <button onClick={voltarInicio} className="btn-secondary">
                            Voltar ao Início
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}