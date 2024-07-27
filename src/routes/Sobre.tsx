import { Helmet } from "react-helmet-async";
import '../assets/styles/sobre.scss'


const Sobre = () => {
    return (
        <>
            <Helmet>
                <title>Sobre | JapaCasa! </title>
            </Helmet>

            <main>
                <div className="text-card3">
                    <h2 className="text-H">
                        Seja bem vindo ao <span className="spjapa2">Japa</span>
                        <span className="spcasa2">Casa!</span>
                    </h2>
                </div>

                <div className="content_sobre">
                    <div className="home_esquerda">
                        <h4>Sobre o nós</h4>
                        <h3>
                            Embarque em uma jornada culinária que celebra os
                            sabores autênticos do Japão, diretamente para o
                            conforto da sua casa. Aqui, no JapaCasa, estamos
                            comprometidos em proporcionar a você uma experiência
                            gastronômica única, onde a tradição encontra a
                            inovação.
                        </h3>
                        <h3>
                            Com nossa seleção cuidadosamente elaborada de pratos
                            japoneses clássicos e contemporâneos, cada refeição
                            é uma oportunidade para explorar uma explosão de
                            sabores e texturas. Desde nossos sushis frescos e
                            coloridos até nossos deliciosos pratos quentes, cada
                            item é preparado com os melhores ingredientes e
                            amorosos detalhes.
                        </h3>
                    </div>
                    <div className="home_direita">
                        <img src="assets/img/sushi-gd99e253f0_640.jpg" />
                    </div>
                </div>

                <div className="content_bottom2">
                    <img src="assets/img/japanese-sushi.jpg" />
                    <img src="assets/img/hotroll.png" />
                    <img src="assets/img/sushi-2370272_960_720.jpg" />
                </div>

                <div className="content_sobre">
                    <div className="home_direita">
                        <img src="assets/img/niguiri-urumaki.jpg" />
                    </div>
                    <div className="home_esquerda">
                        <h4>Nosso trabalho</h4>
                        <h3>
                            Atualmente, oferecemos opções de delivery e retirada
                            no local para garantir que você possa desfrutar do
                            seu sabor favorito do JapaCasa! onde quer que
                            esteja. E enquanto nossa unidade física está sendo
                            reformada, aguardamos ansiosamente a oportunidade de
                            recebê-lo em nosso novo espaço, onde você poderá
                            desfrutar não apenas da nossa comida excepcional,
                            mas também de uma atmosfera acolhedora e
                            hospitalidade japonesa autêntica.
                        </h3>
                        <h3>
                            Explore nosso menu, faça seu pedido e deixe-nos
                            levá-lo em uma jornada gastronômica memorável.
                            Obrigado por escolher JapaCasa!
                        </h3>
                        <a href="cardapio.html" className="btn1">
                            <h2>Acessar o Cardápio</h2>
                        </a>
                    </div>
                </div>

                <div className="text-card">
                    <h2 className="text-H">
                        Tá na hora do Japa,{" "}
                        <span className="spjapa2">Japa</span>
                        <span className="spcasa2">Casa!</span>
                    </h2>
                </div>

                <div className="content_local" id="cont_local">
                    <div className="text-card2">
                        <h1>
                            Caso preferir, você pode buscar sua refeição em
                            nossa unidade física
                        </h1>
                    </div>
                    <div className="home_local">
                        <div id="endereco">
                            <h2>Endereço</h2>
                            <p>
                                Rua Michael Jackson, 1958
                                <br />
                                Jardim Neverland,
                                <br />
                                Ribeirão Preto - SP
                            </p>
                        </div>

                        <div id="funcionamento">
                            <h2>Horário de funcionamento</h2>
                            <p>
                                Segunda á Sábado
                                <br />
                                Almoço das 11h ás 15h00
                                <br />
                                Jantar das 18h ás 23h00
                            </p>
                        </div>

                        <div id="funcionamento">
                            <h2>Contato</h2>
                            <p>
                                Delivery: (16) 98888-8888
                                <br />
                                Peça também pelo WhatsApp
                                <br />
                                ou pelo iFood
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Sobre;
