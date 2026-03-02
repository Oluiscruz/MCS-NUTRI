import Header from "./header";
import Footer from './footer';
import Main from "./main";
import Section from "./section";
import '../../styles/home/home.scss';


export default function home() {


    return (
        <div className="container-home">
                <Header />
                <Main />
                <Section />
                <Footer />
                </div>
    )
}