import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlP = `${apiUrl}/produtos`;

const fetchProdutos = async () => {
    const response = await fetch(apiUrlP);

    if (!response.ok) {
        throw new Error("Erro ao recuperar os produtos");
    }

    const produtos = await response.json();
    console.log(produtos)
    return produtos;
};

export function useProdutos() {
    const query = useQuery({
        queryFn: fetchProdutos,
        queryKey: ["produtos-data"],
    });

    return query;
}