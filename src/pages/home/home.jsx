import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import Section from "./section";
import "../../styles/home/home.scss";
import Endereco from "./maps/endereco";

export default function home() {
    
    return (
        <div className="container-home">
            <Header />
            <Main />
            <Endereco />
            <Section />
            <Footer />
        </div>
    );
}
