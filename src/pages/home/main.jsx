import '../../styles/home/main.scss';
import ChatFixo from "./chat_fixo";
import ManuelaBanner from '../../assets/images/Manuela.png';
import { useNavigate } from 'react-router-dom';

export default function Main() {

const navigate = useNavigate();
    const Agendamento = () => {
        navigate('paciente/perfil');
    }
    
    return (
        <main className="banner-home">
            <div className="content-banner">
                <h1>CRN-6: 40516</h1>
                <h2>Nutricionista</h2>
                <h3>Manuela Cristina Santos</h3>
                <p>Emagrecimento, Musculação,
                    Bem-estar, Saúde e Qualidade de Vida</p>
                <button className='get-started' onClick={Agendamento}>Agendar Consulta</button>
            </div>

            <div className="image-banner">
                <img src={ManuelaBanner} alt="Manuela Cristina Santos" />
            </div>

            <ChatFixo />
        </main>
    )
}