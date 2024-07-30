/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Produto ={
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
    addProduto: (produto: Produto, quantidade: number, observacoes: string) => void;
    removeProduto: (id: number) => void;
    clearCarrinho: () => void;
    fetchCarrinho: () => void;
};

interface ProdutoAPI{
    id: number;
    nome: string;
    preco: number;
    quantidadeCarrinho: number;
    observacoes?: string;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({children}: {children: ReactNode}) =>{
    const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

    useEffect(() =>{
        fetchCarrinho();
    },[]);

    const addProduto = (produto: Produto, quantidadeCarrinho: number, observacoes: string) => {
        setCarrinho((prevCarrinho) => [...prevCarrinho, {produto, quantidadeCarrinho, observacoes}]);
    };    

    const removeProduto = async (id: number) => {
        setCarrinho((prevCarrinho) => prevCarrinho.filter(item => item.produto.id !== id));

        const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrlC = `${apiUrl}/carrinho/${id}`

        try{
            const response = await fetch(apiUrlC, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.ok){
                throw new Error("Erro ao remover o produto do carrinho (na API):")
            }

            console.log("Produto removido do carrinho com sucesso!");

        }catch(error){
            console.error("Erro ao remover produto do carrinho:", error);
        }
    };

    const clearCarrinho = () =>{
        setCarrinho([]);
    }

    const fetchCarrinho = async () => {
        console.log("Fetching carrinho...");
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrlC = `${apiUrl}/carrinho`;

        try {
            const response = await fetch(apiUrlC);
            if (!response.ok) {
                throw new Error("Erro ao recuperar os produtos do carrinho:");
            }
            const data: ProdutoAPI[] = await response.json();
            console.log("Dados recebidos:", data); 

            const formatData: CarrinhoItem[] = data.map((item) =>({
                produto:{
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    imagem: ""
                },
                quantidadeCarrinho: item.quantidadeCarrinho,
                observacoes: item.observacoes || ""
            }));

            setCarrinho(formatData);
        } catch (error) {
            console.error("Erro ao recuperar o carrinho:", error);
        }
    };

    return(
        <CarrinhoContext.Provider value={{carrinho, addProduto, removeProduto, clearCarrinho, fetchCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);

    if(context === undefined){
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }

    return context;
}