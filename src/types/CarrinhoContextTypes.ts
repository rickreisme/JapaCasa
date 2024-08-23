export type Produto = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
};

export type Endereco = {
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
};

export type Usuario = {
    id: string;
    nome: string;
    celular: string;
};

export type CarrinhoItem = {
    produto: Produto;
    quantidadeCarrinho: number;
    observacoes: string;
};

export type CarrinhoContextType = {
    carrinho: CarrinhoItem[];
    valorTotal: number;
    valorTotalFrete: number;
    isLoading: boolean;
    isError: boolean;
    addProduto: (
        produto: Produto,
        quantidade: number,
        observacoes: string,
    ) => void;
    updateQuantidade: (id: number, delta: number) => void;
    removeProduto: (id: number) => void;
    clearCarrinho: () => void;
    confirmarPedido: (pedido: {
        endereco: Endereco;
        usuario: Usuario;
    }) => void;
};

export interface ProdutoAPI {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    quantidadeCarrinho: number;
    observacoes?: string;
}

export interface CarrinhoAPIResponse {
    carrinho: ProdutoAPI[];
    valorTotal: number;
    valorTotalFrete: number;
}