/* eslint-disable react-hooks/exhaustive-deps */
import formatCurrency from "../utils/formatCurrency";
import "../assets/styles/carrinho.scss";
import {
    FaPlusCircle,
    FaMinusCircle,
    FaMotorcycle,
    FaTrash,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useTransition } from "react";

const Carrinho = () => {
    const {
        carrinho,
        valorTotal,
        valorTotalFrete,
        isLoading,
        isError,
        removeProduto,
        updateQuantidade,
    } = useCarrinho();

    const [, startTransition] = useTransition();

    const handleQuantidadeChange = (id: number, delta: number) => {
        startTransition(() =>{
            updateQuantidade(id, delta);
        })
    };
    

    const renderCarrinho = () => {
        
        if (isLoading) {
            return <CircularProgress color="error" />;
        }

        if (isError) {
            return (
                <Alert variant="filled" severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    Não foi possível carregar os dados do carrinho.
                </Alert>
            );
        }

        if (!carrinho || carrinho.length === 0) {
            return (
                <div className="no-service">
                    <p>Nenhum produto foi adicionado ao carrinho</p>
                </div>
            );
        }

        return carrinho.map((data) => {
            console.log(data.quantidadeCarrinho)
            return (
                <div
                    className="carrinho-card"
                    key={data.produto.id}
                    title={data.produto.nome}
                >
                    <div className="infos">
                        <div className="img">
                            <img src={data.produto.imagem} />
                        </div>

                        <div className="info-produto">
                            <h4 className="nome">{data.produto.nome}</h4>

                            <h5 className="preco">
                                {formatCurrency(data.produto.preco)}
                            </h5>

                            {data.observacoes && (
                                <h6 className="obs">
                                    <b>Observações: </b>
                                    {data.observacoes}
                                </h6>
                            )}
                        </div>
                    </div>

                    <div className="controle">
                        <div className="qtd">
                            <button
                                className="btn-qtd"
                                onClick={() =>
                                    handleQuantidadeChange(data.produto.id, -1)
                                }
                            >
                                <FaMinusCircle className="icon-quantidade-control" />
                            </button>

                            <span>{data.quantidadeCarrinho}</span>

                            <button
                                className="btn-qtd"
                                onClick={() =>
                                    handleQuantidadeChange(data.produto.id, 1)
                                }
                            >
                                <FaPlusCircle />
                            </button>
                        </div>

                        <button
                            className="btn-remover-item"
                            onClick={() => removeProduto(data.produto.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            );
        });
    };

    const renderTotal = () => {
        return (
            <div className="total">
                <span className="subtotal">
                    <b>Subtotal:</b>
                    {formatCurrency(valorTotal)}
                </span>

                <span className="frete">
                    <div className="entrega">
                        {" "}
                        <FaMotorcycle /> Entrega:
                    </div>
                    {formatCurrency(5)}
                </span>

                {valorTotalFrete != 5 ? (
                    <span className="total-frete">
                        <b>Valor total:</b>
                        <span className="valor">
                            {formatCurrency(valorTotalFrete)}
                        </span>
                    </span>
                ) : (
                    <span className="total-frete">
                        <b>Valor total:</b>
                        <span className="valor">{formatCurrency(0)}</span>
                    </span>
                )}
            </div>
        );
    };

    return (
        <>
            <Helmet>
                <title>Carrinho | JapaCasa! </title>
            </Helmet>

            <div className="carrinho_title">
                <h2>
                    Confira o seu <span id="spjapa2"> Carrinho:</span>
                </h2>
            </div>

            <div className="content_home">{renderCarrinho()}</div>

            <div className="carrinho_total">{renderTotal()}</div>

            <div className="rotas-carrinho">
                <a href="/cardapio" className="btn-rotas btn-carrinho-voltar">
                    Voltar para o cardápio
                </a>

                <a href="" className="btn-rotas btn-carrinho-continuar">
                    Continuar para o checkout
                </a>
            </div>
        </>
    );
};

export default Carrinho;
