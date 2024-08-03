/* eslint-disable react-hooks/exhaustive-deps */
import formatCurrency from "../utils/formatCurrency";
import "../assets/styles/carrinho.scss";
import { Helmet } from "react-helmet-async";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useEffect } from "react";

const Carrinho = () => {
    const { carrinho, removeProduto, fetchCarrinho } = useCarrinho();

    useEffect(() => {
        fetchCarrinho();
    }, []);

    useEffect(() => {
        console.log("Dados do carrinho:", carrinho);
    }, [carrinho]);

    const renderCarrinho = () => {
        if (!carrinho || carrinho.length === 0) {
            return (
                <div className="no-service">
                    <p>Nenhum produto encontrado no carrinho...</p>
                </div>
            );
        }

        return carrinho.map((data) => (
            <div
                className="carrinho-card"
                key={data.produto.id}
                title={data.produto.nome}
            >
                <h3 className="nome">{data.produto.nome}</h3>

                <h4 className="preco">
                    Valor total do produto: {formatCurrency(data.produto.preco)}
                </h4>

                <h4 className="qtd">Quantidade: {data.quantidadeCarrinho}</h4>

                <h5 className="obs">Observações: {data.observacoes}</h5>

                <button onClick={() => removeProduto(data.produto.id)}>
                    Remover
                </button>
            </div>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Carrinho | JapaCasa! </title>
            </Helmet>

            <div className="carrinho_title">
                <h2>
                    Confira o seu <span id="spjapa2"> Carrinho</span>
                    <span id="spcasa">!</span>
                </h2>
            </div>

            <div className="content_home">{renderCarrinho()}</div>
        </>
    );
};

export default Carrinho;
