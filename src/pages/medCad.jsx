import { Stethoscope, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import '../styles/medCadastro.scss'


export default function MedicoCadastro() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sexo, setSexo] = useState('M');
    const [crm, setCRM] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [especialidade, setEspecialidade] = useState('geral');
    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        const dadosMedico = {
            nome,
            telefone,
            sexo,
            crm,
            email,
            especialidade,
            senha_medico: senha
        };

        try {
            const response = await axios.post('/api/medico/cadastro', dadosMedico);
            alert(`✅ ${response.data.message}`);
            navigate('/medico/dashboard');

        } catch (error) {
            console.error('❌ Erro de conexão com servidor:', error);
            const msgErro = error.response ? error.response.data.message : 'Erro de conexão com o servidor.';
            alert(`❌ Falha no cadastro ${msgErro}`);
        }
    }

    return (
        <div className='cadastro'>

            <div className="container-cadastro-med">


                <div className="box-title-med">
                    <div className="voltar">
                        <button onClick={voltarInicio}>
                            <i><ChevronLeft size={23} /></i><p>Voltar</p>
                        </button>
                    </div>
                    <div className="banner-cadastro-med">
                        <i><Stethoscope size={55} /></i>
                        <h1>Criar conta</h1>
                        <p>Acesso para médicos.</p>
                        <p className='info'>Esse cadastro é feito apenas para profissionais que portam CRM e podem atender aos pacientes.</p>
                        <p className='info'>Profissionais responsáveis pela utilizaçção do sistema podem fazer monitoramento e marcar consultas e exames para os médicos.</p>
                    </div>
                </div>

                <div className="box-inputs-med">

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
                        <label><span>*</span>Sexo</label>
                        <select name="sexo"
                            id=""
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <label><span>*</span>Especialidade</label>
                        <select name="sexo"
                            id=""
                            value={especialidade}
                            onChange={(e) => setEspecialidade(e.target.value)}>
                            <option value="geral">Clínico geral</option>
                            <option value="pediatra">Pediatra</option>
                            <option value="radiologista">Radiologista</option>
                            <option value="neuro">Neuro</option>
                            <option value="cardio">Cardiologista</option>
                            <option value="gineco">Ginecologista</option>
                            <option value="oftalmo">Oftalmologista</option>
                        </select>
                        <label><span>*</span>CRM</label>
                        <input type="text"
                            placeholder='00000000-SP'
                            value={crm}
                            onChange={(e) => setCRM(e.target.value)} />
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
                        <button onClick={handleCadastro}>Cadastrar</button>
                        <div className="ir-logar">
                            <p>Já possui uma conta? <Link to='/medico/login'>Fazer login</Link></p>
                        </div>
                    </form>
                </div>

            </div >
        </div>
    )
}