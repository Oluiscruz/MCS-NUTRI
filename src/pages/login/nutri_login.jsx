import { Stethoscope, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { UseAuth } from '../../context/context';
import '../../styles/login/nutri.scss';


export default function Nutricionista_login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();
    const { login } = UseAuth();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/')
    }

    async function handleLogin(e) {
        e.preventDefault();

        // Lógica de autenticação aqui
        const dadosNutri = {
            email,
            senha,
        };

        try {
            const response = await axios.post('/api/nutricionista/login', dadosNutri);
            alert(`${response.data.message}`);

            // Extrai o objeto de usuário retornado pela API (compatível com diferentes formatos)
            const usuarioRetornado = response.data.usuario || response.data.user;

            // Identifica o tipo de usuário para renderização condicional no front-end
            if (usuarioRetornado && !usuarioRetornado.tipo) {
                usuarioRetornado.tipo = 'nutricionista';
            }

            // Atualiza o contexto e localStorage via `login` do AppContext
            login(usuarioRetornado);

            // Redireciona para dashboard do médico após login
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
            <div className="voltar-home">
                <button onClick={voltarInicio}>
                    <i><ChevronLeft size={23} /></i><p>Voltar</p>
                </button>
            </div>
            <div className="box-medico-login">
                <div className="banner-login">
                    <i><Stethoscope size={55} /></i>
                    <h1>Bem vindo(a) de volta</h1>
                    <p>Acesso para nutricionistas</p>
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
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                </form>
                <button onClick={handleLogin}>Entrar</button>
                <div className="ir-cadastrar">
                    <p>Não tem uma conta? <Link to='/nutricionista/cadastro'>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
        </div>

    )
}