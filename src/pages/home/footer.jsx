import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";  
import '../../styles/home/footer.scss'

export default function Footer() {
    return (
        <footer className="footer" >

                <div className="contato-footer">
                    <p>Entre em contato comigo e conheça mais sobre meus trabalhos:</p>
                    <div className="icons-footer">
                        <li><a href="mailto:nutrimanuelacristina@gmail.com"><MdOutlineMailOutline size={29}/></a></li>
                        <li><a href=" https://wa.me/5581999154208?text=🧑🏽‍💻 Olá Dra. Manuela, adoraria agendar uma consulta com você"><FaWhatsapp size={28} /></a></li>
                        <li><a href="https://www.instagram.com/nutrimanuelacristina"><FaInstagram size={28} /></a></li>
                    </div>
                </div>

                <div className="info-footer">
                <p>© 2026 MCS Nutricionistas. Todos os direitos reservados.</p>
                <span>Projeto totalmente desenvolvido por <a href="https://github.com/Oluiscruz">.Oluisdev</a></span>
            </div>
        </footer >
    )
}