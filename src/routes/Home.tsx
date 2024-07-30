import "../assets/styles/home.scss";
import sushiHome from "../assets/img/sushi-home.jpeg";
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
                    <div className="home_esquerda">
                        <TextCardJP />

                        <p>
                            Bem-vindo ao restaurante delivery de comida japonesa
                            mais quente da região! Aqui no JapaCasa! você
                            encontra as melhores delícias da Terra do Sol
                            Nascente sem precisar sair de casa.
                        </p>
                    </div>

                    <div className="home_direita">
                        <img src={sushiHome} />
                        
                    </div>
                </div>

                <div className="content_carda">
                    <div className="home_esquerda">
                        <img src={sushi} />
                    </div>

                    <div className="home_direita">
                        <h2>
                            Confira o nosso cardápio e escolha a sua próxima
                            paixão culinária!{" "}
                        </h2>
                        <a href="cardapio" className="btn1">
                            Acessar o Cardápio
                        </a>
                    </div>
                </div>

                <div className="content_breve">
                    <h1>EM BREVE</h1>
                    <div className="home_breve">
                        <h4>EM BREVE</h4>
                        <h2>
                            Você poderá aproveitar sua refeição em um ambiente
                            <br />
                            tão aconchegante quanto a sua casa.
                        </h2>
                        <h3>
                            Estamos reformando nossa unidade física para
                            recebê-lo!
                        </h3>
                    </div>
                </div>

                <ContentLocal/>
            </div>
        </>
    );
};

export default Home;
