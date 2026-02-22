import { Stethoscope, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import '../../styles/cadastro/nutri.scss'


export default function Nutricionista_cadastro() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crn_regiao, set_crn_regiao] = useState(1);
    const [crn_numero, set_crn_numero] = useState('');
    const [crn_documento, set_crn_documento] = useState(null);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const voltarInicio = (e) => {
        e.preventDefault();
        navigate('/entrar')
    }

    async function handleCadastro(e) {
        e.preventDefault();

        // Monta FormData para enviar o arquivo junto com os campos
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('telefone', telefone);
        formData.append('crn_numero', crn_numero);
        formData.append('crn_regiao', crn_regiao);
        formData.append('email', email);
        formData.append('senha', senha);
        if (crn_documento) formData.append('crn_documento', crn_documento);

        try {
            const response = await axios.post('/api/nutricionista/cadastro', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
                        <div className="crn">

                            <select name="crn-regiao" id="crn-regiao"
                                value={crn_regiao}
                                onChange={(e) => set_crn_regiao(Number(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                            </select>
                            <input type='number'
                                placeholder='ex: 12345'
                                value={crn_numero}
                                onChange={(e) => set_crn_numero(e.target.value)}
                            />
                        </div>
                        <div className="crn-documento">
                            <input name="crn_documento" type="file" placeholder='insira seu documento com CRN'
                                onChange={(e) => set_crn_documento(e.target.files[0])}
                                accept=".pdf,.jpg,.jpeg,.png" />
                        </div>

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