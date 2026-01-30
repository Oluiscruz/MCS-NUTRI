import '../../styles/home/chat_fixo.scss';
import { FaWhatsapp } from "react-icons/fa";

export default function ChatFixo( ) {

    return(

        <div className="chat-container">
            <div className="mensagem">
                Fale comigo!
            </div>
            <div className="chat-fixo">

            <a href="https://wa.me/5581999154208?text=Olá Dra. Manuela Cristina 🥰, gostaria de mais informações sobre sua consulta" target="_blank" rel="noopener noreferrer">
            <span>1</span>
                <i><FaWhatsapp size={32}/></i>
            </a>
            </div>
        </div>
    )
}