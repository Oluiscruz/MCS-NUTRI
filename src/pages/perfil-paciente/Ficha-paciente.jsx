import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/context";
import { NumericFormat } from 'react-number-format';
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import '../../styles/perfil-paciente/ficha-paciente.scss';
import axios from "axios";


export default function FichaPaciente() {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [alergias, setAlergias] = useState('');
    const [restricoes, setRestricoes] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const [fichaExiste, setFichaExiste] = useState(false);


    const { usuario } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarFicha() {
            try {
                const response = await axios.get(`/api/paciente/ficha-paciente/${usuario.id}`);
                if (response.data) {
                    setAltura((response.data.altura * 100).toString());
                    setPeso(response.data.peso.toString());
                    setAlergias(response.data.alergias || '');
                    setRestricoes(response.data.restricoes_alimentares || '');
                    setObjetivos(response.data.objetivos || response.data.objetivo || '');
                    setFichaExiste(true);
                }
            } catch (error) {
                setFichaExiste(false);
            }
        }
        if (usuario?.id) carregarFicha();
    }, [usuario]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!altura || !peso || !objetivos) {
            setMensagem('❌ Preencha os campos obrigatórios: Altura, Peso e Objetivos');
            return;
        }

        const dadosFicha = {
            paciente_id: usuario.id,
            altura,
            peso,
            alergias,
            restricoes_alimentares: restricoes,
            objetivos,
        }

        try {
            if (fichaExiste) {
                await axios.put('/api/paciente/atualizar/ficha-paciente', dadosFicha);
            } else {
                await axios.post('/api/paciente/criar/ficha-paciente', dadosFicha);
                setFichaExiste(true);
            }
            setShowOverlay(true);
        } catch (error) {
            console.error('Erro ao salvar ficha:', error);
            setMensagem('❌ Erro ao salvar ficha. Tente novamente.');
            setTimeout(() => setMensagem(''), 4000);
        }
    }

    const voltar = () => {
        navigate('/paciente/agendar-consulta');
    }
    return (
        <div className="ficha-paciente-container">
            <header className="header-ficha">
                <div className="btn-acoes">
                    <button onClick={voltar}><ArrowLeft size={20} /> Voltar</button>
                </div>
                <div className="header-title">
                    <h1>Olá, {usuario.nome}</h1>
                    <p>Preencha sua ficha de anamnese.</p>
                    <em>Caso prefira, o nutricionista pode realizar o preenchimento com você no dia da consulta.</em>
                </div>
            </header>

            <div className="mensagem">
                {mensagem && (
                    mensagem.includes('sucesso')
                        ? <p className="salvou-ficha">{mensagem}</p>
                        : <p className="error-ficha">{mensagem}</p>
                )}
            </div>

            <form className="ficha-paciente-form" >
                <label htmlFor="altura"><span>*</span>Altura:</label>
                <NumericFormat
                    value={altura}
                    onValueChange={(values) => { setAltura(values.value) }}
                    format={(value) => {
                        if (!value) return '';
                        const numStr = value.replace(/\D/g, '').slice(0, 3);
                        if (numStr.length === 0) return '';
                        return numStr.length === 1
                            ? numStr
                            : numStr.slice(0, 1) + ',' + numStr.slice(1);
                    }}
                    decimalSeparator=','
                    allowNegative={false}
                    suffix=' m'
                    placeholder='Ex: 1,75'
                    isAllowed={(values) => {
                        const { value } = values;
                        if (!value) return true;
                        const numStr = value.replace(/\D/g, '');
                        return numStr.length <= 3;
                    }}
                    required
                />
                <label ><span>*</span>Peso:</label>
                <NumericFormat
                    id="peso"
                    value={peso}
                    onValueChange={(values) => { setPeso(values.value) }}
                    decimalScale={2}
                    fixedDecimalScale={0}
                    allowNegative={false}
                    suffix=' kg'
                    placeholder='Ex: 70.50'
                    required
                />

                <label >Contem alguma alergia?</label>
                <input type="text" value={alergias} onChange={(e) => setAlergias(e.target.value)}
                    placeholder="Ex: Intolerância a lactose" />

                <label >Alguma restrição alimentar?</label>
                <input type="text" value={restricoes} onChange={(e) => setRestricoes(e.target.value)}
                    placeholder="Ex: não gosto de peixe" />

                <label ><span>*</span>Qual o seu objetivo?</label>
                <input type="text" value={objetivos} onChange={(e) => setObjetivos(e.target.value)}
                    placeholder="Ex: emagrecer" />


                <button type="button" className="finalizar" onClick={handleSubmit}>Salvar ficha</button>
            </form>


            {showOverlay && (
                <div className="overlay-sucess">
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon-wrapper">
                            <CheckCircle size={48} className="icon-success" />
                        </div>
                        <h3>Sua ficha foi salva com sucesso!</h3>
                        <p>caso precise editar alguma informação, digite novamente e salve.</p>
                        <button onClick={() => setShowOverlay(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    )
}