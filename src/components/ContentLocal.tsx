import "../assets/styles/contentLocal.scss";

const ContentLocal = () => {
    return (
        <div className="content_local" id="cont_local">
            <div className="home_local">
                <div id="endereco" className="dados-local">
                    <h2>Endereço</h2>
                    <p>
                        Rua Professor Jackson, 1958, Jardim Mundo, <br />{" "}
                        Ribeirão Preto - SP
                    </p>
                </div>

                <div id="funcionamento" className="dados-local">
                    <h2>Horário de funcionamento</h2>
                    <p>
                        <strong>Segunda a Sábado</strong> <br /> Almoço das 11h
                        às 16h00 e Jantar das 18h às 00h
                    </p>
                </div>

                <div id="contato" className="dados-local">
                    <h2>Delivery</h2>
                    <p>
                        Peça pelo <strong>telefone</strong>:{" "}
                        <strong>(16) 3111-2222</strong> <br />
                        Ou pelo <strong>whatsapp</strong>:{" "}
                        <strong>(16) 91111-3333</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContentLocal;
