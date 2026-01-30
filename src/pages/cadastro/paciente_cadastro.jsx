import { useState } from 'react';
import axios from 'axios';
import { User, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import '../../styles/cadastro/paciente.scss';
import { UseAuth } from '../../context/context';


export default function Paciente_cadastro() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sexo, setSexo] = useState('M');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nascimento, setNascimento] = useState('');

    const [login] = UseAuth();


    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        const dadosPaciente = {
            nome,
            telefone,
            sexo,
            email,
            data_nascimento: nascimento,
            senha
        };

        try {
            const response = await axios.post('/api/paciente/cadastro', dadosPaciente);
            console.log('✅ Sucesso no cadastro:', response.data.message);

            const usuarioRetornado = response.data.usuario;
            login(usuarioRetornado);
            navigate('/');
            
        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no cadastro ${msgErro}`);
        }
    }

    return (
        <div className='cadastro'>

            <div className="container-cadastro-paciente">

                <div className="box-title-paciente">
                    <div className="voltar">
                        <button onClick={voltarInicio}>
                            <i><ChevronLeft size={23} /></i><p>Voltar</p>
                        </button>
                    </div>
                    <div className="banner-cadastro">
                        <i><User size={55} /></i>
                        <h1>Criar conta</h1>
                        <p>Acesso para pacientes</p>
                        <p className="info">
                            Esse setor é exclusivo para pacientes. Apenas o usuário ou um administrador da empresa poderá criar uma conta aqui.
                        </p>
                        <p className='info'>Todos seus dados serão guardados e protegidos com o devido processo legal.</p>
                    </div>
                </div>

                <div className="box-inputs-paciente">
                    <form>
                        <label><span>*</span>Nome</label>
                        <input type="name"
                            placeholder='Seu nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />
                        <label><span>*</span>Telefone</label>
                        <input type="text"
                            placeholder='(00) 00000-0000'
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)} />


                        <label ><span>*</span>Data de nascimento:</label>
                        <input type="date" name='nascimento'
                            vslue={nascimento}
                            onChange={(e) => setNascimento(e.target.value)} />



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

                        <label>Sexo</label>
                        <select name="sexo"
                            id=""
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <button onClick={handleCadastro}>Cadastrar</button>
                        <div className="ir-logar">
                            <p>Já possui uma conta? <Link to='/paciente/login'>Fazer login</Link></p>
                        </div>
                    </form>
                </div>

            </div >
        </div>
    )
}