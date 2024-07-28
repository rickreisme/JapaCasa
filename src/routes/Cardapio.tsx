import { Helmet } from "react-helmet-async";
import "../assets/styles/cardapio.scss";
import sushi from "../assets/img/sushi-crop.jpg";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import ContentLocal from "../components/ContentLocal";

type Produto = {
    id: number;
    nome: string;
    tipo: string;
    preco: number;
    quantidade: number;
    quantidadeDtd: number;
    imagem: string;
};

const Cardapio = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Erro ao recuperar os produtos:");
                }

                const data = await response.json();

                setProdutos(data);
            } catch (error) {
                console.error("Erro ao recuperar os serviços:", error);
            }
        };

        fetchProdutos();
    }, [apiUrl]);

    const filtProdutos = produtos.filter(
        (produto) =>
            (!selectedTipo || produto.tipo === selectedTipo) &&
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const renderProdutos = () => {
        if (!filtProdutos || filtProdutos.length === 0) {
            return (
                <div className="no-service">
                    <p>Nenhum produto encontrado...</p>
                </div>
            );
        }

        return filtProdutos.map((produto) => (
            <div
                className="food-card"
                key={produto.id}
                // onClick={}
            >
                <div className="img">
                    <img src={produto.imagem} />
                </div>

                <h3 className="nome">{produto.nome}</h3>

                <h4 className="preco">
                    R${" "}
                    {produto.preco.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </h4>
                <h4 className="qtd">{produto.quantidade}</h4>
                <h4 className="detalhe">{produto.quantidadeDtd}</h4>
            </div>
        ));
    };

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchTerm(event.target.value);
    };

    const handleTipoClick = (tipo: string | null) => {
        startTransition(() => {
            setSelectedTipo(tipo);
        });
    };

    return (
        <>
            <Helmet>
                <title>Cardápio | JapaCasa! </title>
            </Helmet>

            <main>
                <div className="carda_title">
                    <h2>
                        Confira o nosso<span id="spjapa2"> Cardápio</span>
                        <span id="spcasa">!</span>
                    </h2>
                </div>

                <div className="content_bottom">
                    <div className="home_esquerda">
                        <img src={sushi} />
                    </div>
                </div>

                <div className="pesquisa-filtro">
                    <div className="pesquisa">
                        <span>Pesquisar pelo nome:</span>

                        <div className="pesquisa-box">
                            <input
                                type="text"
                                id="input-search"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                placeholder="Digite um termo"
                            />

                            <span id="icon-search">
                                <FaSearch />
                            </span>
                        </div>
                    </div>

                    <div className="filtros">
                        <span>Filtre pelo tipo:</span>

                        <button
                            className="filtro-card"
                            onClick={() => handleTipoClick(null)}
                        >
                            Todos
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "sushi"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("sushi")}
                        >
                            Sushi
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "temaki"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("temaki")}
                        >
                            Temaki
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "niguiri"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("niguiri")}
                        >
                            Niguiri
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "uramaki"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("uramaki")}
                        >
                            Uramaki
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "yakisoba"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("yakisoba")}
                        >
                            Yakisoba
                        </button>

                        <button
                            className={`filtro-card ${
                                selectedTipo === null
                                    ? ""
                                    : selectedTipo === "combo"
                                      ? "selected"
                                      : ""
                            }`}
                            onClick={() => handleTipoClick("combo")}
                        >
                            Combo
                        </button>
                    </div>
                </div>

                <div className="content_home">{renderProdutos()}</div>

                <ContentLocal />
            </main>
        </>
    );
};

export default Cardapio;
