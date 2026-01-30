import { UseAuth } from "../../context/context";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { NumericFormat } from 'react-number-format';
import { Home, LogOut } from 'lucide-react';

import '../../styles/perfil-paciente/paciente.scss'

export default function Paciente_perfil() {

    // const [altura, setAltura] = useState('');
    // const [peso, setPeso] = useState('');
    // const [pcd, setPcd] = useState('');

    const { usuario, logout } = UseAuth()
    const navigate = useNavigate();

    const goHome = () => { navigate('/'); }

    const Sair = () => { logout(); navigate('/'); }

    return (
        <div className="container-agendamento-paciente">
            <div className="header-paciente">
                <div className="actions-paciente">
                    <Home size={32} onClick={goHome} />
                    <LogOut size={32} onClick={Sair} />
                </div>
                <div className="title-name">
                    <h1>Olá, {usuario.nome}</h1>
                    <p>Agende agora mesmo seu atendimento!</p>
                </div>
            </div>

            <section className="section-agendamento">
                <form >

                <label>Selelecione o dia:</label>
                <select name="" id="">
                    <option value="01-10-2024">ex: 01/10/2024</option>
                </select>
                </form>
            </section>



            {/* 
                <div className="box-inputs">
                    <form>

                        <label htmlFor="altura">Altura em metros</label>
                        <NumericFormat
                            id="altura"
                            value={altura}
                            onValueChange={(values) => {
                                setAltura(values.value)
                            }}
                            decimalScale={2}
                            fixedDecimalScale={0}
                            decimalSeparator=","
                            suffix=" m"
                            placeholder="1,75 m"
                            allowNegative={false}
                            required />

                        <label htmlFor="peso">Peso em quilos</label>
                        <NumericFormat
                            id="peso"
                            value={peso}
                            onValueChange={(values) => {
                                setPeso(values.value)
                            }}
                            decimalScale={2}
                            fixedDecimalScale={false}
                            decimalSeparator=","
                            suffix=" kg"
                            placeholder="80 kg"
                            allowNegative={false}
                            required />

                        <label htmlFor="pcd">Possui alguma deficiência física?</label>
                        <div className="div-pcd">
                            <input
                                type="radio"
                                name="opcao"
                                value='sim'
                                checked={pcd === 'sim'}
                                onChange={(e) => setPcd(e.target.value)}
                            /><p>Sim</p>
                            <input
                                type="radio"
                                name="opcao"
                                value='não'
                                checked={pcd === 'não'}
                                onChange={(e) => setPcd(e.target.value)}
                            /><p>Não</p>
                        </div>

                        {pcd === 'sim' && (
                            <>
                                <label htmlFor="tipo-pcd">Caso possua, qual?</label>
                                <input
                                    type="text"
                                    id="tipo-pcd"
                                    placeholder="Informe sua deficiência"
                                    required
                                />
                            </>
                        )}

                        <button
                            className="confirmar"
                            type="submit">
                        </button>
                    </form>
                </div> */}
        </div>
    )
}