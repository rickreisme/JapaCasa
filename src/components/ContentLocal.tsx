import "../assets/styles/contentLocal.scss";

const ContentLocal = () => {
    return (
        <div className="content_local" id="cont_local">
            <div className="text-card2">
                <h1>
                    Caso preferir, você pode buscar sua refeição em nossa
                    unidade física
                </h1>
            </div>
            <div className="home_local">
                <div id="endereco">
                    <h2>Endereço</h2>
                    <p>
                        Rua Professor Jackson, 1958, Jardim Terra do Nunca,{" "}
                        <br /> Ribeirão Preto - SP
                    </p>
                </div>

                <div id="funcionamento">
                    <h2>Horário de funcionamento</h2>
                    <p>
                        Segunda a Sábado <br /> Almoço das 11h às 16h00 e Jantar
                        das 18h às 23h00
                    </p>
                </div>

                <div id="funcionamento">
                    <h2>Contato</h2>
                    <p>
                        Delivery: (16) 98765-4321 <br />
                        Peça também pelo WhatsApp ou pelo iFood!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContentLocal;
