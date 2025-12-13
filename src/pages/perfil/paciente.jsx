import { UseAuth } from "../../context/context";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { NumericFormat } from 'react-number-format';
import { Home, LogOut } from 'lucide-react';

import '../../styles/perfil/paciente.scss'

export default function PerfilPaciente() {

    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [nascimento, setNascimento] = useState('');


    const { usuario, logout } = UseAuth()
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    const handleLogout = () => {
        logout();
        navigate('/entrar');
    }

    const reinicia = () => {
        window.location.reload();
        alert('✅📃 Sua ficha de informações pessoas foram salvas com sucesso.')
    }


    return (
        <div className="container-perfil">
            <div className="box-perfil">
                <div className="banner-perfil">
                    <h1>Este é o seu perfil, {usuario.nome}</h1>
                </div>

                <div className="botoes-banner">
                    <button onClick={goHome}><Home size={20} />Ir para início</button>
                    <button onClick={handleLogout}><LogOut size={20} />Sair da conta</button>
                </div>

                <div className="informacao">
                    <p>Antes de marcar consultas ou exames, é de suma importância para nós que nos passe
                        algumas características acerca do seu físico e do seu corpo</p>
                    <p>Essas informações serão enviadas na sua ficha médica para o profissional de saúde que irá lhe atender</p>
                    <div className="div">
                        <input type="checkbox" id="opcao" />
                        <label for="opcao"><span>*</span> Confirmo que entendi o que foi escrito acima e aceito os termos e condições</label>
                    </div>

                </div>
            </div>

            <div className="box-inputs">
                <form>

                    <label for="data-nascimento">Data de nascimento</label>
                    <input type="date"
                        id="data-nascimento"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />

                    <label for="altura">Altura em metros</label>
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
                        allowNegative={false} />

                    <label for="peso">Peso em quilos</label>
                    <NumericFormat
                        id="peso"
                        value={peso}
                        onValueChange={(values) => {
                            setPeso(values.value)
                        }}
                        decimalScale={2} // limite de casas decimais
                        fixedDecimalScale={false} // Não força zeros
                        decimalSeparator=","
                        suffix=" kg"
                        placeholder="80 kg"
                        allowNegative={false} />

                    <label for="pcd">Possui alguma deficiência física?</label>
                    <div className="div-pcd">
                        <input type="radio" name="opcao" value='Sim' /><p>Sim</p>
                        <input type="radio" name="opcao" value='Não' /><p>Não</p>
                    </div>
                    <label >Caso possua, qual?</label>
                    <input type="text" placeholder="Informe sua deficiência" />

                    <button className="confirmar" type="submit" onClick={reinicia}>Confirmar ficha pessoal</button>
                </form>
                
                <span>Após preencher o formulário, <Link to='/paciente/dashboard'>clique aqui para marcar uma consulta</Link></span>
            </div>
        </div>
    )
}