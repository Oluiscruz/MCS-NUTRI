import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import '../../styles/home/section.scss';
import { useState } from 'react';


export default function Section() {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [imc, setImc] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const Agendamento = () => {
        navigate('/entrar');
    }

    const calcularIMC = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            const resultado = parseFloat(peso / (alturaMetros * alturaMetros)).toFixed(2);
            setImc(resultado);
            setShowModal(true);
        }
    }

    const fecharModal = () => {
        setShowModal(false);
    }



    return (
        <section className="container-section-home">
            <div className="title-section">
                <h1>Calcule seu <span>IMC</span> - Índice de Massa Corporal</h1>
            </div>

            <div className="box-imc">
                <form >
                    <label >Altura em m:</label>
                    <NumericFormat
                        value={altura}
                        onValueChange={(values) => { setAltura(values.value) }}
                        format={(value) => {
                            if (!value) return '';
                            const numStr = value.replace(/\D/g, '');
                            if (numStr.length <= 2) return numStr;
                            return numStr.slice(0, 1) + ',' + numStr.slice(1);
                        }}
                        decimalSeparator=','
                        allowNegative={false}
                        suffix=' m'
                        placeholder='Ex: 1,75'
                        required
                    />
                    <label >Peso kg: </label>
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
                </form>
                <button onClick={calcularIMC}>Calcular</button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={fecharModal}>×</button>
                        <div className="resultado">
                            <h2>Seu IMC é: <span>{imc}</span></h2>
                            <p className={`imc-category ${
                                imc < 18.5 ? 'abaixo-peso' :
                                imc >= 18.5 && imc <= 24.9 ? 'peso-ideal' :
                                imc >= 25 && imc <= 29.9 ? 'sobrepeso' :
                                imc >= 30 && imc <= 34.9 ? 'obesidade-1' :
                                imc >= 35 && imc <= 39.9 ? 'obesidade-2' : 'obesidade-3'
                            }`}>
                                {imc < 18.5 ?
                                    'Você está abaixo do peso ideal' :
                                    imc >= 18.5 && imc <= 24.9 ?
                                    'Parabéns! Você está no peso ideal' :
                                    imc >= 25 && imc <= 29.9 ?
                                    'Você está acima do seu peso ideal. Marque uma consulta!' :
                                    imc >= 30 && imc <= 34.9 ?
                                    'Você está com obesidade grau I' :
                                    imc >= 35 && imc <= 39.9 ?
                                    'Você está com obesidade grau II' :
                                    'Você está com obesidade grau III'
                                }
                            </p>
                            <div className="agendamento">
                                <button onClick={Agendamento}>Marcar Consulta</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}