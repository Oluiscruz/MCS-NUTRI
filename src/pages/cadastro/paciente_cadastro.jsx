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
    const [loading, setLoading] = useState(false);

    const { login } = UseAuth();

    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleCadastro(e) {
        e.preventDefault();
        setLoading(true);

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
            navigate('/paciente/agendar-consulta');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no cadastro ${msgErro}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-cadastro-paciente">


            <div className="box-inputs">

                <div className="header">
                    <div className="voltar">

                        <button className='btn-voltar' onClick={voltarInicio}><ChevronLeft />Voltar</button>
                    </div>

                    <div className="title">
                        <h1>Criar Conta
                            <User size={28} />
                        </h1>
                    </div>
                </div>
                
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

                    <button onClick={handleCadastro} disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                    <div className="ir-logar">
                        <p>Já possui uma conta? <Link to='/paciente/login'>Fazer login</Link></p>
                    </div>
                </form>
            </div>

        </div >
    )
}