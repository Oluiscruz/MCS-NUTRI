import { User, ChevronLeft, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { UseAuth } from '../../context/context';
import '../../styles/login/paciente.scss';



export default function Paciente_login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const {login} = UseAuth();
    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleLogin(e) {
        e.preventDefault();
        
        // Lógica de autenticação aqui
        const dadosPaciente = {
            email,
            senha
        };

        try {
            const response = await axios.post('/api/paciente/login', dadosPaciente);
            alert(`${response.data.message}`);
            
            const usuarioRetornado = response.data.usuario;
            login(usuarioRetornado);
            navigate('/paciente/agendar-consulta');
            
        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no login ${msgErro}`);
        }

    }

    // Função para o Login com Google
    const handleGoogleLogin = () => {
        // Importante: No React, NÃO usamos fetch() ou axios para o OAuth do Google.
        // Precisamos redirecionar a página inteira para que o usuário veja a tela do Google.
        window.location.href = 'http://localhost:3001/api/auth/google';
    };

    return (
        <div className='login'>

            <div className="container-login">
                <div className="voltar">
                    <button onClick={voltarInicio}>
                        <i><ChevronLeft size={23} /></i><p>Voltar</p>
                    </button>
                </div>
                <div className="box-login">
                    <div className="banner-login">
                        <i><User size={55} /></i>
                        <h1>Faça login em sua conta</h1>
                    </div>
                    <form onSubmit={handleLogin}>
                        <label><span>*</span>Email</label>
                        <input type="email"
                            placeholder='exemplo@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <label><span>*</span>Senha</label>
                        <input type="password"
                            placeholder='******'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />
                        <button type="submit">Entrar</button>

                        <div className="or">
                            <div className="bar"></div>
                            <span>Ou</span>
                            <div className="bar"></div>
                        </div>


                        <div className="google-login">
                            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                                        <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                                    </g>
                                </svg>
                                Entrar com Google
                            </button>
                        </div>
                    </form>
                    <div className="ir-cadastrar">
                        <p>Não tem uma conta? <Link to='/paciente/cadastro'>Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}