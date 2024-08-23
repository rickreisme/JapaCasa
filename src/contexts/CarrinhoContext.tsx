/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";
import {
    CarrinhoAPIResponse,
    CarrinhoContextType,
    CarrinhoItem,
    Endereco,
    Produto,
    Usuario,
} from "../types/CarrinhoContextTypes";
import toast from "react-hot-toast";

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
    undefined,
);

const getUserId = () => {
    const user = localStorage.getItem("usuario");
    if (user) {
        const parsedUser = JSON.parse(user) as Usuario;
        return parsedUser.id;
    }
    throw new Error("Usuário não encontrado");
};

const saveCarrinholocalStorage = (carrinho: CarrinhoItem[]) => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const loadCarrinholocalStorage = (): CarrinhoItem[] => {
    const savedCarrinho = localStorage.getItem("carrinho");
    return savedCarrinho ? JSON.parse(savedCarrinho) : [];
};

const fetchCarrinho = async (): Promise<CarrinhoAPIResponse> => {
    const userId = getUserId();
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlC = `${apiUrl}/carrinho`;
    const response = await fetch(apiUrlC, {
        headers: {
            "user-id": userId,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao recuperar os produtos do carrinho:");
    }

    return await response.json();
};

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery<CarrinhoAPIResponse>({
        queryFn: fetchCarrinho,
        queryKey: ["carrinho-data"],
        staleTime: 10000,
    });

    const formatCarrinho: CarrinhoItem[] =
        data?.carrinho.map((item) => ({
            produto: {
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                imagem: item.imagem,
            },
            quantidadeCarrinho: item.quantidadeCarrinho,
            observacoes: item.observacoes || "",
        })) || [];

    useEffect(() => {
        const sessionCarrinho = loadCarrinholocalStorage();

        if (sessionCarrinho.length > 0) {
            queryClient.setQueryData(
                ["carrinho-data"],
                (oldData: CarrinhoItem) => ({
                    ...oldData,
                    carrinho: sessionCarrinho.map((item) => ({
                        id: item.produto.id,
                        nome: item.produto.nome,
                        preco: item.produto.preco,
                        imagem: item.produto.imagem,
                        quantidadeCarrinho: item.quantidadeCarrinho,
                        observacoes: item.observacoes,
                    })),
                }),
            );
        }
    }, [queryClient]);

    useEffect(() => {
        saveCarrinholocalStorage(formatCarrinho);
    }, [formatCarrinho]);

    const addProdutoMutation = useMutation({
        mutationFn: async ({
            produto,
            quantidadeCarrinho,
            observacoes,
        }: CarrinhoItem) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrlC = `${apiUrl}/carrinho`;
            const userId = getUserId();

            const response = await fetch(apiUrlC, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": userId,
                },
                body: JSON.stringify({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    imagem: produto.imagem,
                    quantidadeCarrinho,
                    observacoes,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar produto ao carrinho");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho-data"] });
        },
    });

    const removeProdutoMutation = useMutation({
        mutationFn: async (id: number) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrlC = `${apiUrl}/carrinho/${id}`;
            const userId = getUserId();

            const response = await fetch(apiUrlC, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": userId,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao remover o produto do carrinho");
            }

            return response.json();
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["carrinho-data"] });

            const previousCartData = queryClient.getQueryData<{
                carrinho: {
                    id: number;
                    quantidadeCarrinho: number;
                    preco: number;
                }[];
            }>(["carrinho-data"]);

            if (previousCartData) {
                queryClient.setQueryData(["carrinho-data"], {
                    ...previousCartData,
                    carrinho: previousCartData.carrinho.filter(
                        (item) => item.id !== id,
                    ),
                });
            }

            return { previousCartData };
        },
        onError: (
            _err: unknown,
            _variables: number,
            context?: {
                previousCartData?: {
                    carrinho: {
                        id: number;
                        quantidadeCarrinho: number;
                        preco: number;
                    }[];
                };
            },
        ) => {
            if (context?.previousCartData) {
                queryClient.setQueryData(
                    ["carrinho-data"],
                    context.previousCartData,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho-data"] });
        },
    });

    const updateQuantidadeMutation = useMutation({
        mutationFn: async ({
            id,
            quantidadeCarrinho,
            preco,
        }: {
            id: number;
            quantidadeCarrinho: number;
            preco: number;
        }) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrlC = `${apiUrl}/carrinho/${id}`;
            const userId = getUserId();

            const response = await fetch(apiUrlC, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": userId,
                },
                body: JSON.stringify({
                    quantidadeCarrinho,
                    preco,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    "Erro ao atualizar a quantidade do produto no carrinho",
                );
            }

            return response.json();
        },
        onMutate: async ({
            id,
            quantidadeCarrinho,
        }: {
            id: number;
            quantidadeCarrinho: number;
        }) => {
            await queryClient.cancelQueries({ queryKey: ["carrinho-data"] });

            const previousCartData = queryClient.getQueryData<{
                carrinho: {
                    id: number;
                    quantidadeCarrinho: number;
                    preco: number;
                }[];
            }>(["carrinho-data"]);

            if (previousCartData) {
                queryClient.setQueryData(["carrinho-data"], {
                    ...previousCartData,
                    carrinho: previousCartData.carrinho.map((item) =>
                        item.id === id ? { ...item, quantidadeCarrinho } : item,
                    ),
                });
            }

            return { previousCartData };
        },
        onError: (
            _err: unknown,
            _variables: {
                id: number;
                quantidadeCarrinho: number;
                preco: number;
            },
            context?: {
                previousCartData?: {
                    carrinho: {
                        id: number;
                        quantidadeCarrinho: number;
                        preco: number;
                    }[];
                };
            },
        ) => {
            if (context?.previousCartData) {
                queryClient.setQueryData(
                    ["carrinho-data"],
                    context.previousCartData,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho-data"] });
        },
    });

    const clearCarrinhoMutation = useMutation({
        mutationFn: async () => {
            const userId = getUserId();
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrlC = `${apiUrl}/limpar`;

            const response = await fetch(apiUrlC, {
                method: "DELETE",
                headers: {
                    "user-id": userId,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao limpar o carrinho");
            }

            return await response.json();
        },

        onSuccess: () => {
            queryClient.setQueryData(["carrinho-data"], {
                carrinho: [],
                valorTotal: 0,
                valorTotalFrete: 0,
            });

            saveCarrinholocalStorage([]);
        },
    });

    const confirmarPedidoMutation = useMutation({
        mutationFn: async ({
            endereco,
            usuario,
        }: {
            endereco: Endereco;
            usuario: Usuario & { id: string };
        }) => {
            const userId = getUserId();
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiUrlC = `${apiUrl}/pedido/confirmar`;

            const response = await fetch(apiUrlC, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": userId,
                },
                body: JSON.stringify({
                    endereco,
                    usuario,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao confirmar o pedido");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Pedido confirmado com sucesso!", {
                style: {
                    borderBottom: "3px solid #03541a",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#03541a",
                    secondary: "#FFFAEE",
                },
            });
        },
        onError: (error: Error) => {
            console.error("Erro ao confirmar o pedido:", error.message);
            alert("Erro ao confirmar o pedido. Por favor, tente novamente.");
        },
    });

    const addProduto = (
        produto: Produto,
        quantidadeCarrinho: number,
        observacoes: string,
    ) => {
        const produtoExistente = data?.carrinho.find(
            (item) => item.id === produto.id,
        );

        if (produtoExistente) {
            console.log("Produto existente encontrado:", produtoExistente);
            updateQuantidade(produto.id, quantidadeCarrinho);
        } else {
            const novoItem: CarrinhoItem = {
                produto,
                quantidadeCarrinho,
                observacoes,
            };
            console.log("Adicionando novo item:", novoItem);
            addProdutoMutation.mutate(novoItem);
        }
    };

    const removeProduto = (id: number) => {
        removeProdutoMutation.mutate(id);
    };

    const clearCarrinho = () => {
        clearCarrinhoMutation.mutate();
    };

    const updateQuantidade = (id: number, delta: number) => {
        const carrinhoItem = data?.carrinho.find((item) => item.id === id);
        if (carrinhoItem) {
            const newQuantidade = Math.max(
                1,
                carrinhoItem.quantidadeCarrinho + delta,
            );
            const novoPreco =
                (carrinhoItem.preco / carrinhoItem.quantidadeCarrinho) *
                newQuantidade;
            updateQuantidadeMutation.mutate({
                id,
                quantidadeCarrinho: newQuantidade,
                preco: novoPreco,
            });
        }
    };

    const confirmarPedido = ({
        endereco,
        usuario,
    }: {
        endereco: Endereco;
        usuario: Usuario & { id: string };
    }) => {
        confirmarPedidoMutation.mutate({
            endereco,
            usuario,
        });
    };

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho: formatCarrinho,
                valorTotal: data?.valorTotal || 0,
                valorTotalFrete: data?.valorTotalFrete || 0,
                isLoading,
                isError,
                addProduto,
                removeProduto,
                clearCarrinho,
                updateQuantidade,
                confirmarPedido,
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
