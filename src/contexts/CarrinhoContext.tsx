/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type Produto = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
};

type CarrinhoItem = {
    produto: Produto;
    quantidadeCarrinho: number;
    observacoes: string;
};

type CarrinhoContextType = {
    carrinho: CarrinhoItem[];
    valorTotal: number;
    valorTotalFrete: number;
    addProduto: (
        produto: Produto,
        quantidade: number,
        observacoes: string,
    ) => void;
    updateQuantidade: (id: number, delta: number) => void;
    removeProduto: (id: number) => void;
    clearCarrinho: () => void;
    fetchCarrinho: () => void;
};

interface ProdutoAPI {
    id: number;
    nome: string;
    imagem: string,
    preco: number;
    quantidadeCarrinho: number;
    observacoes?: string;
}

interface CarrinhoAPIResponse {
    carrinho: ProdutoAPI[];
    valorTotal: number;
    valorTotalFrete: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
    undefined,
);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
    const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [valorTotalFrete, setValorTotalFrete] = useState<number>(0); 

    useEffect(() => {
        fetchCarrinho();
    }, []);

    useEffect(() => {
        updateValorTotal(carrinho);
    }, [carrinho]);

    useEffect(() => {
        updateValorTotalFrete(carrinho);
    }, [carrinho]);

    const addProduto = (
        produto: Produto,
        quantidadeCarrinho: number,
        observacoes: string,
    ) => {
        setCarrinho((prevCarrinho) => [
            ...prevCarrinho,
            { produto, quantidadeCarrinho, observacoes },
        ]);
    };

    const removeProduto = async (id: number) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho.filter((item) => item.produto.id !== id),
        );

        const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrlC = `${apiUrl}/carrinho/${id}`;

        try {
            setCarrinho((prevCarrinho) =>{
                const novoCarrinho = prevCarrinho.filter(
                    (item) => item.produto.id !== id
                );
                updateValorTotal(novoCarrinho);
                updateValorTotalFrete(novoCarrinho);
                return novoCarrinho;
            });

            const response = await fetch(apiUrlC, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    "Erro ao remover o produto do carrinho (na API):",
                );
            }

            console.log("Produto removido do carrinho com sucesso!");
        } catch (error) {
            console.error("Erro ao remover produto do carrinho:", error);
        }
    };

    const clearCarrinho = () => {
        setCarrinho([]);
        setValorTotal(0);
        setValorTotalFrete(0);
    };

    const fetchCarrinho = async () => {
        console.log("Fetching carrinho...");
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrlC = `${apiUrl}/carrinho`;

        try {
            const response = await fetch(apiUrlC);
            if (!response.ok) {
                throw new Error("Erro ao recuperar os produtos do carrinho:");
            }

            const data: CarrinhoAPIResponse = await response.json();
            console.log("Dados recebidos:", data);

            const { carrinho, valorTotal, valorTotalFrete } = data;

            const formatData: CarrinhoItem[] = carrinho.map((item) => ({
                produto: {
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    imagem: item.imagem,
                },
                quantidadeCarrinho: item.quantidadeCarrinho,
                observacoes: item.observacoes || "",
            }));

            setCarrinho(formatData);
            setValorTotal(valorTotal);
            setValorTotalFrete(valorTotalFrete);
        } catch (error) {
            console.error("Erro ao recuperar o carrinho:", error);
        }
    };

    const updateQuantidade = async (id: number, delta: number) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrlC = `${apiUrl}/carrinho/${id}`;

        setCarrinho((prevCarrinho) => {
            const novoCarrinho = prevCarrinho.map((item) => {
                if (item.produto.id === id) {
                    const newQuantidade = Math.max(
                        1,
                        item.quantidadeCarrinho + delta,
                    );
                    const precoUnitario =
                        item.produto.preco / item.quantidadeCarrinho;
                    const novoPreco = precoUnitario * newQuantidade;
                    return {
                        ...item,
                        quantidadeCarrinho: newQuantidade,
                        produto: {
                            ...item.produto,
                            preco: novoPreco,
                        },
                    };
                }
                return item;
            });

            updateValorTotal(novoCarrinho);
            updateValorTotalFrete(novoCarrinho);

            const carrinhoItem = novoCarrinho.find(
                (item) => item.produto.id === id,
            );
            if (carrinhoItem) {
                fetch(apiUrlC, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantidadeCarrinho: carrinhoItem.quantidadeCarrinho,
                        preco: carrinhoItem.produto.preco,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                "Erro ao atualizar a quantidade do produto no carrinho na API",
                            );
                        }
                        console.log(
                            "Quantidade do produto atualizada com sucesso!",
                        );
                    })
                    .catch((error) => {
                        console.error(
                            "Erro ao atualizar a quantidade do produto no carrinho:",
                            error,
                        );
                    });
            }
            return novoCarrinho;
        });
    };

    const updateValorTotal = (novoCarrinho: CarrinhoItem[]) => {
        const total = novoCarrinho.reduce(
            (total, item) => total + item.produto.preco,
            0,
        );
        setValorTotal(total);
    };

    const updateValorTotalFrete = (novoCarrinho: CarrinhoItem[]) => {
        const total = novoCarrinho.reduce(
            (total, item) => total + item.produto.preco,
            0,
        );

        const totalFrete = total + 5;
        setValorTotalFrete(totalFrete);
    };

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                valorTotal,
                valorTotalFrete,
                addProduto,
                removeProduto,
                clearCarrinho,
                updateQuantidade,
                fetchCarrinho,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);

    if (context === undefined) {
        throw new Error(
            "useCarrinho deve ser usado dentro de um CarrinhoProvider",
        );
    }

    return context;
};
