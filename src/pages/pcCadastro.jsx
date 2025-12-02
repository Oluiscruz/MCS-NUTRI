import { useState } from 'react';
import axios from 'axios';
import { User, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/pcCadastro.scss'


export default function PacienteCadastro() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sexo, setSexo] = useState('M');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        const dadosPaciente = {
            nome,
            telefone,
            sexo,
            cpf,
            email,
            senha_paciente: senha
        };

        try {
            // Envio dos dados:
            const response = await axios.post('/api/paciente/cadastro', dadosPaciente);
            alert(`✅ Cadastro realizado com sucesso! Você já pode fazer login. ${response.data.message}`);
            navigate('/paciente/login');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no cadastro ${msgErro}`);
        }
    }


    return (
        <div className="container-cadastro">
            <div className="voltar">
                <button onClick={voltarInicio}>
                    <i><ChevronLeft size={23} /></i><p>Voltar</p>
                </button>
            </div>
            <div className="box-cadastro">
                <div className="banner-cadastro">
                    <i><User size={55} /></i>
                    <h1>Criar conta</h1>
                    <p>Acesso para pacientes</p>
                </div>
                <form>
                    <div className="lado1">

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

                        <label><span>*</span>Sexo</label>
                        <select name="sexo"
                            id=""
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="lado2">

                        <label><span>*</span>CPF</label>
                        <input type="text"
                            placeholder='000.000.000-00'
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)} />

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
                    </div>
                </form>
                <button onClick={handleCadastro}>Cadastrar</button>
                <div className="ir-logar">
                    <p>Já possui uma conta? <Link to='/paciente/login'>Fazer login</Link></p>
                </div>
            </div>
        </div >
    )
}