import "../assets/styles/dados-pedido.scss";
import { usePedido } from "../hooks/usePedido";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import formatCurrency from "../utils/formatCurrency";

interface ApiError extends Error {
    status?: number;
}

const DadosPedidos = () => {
    const { data, error, isLoading, isError } = usePedido();

    if (isLoading) {
        return (
            <CircularProgress
                color="error"
                sx={{
                    display: 'flex',
                    width: "90%",
                    margin: "25px auto",
                }}
            />
        );
    }

    if (isError) {
        const apiError = error as ApiError;
        const statusCode = apiError?.status;

        if (statusCode === 404) {
            return (
                <Alert variant="filled" severity="warning">
                    <AlertTitle>Aguardando Pedido</AlertTitle>Estamos aguardando
                    a confirmação do pedido!
                </Alert>
            );
        }

        return (
            <Alert
                variant="filled"
                severity="error"
                sx={{
                    width: "90%",
                    margin: "25px auto",
                }}
            >
                <AlertTitle>Aguardando Pedido</AlertTitle>
                Estamos aguardando a confirmação do pedido!
            </Alert>
        );
    }

    if (!data?.endereco || !data.usuario || data.carrinho.length === 0) {
        return (
            <div className="no-service">
                <h6>Nenhum produto encontrado...</h6>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="no-service">
                <h6>Nenhum pedido encontrado.</h6>
            </div>
        );
    }

    const { carrinho, endereco, usuario } = data;

    return (
        <div className="dados-pedido">
            {carrinho && endereco && usuario ? (
                <>
                    <h1>Revise o seu pedido</h1>
                    <div className="dados-pedido_content">
                        <div className="itens-pedido">
                            <h3>Itens no carrinho</h3>
                            <div className="itens-content">
                                {carrinho.length > 0 ? (
                                    carrinho.map((data, index) => (
                                        <div
                                            key={index}
                                            className="item-pedido"
                                        >
                                            <h6>
                                                <strong>Produto: </strong>
                                                {data.nome}
                                            </h6>

                                            <h6>
                                                <strong>Quantidade: </strong>
                                                {data.quantidadeCarrinho}
                                            </h6>

                                            <h6>
                                                <strong>Valor: </strong>
                                                {formatCurrency(data.preco)}
                                            </h6>

                                            {data.observacoes && (
                                                <>
                                                    <h6>
                                                        <strong>
                                                            Observações:
                                                        </strong>
                                                        {data.observacoes}
                                                    </h6>
                                                </>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <li>Nenhum item encontrado.</li>
                                )}
                            </div>
                        </div>

                        <div className="endereco-pedido">
                            <h3>Endereço</h3>
                            <div className="endereco-pedido_content">
                                <h6>
                                    <strong>CEP:</strong>{" "}
                                    {endereco?.cep || "N/A"}
                                </h6>
                                <h6>
                                    <strong>Logradouro:</strong>{" "}
                                    {endereco?.logradouro || "N/A"}
                                </h6>
                                <h6>
                                    <strong>Bairro:</strong>{" "}
                                    {endereco?.bairro || "N/A"}
                                </h6>
                                <h6>
                                    <strong>Número:</strong>{" "}
                                    {endereco?.numero || "N/A"}
                                </h6>
                                {endereco?.complemento && (
                                    <h6>
                                        <strong>Complemento:</strong>{" "}
                                        {endereco.complemento}
                                    </h6>
                                )}
                            </div>
                        </div>

                        <div className="contato-pedido">
                            <h3>Contato</h3>
                            <div className="contato-pedido_content">
                                <h6>
                                    <strong>Nome:</strong>{" "}
                                    {usuario?.nome || "N/A"}
                                </h6>
                                <h6>
                                    <strong>Celular:</strong>{" "}
                                    {usuario?.celular || "N/A"}
                                </h6>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="no-service">
                    <h6>Nenhum pedido encontrado.</h6>
                </div>
            )}
        </div>
    );
};

export default DadosPedidos;
