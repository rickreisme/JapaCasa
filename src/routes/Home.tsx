import '../assets/styles/home.css'
import sushiHome from '../assets/img/sushi-home.jpeg'
import sushi from '../assets/img/sushi.jpg'

const Home = () => {
    return (
        <>
            <div className="container-home">
                <div className="content_home">
                    <div className="home_esquerda">
                        <div className="text-card">
                            <h2 className="text-H">
                                Tá na hora do Japa,<span id="spjapa2">Japa</span><span id="spcasa">Casa!</span>
                            </h2>
                        </div>

                        <p>
                            Bem-vindo ao restaurante delivery de comida japonesa mais quente da região!<br />
                            Aqui no JapaCasa! você encontra as melhores delícias da Terra do Sol Nascente
                            sem precisar sair de casa.
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
                        <h2>Confira o nosso cardápio e escolha a sua próxima paixão
                            culinária! </h2>
                        <a href="cardapio.html" className="btn1">
                            Acessar o Cardápio
                        </a>
                    </div>
                </div>

                <div className="content_breve">
                    <h1>EM BREVE</h1>
                    <div className="home_breve">
                        <h4>EM BREVE</h4>
                        <h2>Você poderá aproveitar sua refeição em um ambiente
                            <br />tão aconchegante quanto a sua casa.
                        </h2>
                        <h3>Estamos reformando nossa unidade física para recebê-lo!
                        </h3>
                    </div>
                </div>

                <div className="content_local" id="cont_local">
                    <div className="text-card2">
                        <h1>Caso preferir, você pode buscar sua refeição em nossa unidade física</h1>
                    </div>
                    <div className="home_local">
                        <div id="endereco">
                            <h2>Endereço</h2>
                            <p>Rua Michael Jackson, 1958
                                <br />Jardim Neverland,
                                <br />Ribeirão Preto - SP
                            </p>
                        </div>

                        <div id="funcionamento">
                            <h2>Horário de funcionamento</h2>
                            <p>
                                Segunda á Sábado<br />
                                Almoço das 11h ás 15h00<br />
                                Jantar das 18h ás 23h00
                            </p>
                        </div>

                        <div id="funcionamento">
                            <h2>Contato</h2>
                            <p>
                                Delivery: (16) 98888-8888<br />
                                Peça também pelo WhatsApp<br />ou pelo iFood<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
