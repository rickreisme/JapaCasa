import { useQuery } from "@tanstack/react-query";
import { ProdutoAPI, Usuario } from "../types/CarrinhoContextTypes";

interface CarrinhoResponse {
    carrinho: ProdutoAPI[];
    valorTotal: number;
    valorTotalFrete: number;
}

const fetchInfoPedido = async () => {
    const getUserId = () => {
        const user = localStorage.getItem("usuario");
        if (user) {
            const parsedUser = JSON.parse(user) as Usuario;
            return parsedUser.id;
        }

        console.log(user)
        throw new Error("Usuário não encontrado");
    };

    const userId = getUserId();

    const carrinhoResponse = await fetch(
        "https://japacasa-api.onrender.com/carrinho",
        {
            headers: {
                "Content-Type": "application/json",
                "user-id": userId,
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
                "user-id": userId,
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
        refetchInterval: 3000,
        staleTime: 90000,
    });
}
