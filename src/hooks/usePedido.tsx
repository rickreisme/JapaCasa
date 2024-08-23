import { useQuery } from "@tanstack/react-query";
import { ProdutoAPI } from "../types/CarrinhoContextTypes";

interface CarrinhoResponse {
    carrinho: ProdutoAPI[];
    valorTotal: number;
    valorTotalFrete: number;
}

const fetchInfoPedido = async () => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
        throw new Error("Session ID não encontrado.");
    }

    const carrinhoResponse = await fetch(
        "https://japacasa-api.onrender.com/carrinho",
        {
            headers: {
                "Content-Type": "application/json",
                "session-id": sessionId,
            },
        },
    );

    if (!carrinhoResponse.ok) {
        throw new Error(
            `Erro na requisição do carrinho: ${carrinhoResponse.status}`,
        );
    }

    const carrinhoData: CarrinhoResponse = await carrinhoResponse.json();

    const infoResponse = await fetch(
        "https://japacasa-api.onrender.com/pedido/confirmar",
        {
            headers: {
                "Content-Type": "application/json",
                "session-id": sessionId,
            },
        },
    );

    if (!infoResponse.ok) {
        throw new Error(`Erro na requisição: ${infoResponse.status}`);
    }

    const infoData = await infoResponse.json();

    return {
        carrinho: carrinhoData.carrinho,
        endereco: infoData.endereco,
        usuario: infoData.usuario,
    };
};

export function usePedido() {
    return useQuery({
        queryKey: ["pedido-data"],
        queryFn: fetchInfoPedido,
    });
}
