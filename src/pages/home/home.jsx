import Header from "./header";
import Footer from './footer';
import Main from "./main";
import Section from "./section";
import Section_dois from "./section_dois";
import '../../styles/home/home.scss';


export default function home() {


    return (
        <div className="container-home">
                <Header />
                <Main />
                <Section_dois />
                <Section />
                <Footer />
                </div>
    )
}