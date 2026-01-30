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
            navigate('/');
            
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
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />
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