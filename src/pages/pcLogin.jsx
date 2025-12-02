import { User, ChevronLeft, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.scss';
import axios from 'axios';
import { useState } from 'react';


export default function PacienteLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/')
    }

    async function handleLogin(e) {
        e.preventDefault();

        // Lógica de autenticação aqui
        const dadosPaciente = {
            email,
            password
        };

        try{
            const response = await axios.post('/api/login/paciente', dadosPaciente);
            alert(`✅ Login realizado com sucesso! ${response.data.message}`);
            navigate('/paciente/dashboard');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no login ${msgErro}`);
        }

    }



    return (
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
                <form>
                    <label><span>*</span>Email</label>
                    <input type="email" 
                    placeholder='exemplo@email.com' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                    <label><span>*</span>Senha</label>
                    <input type="password" 
                    placeholder='******' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </form>
                <button onClick={handleLogin}>Entrar</button>
                <div className="ir-cadastrar">
                    <p>Não tem uma conta? <Link to='/paciente/cadastro'>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    )
}