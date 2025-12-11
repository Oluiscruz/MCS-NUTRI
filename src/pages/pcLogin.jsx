import { User, ChevronLeft, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.scss';
import axios from 'axios';
import { useState } from 'react';
import { UseAuth } from '../context/context';



export default function PacienteLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            password
        };
        console.log('Enviando dadosPaciente para /api/login/paciente:', { emailPresent: !!email, hasPassword: !!password });

        try {
            const response = await axios.post('/api/login/paciente', dadosPaciente);
            alert(`✅ Login realizado com sucesso! ${response.data.message}`);
            navigate('/paciente/dashboard');

            const usuarioRetornado = response.data.usuario || response.data.user;

            // Marca tipo de usuário para uso no front-end
            if (usuarioRetornado && !usuarioRetornado.tipo) {
                usuarioRetornado.tipo = 'paciente';
            }

            login(usuarioRetornado);
            
        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no login ${msgErro}`);
        }

    }



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
                        <h1>Bem vindo(a) de volta</h1>
                        <p>Acesso para pacientes</p>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Entrar</button>
                    </form>
                    <div className="ir-cadastrar">
                        <p>Não tem uma conta? <Link to='/paciente/cadastro'>Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}