import { Stethoscope, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import '../styles/medCadastro.scss'


export default function MedicoCadastro() {

    const [ nome, setNome ] = useState('');
    const [ telefone, setTelefone ] = useState('');
    const [ sexo, setSexo ] = useState('');
    const [ crm, setCRM ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        const dadosMedico = {
            nome,
            telefone,
            sexo,
            crm,
            email,
            senha_paciente: senha
        };
        try {
            const response = await axios.post('/api/pacientes/cadastro', dadosMedico);
            alert(`✅ ${response.data.message}`);
            navigate('/medico/login');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no cadastro ${msgErro}`);
        }
    }

    return (
        <div className="container-cadastro-med">
            <div className="voltar">
                <button onClick={voltarInicio}>
                    <i><ChevronLeft size={23} /></i><p>Voltar</p>
                </button>
            </div>
            <div className="box-cadastro-med">
                <div className="banner-cadastro-med">
                    <i><Stethoscope size={55} /></i>
                    <h1>Criar conta</h1>
                    <p>Acesso para médicos</p>
                </div>
                <form>
                    <div className="lado1">

                        <label><span>*</span>Nome</label>
                        <input type="name" placeholder='Seu nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <label><span>*</span>Telefone</label>
                        <input type="text" placeholder='(00) 00000-0000'
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)} />

                        <label><span>*</span>Sexo</label>
                        <select name="sexo" id=""
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="lado2">

                        <label><span>*</span>CRM</label>
                        <input type="text" placeholder='00000000-SP'
                            value={crm}
                            onChange={(e) => setCRM(e.target.value)} />

                        <label><span>*</span>Email</label>
                        <input type="email" placeholder='exemplo@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <label><span>*</span>Senha</label>
                        <input type="password" placeholder='******'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />
                    </div>
                </form>
                <button onClick={handleCadastro}>Cadastrar</button>
                <div className="ir-logar">
                    <p>Já possui uma conta? <Link to='/medico/login'>Fazer login</Link></p>
                </div>
            </div>
        </div >
    )
}