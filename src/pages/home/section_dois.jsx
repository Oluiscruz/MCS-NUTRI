import Image1 from '../../assets/images/section-1.svg';
import Image2 from '../../assets/images/section-2.svg';
import Image3 from '../../assets/images/section-3.svg';
import Image4 from '../../assets/images/section-4.svg';
import '../../styles/home/section_dois.scss';

export default function Section_dois() {
    return (

        <section className="container-section-home-dois">
            <div className="grid">
                <img src={Image1} alt="" />
                <div className="info-text">
                    <h3>Avaliação e Planejamento</h3>
                    <div className="bar"></div>

                    <p>Faço avaliações sobre seus hábitos alimentares e estilo de vida e 
                    elaboro um plano alimentar utilizando a melhor estratégia para atingir seu objetivo.</p>
                </div>
            </div>
            <div className="grid">
                <img src={Image2} alt="" />
                <div className="info-text">
                    <h3>Alimentação e musculação</h3>
                    <div className="bar"></div>

                    <p>Com a dieta ideal você pode potencializar seus ganhos, além de alcançar a sonhada hipertrofia</p>
                </div>
            </div>
            <div className="grid">
                <img src={Image3} alt="" />
                <div className="info-text">
                    <h3>Suplementação</h3>
                    <div className="bar"></div>
                    <p>Receitas de suplementação ideais para o desempenho do seu corpo e que ajude em seus objetivos</p>
                </div>
            </div>
            <div className="grid">
                <img src={Image4} alt="" />
                <div className="info-text">
                    <h3>Alimentação sob medida</h3>
                    <div className="bar"></div>

                    <p>Elaboro sua alimentação de acordo com suas preferências, necessidades e objetivos.</p>
                </div>
            </div>
        </section>
    )
}