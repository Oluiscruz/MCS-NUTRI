import { Stethoscope, ChevronLeft, Lock, Mail, HandFist } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../styles/medicoLogin.scss';
import axios from 'axios';


export default function MedicoLogin() {

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
        const dadosMedico = {
            email,
            password
        };

        try {
            const response = await axios.post('/api/login/medico', dadosMedico);
            alert(`✅ Login realizado com sucesso! ${response.data.message}`);
            navigate('/medico/dashboard');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no login ${msgErro}`);
        }

    }


    return (
        <div className="container-login">
            <div className="voltar-home">
                <button onClick={voltarInicio}>
                    <i><ChevronLeft size={23} /></i><p>Voltar</p>
                </button>
            </div>
            <div className="box-medico-login">
                <div className="banner-login">
                    <i><Stethoscope size={55} /></i>
                    <h1>Bem vindo(a) de volta</h1>
                    <p>Acesso para médicos</p>
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
                        onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button onClick={handleLogin}>Entrar</button>
                <div className="ir-cadastrar">
                    <p>Não tem uma conta? <Link to='/medico/cadastro'>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    )
}