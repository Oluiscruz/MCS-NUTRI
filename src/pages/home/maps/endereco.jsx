import "../../../styles/home/endereco.scss";
import MapPage from "./mapPage";

export default function Endereco() {

    return (
        <div className="endereco">
            <div className="header-endereco">
                <div className="title">
                    <div className="bar"></div>
                    <h1>Endereço</h1>
                    <div className="bar"></div>
                </div>
            </div>

            <section className="section">
                <div className="infos-local">

                    <div className="localizacao">
                        <h2>Rua Corredor do bispo, 125</h2>
                        <h3>Lado B, Sala 05 e 06</h3>
                        <h4>Boa Vista, Recife - PE</h4>
                    </div>

                    <div className="data">
                        <div className="info">

                            <div className="dia">

                                <h2>Sábado</h2>
                                <p>17:00h às 20:00h</p>
                            </div>
                            <div className="dia">
                                <h2>Domingo</h2>
                                <p>09:00h à 12:00h</p>
                            </div>
                        </div>

                        <div className="acoes">
                            <a href="https://wa.me/5581999154208?text=Olá dra Manuela!, gostaria de mais informações sobre sua consulta"><button className="contato">Entrar em contato</button></a>
                        </div>
                    </div>

                </div>
                <div className="google-maps">
                    <MapPage />
                </div>


            </section>
        </div>
    );
}