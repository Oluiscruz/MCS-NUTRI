import { Stethoscope, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import '../../styles/cadastro/nutri.scss'


export default function Nutricionista_cadastro() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crn, setCRN] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        const dadosNutri = {
            nome,
            telefone,
            crn,
            email,
            senha
        };

        try {
            const response = await axios.post('/api/nutricionista/cadastro', dadosNutri);
            console.log('✅ Sucesso no cadastro:', response.data.message);
            navigate('/');

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
                        <p>Acesso para nutricionistas.</p>
                        <p className='info'>Esse cadastro é feito apenas para profissionais que portam CRN e podem atender aos pacientes.</p>
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
                            
                        <label><span>*</span>CRN</label>
                        <input type="text"
                            placeholder='CRN-1: 23456'
                            value={crn}
                            onChange={(e) => setCRN(e.target.value)} />

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
                            <p>Já possui uma conta? <Link to='/nutricionista/login'>Fazer login</Link></p>
                        </div>
                    </form>
                </div>

            </div >
        </div>
    )
}