import "../assets/styles/home.scss";
import sushi from "../assets/img/sushi.jpg";
import { Helmet } from "react-helmet-async";
import TextCardJP from "../components/TextCardJP";
import ContentLocal from "../components/ContentLocal";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>JapaCasa! | Comida Japonesa e Delivery</title>
            </Helmet>

            <div className="container-home">
                <div className="content_home">
                    <h1>
                        Bem-vindo(a) ao Japa<span>Casa!</span>
                    </h1>

                    <div className="content_home-text">
                        <p>
                            Somos o restaurante delivery de comida japonesa mais
                            quente da cidade!
                        </p>
                    </div>
                </div>

                <div className="content_carda">
                    <div className="home_esquerda">
                        <img src={sushi} />
                    </div>

                    <div className="home_direita">
                        <p>
                            Aqui no <span>JapaCasa!</span> você encontra as
                            melhores delícias da Terra do Sol Nascente sem
                            precisar sair de casa. <br />
                            Confira o nosso cardápio e escolha a sua próxima
                            paixão culinária!
                        </p>
                        <a href="cardapio" className="btn1">
                            Ver Cardápio
                        </a>
                    </div>
                </div>

                <div className="content_breve">
                    <h1>EM BREVE</h1>
                    <div className="home_breve">
                        <h2>
                            Você poderá aproveitar sua refeição como se
                            estivesse na sua casa.
                        </h2>
                        <h3>
                            Estamos reformando nossa unidade física para
                            recebê-lo!
                        </h3>
                    </div>
                </div>

                <TextCardJP />

                <ContentLocal />
            </div>
        </>
    );
};

export default Home;
