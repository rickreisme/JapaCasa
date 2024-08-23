/* eslint-disable react-hooks/exhaustive-deps */
import formatCurrency from "../utils/formatCurrency";
import "../assets/styles/carrinho.scss";
import { FaMotorcycle } from "react-icons/fa";
import { IoReturnDownBack, IoReturnDownForward } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { useCarrinho } from "../contexts/CarrinhoContext";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DadosPedidos from "../components/DadosPedidos";
import toast from "react-hot-toast";
import ContentLocal from "../components/ContentLocal";

const Carrinho2 = () => {
    const navigate = useNavigate();
    const { valorTotal, valorTotalFrete, confirmarPedido, clearCarrinho } = useCarrinho();

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [nome, setNome] = useState("");
    const [celular, setCelular] = useState("");

    const [dadosEndereco, setDadosEndereco] = useState(false);

    useEffect(() => {
        const enderecoJSON = localStorage.getItem("endereco");
        const userJSON = localStorage.getItem("usuario");

        if (enderecoJSON) {
            const { cep, logradouro, bairro, numero, complemento } =
                JSON.parse(enderecoJSON);
            setCep(cep || "");
            setLogradouro(logradouro || "");
            setBairro(bairro || "");
            setNumero(numero || "");
            setComplemento(complemento || "");
            setDadosEndereco(true);
        }

        if (userJSON) {
            const { nome, celular } = JSON.parse(userJSON);
            setNome(nome || "");
            setCelular(celular || "");
        }
    }, []);

    const fetchCEP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const cepValido = /^[0-9]{5}-?[0-9]{3}$/.test(cep);
        if (!cepValido) {
            toast.error(
                "CEP inválido. Por favor, insira um CEP no formato 00000-000 ou 00000000.",
                {
                    style: {
                        borderBottom: "3px solid #d2b900",
                        padding: "10px 15px",
                        color: "white",
                        background: "#cf0000",
                        fontSize: "1.2rem",
                    },
                    iconTheme: {
                        primary: "#d2b900",
                        secondary: "#0b0b0a",
                    },
                },
            );
            return;
        }

        try {
            const response = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`,
            );
            const data = response.data;

            if (data.localidade != "Ribeirão Preto") {
                toast.error("Entregamos somente em Ribeirão Preto - SP!", {
                    style: {
                        borderBottom: "3px solid #d2b900",
                        padding: "10px 15px",
                        color: "white",
                        background: "#cf0000",
                        fontSize: "1.2rem",
                    },
                    iconTheme: {
                        primary: "#d2b900",
                        secondary: "#0b0b0a",
                    },
                });
                setLogradouro("");
                setBairro("");
                setCep("");
                return;
            }

            if (!data.erro) {
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
            } else {
                toast.error("CEP não encontrado!", {
                    style: {
                        borderBottom: "3px solid #d2b900",
                        padding: "10px 15px",
                        color: "white",
                        background: "#cf0000",
                        fontSize: "1.2rem",
                    },
                    iconTheme: {
                        primary: "#d2b900",
                        secondary: "#0b0b0a",
                    },
                });
            }
        } catch (error) {
            console.error("Erro ao buscaro o CEP:", error);
            toast.error("Erro ao buscar o CEP!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
        }
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!cep || !logradouro || !bairro || !numero) {
            toast.error("Por favor, preencha todos os campos obrigatórios!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
            return;
        }

        localStorage.setItem(
            "endereco",
            JSON.stringify({
                cep,
                logradouro,
                bairro,
                numero,
                complemento,
            }),
        );

        toast.success("Dados salvos com suceso!", {
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

        setDadosEndereco(true);
    };

    const handleConfirmPedido = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const userId = uuidv4()

        localStorage.setItem("usuario", JSON.stringify({ id: userId, nome, celular }));

        const enderecoJSON = localStorage.getItem("endereco");
        const userJSON = localStorage.getItem("usuario");
        const enderecoPedido = enderecoJSON ? JSON.parse(enderecoJSON) : null;
        const userPedido = userJSON ? JSON.parse(userJSON) : null;

        if (!enderecoPedido) {
            console.error("Endereço não encontrado no localStorage");
            return;
        }

        if (!userPedido) {
            console.error("Usuario não encontrado no localStorage");
        }

        if (!nome || !celular) {
            toast.error("Por favor, preencha todos os campos obrigatórios!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
            return;
        }

        if (!cep || !logradouro || !bairro || !numero) {
            toast.error("Por favor, preencha todos os campos obrigatórios!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
            return;
        }

        toast.success("Dados salvos com suceso!", {
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

        const pedido = {
            endereco: enderecoPedido,
            usuario: userPedido,
        };

        confirmarPedido(pedido);
    };

    const handleFinalPedido = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!nome || !celular) {
            toast.error("Por favor, preencha todos os campos obrigatórios!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
            return;
        }

        if (!cep || !logradouro || !bairro || !numero) {
            toast.error("Por favor, preencha todos os campos obrigatórios!", {
                style: {
                    borderBottom: "3px solid #d2b900",
                    padding: "10px 15px",
                    color: "white",
                    background: "#cf0000",
                    fontSize: "1.2rem",
                },
                iconTheme: {
                    primary: "#d2b900",
                    secondary: "#0b0b0a",
                },
            });
            return;
        }

        toast.success("Pedido finalizado com sucesso!", {
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

        clearCarrinho();
        localStorage.removeItem("carrinho");
        setDadosEndereco(false);
        navigate("/cardapio");
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

            <div className="container-carrinho">
                <div className="carrinho_title">
                    <h2>
                        Digite o seu <span id="spjapa2"> endereço:</span>
                    </h2>
                </div>

                <div className="form-carrinho">
                    <form action="">
                        <div className="custom-input cep">
                            <label htmlFor="cep">CEP:</label>
                            <input
                                type="text"
                                id="cep"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                required
                            />
                            <button className="input-icon" onClick={fetchCEP}>
                                <SearchIcon fontSize="medium" />
                            </button>
                        </div>

                        <div className="input-row">
                            <div className="custom-input rua">
                                <label htmlFor="rua">Logradouro:</label>
                                <input
                                    type="text"
                                    id="rua"
                                    value={logradouro}
                                    onChange={(e) =>
                                        setLogradouro(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="custom-input">
                                <label htmlFor="bairro">Bairro:</label>
                                <input
                                    type="text"
                                    id="bairro"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="custom-input num">
                                <label htmlFor="numero">Número:</label>
                                <input
                                    type="text"
                                    id="numero"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-row">
                            <div className="custom-input comp">
                                <label htmlFor="complemento">
                                    Complemento:
                                </label>
                                <input
                                    type="text"
                                    id="complemento"
                                    value={complemento}
                                    onChange={(e) =>
                                        setComplemento(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {dadosEndereco && (
                    <>
                        <div className="carrinho_title">
                            <h2>
                                Preecnha os seus dados de{" "}
                                <span id="spjapa2"> contato:</span>
                            </h2>
                        </div>

                        <div className="form-carrinho">
                            <form action="">
                                <div className="input-row">
                                    <div className="custom-input comp">
                                        <label htmlFor="complemento">
                                            Nome:
                                        </label>
                                        <input
                                            type="text"
                                            id="nome"
                                            value={nome}
                                            onChange={(e) =>
                                                setNome(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="custom-input comp">
                                        <label htmlFor="celular">
                                            Celular:
                                        </label>
                                        <input
                                            type="tel"
                                            id="celular"
                                            value={celular}
                                            onChange={(e) =>
                                                setCelular(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </form>

                            <button
                                onClick={handleConfirmPedido}
                                className="btn-rotas"
                            >
                                Confirmar Pedido
                            </button>
                        </div>
                    </>
                )}

                {dadosEndereco && <DadosPedidos />}

                <div className="carrinho_total">{renderTotal()}</div>

                <div className="rotas-carrinho">
                    <a
                        href="/carrinho"
                        className="btn-rotas btn-carrinho-voltar"
                        title="Voltar para o cardápio"
                    >
                        <IoReturnDownBack className="btn-rotas-icon" />
                        Voltar
                    </a>

                    {!dadosEndereco ? (
                        <button
                            className="btn-rotas btn-carrinho-continuar"
                            title="Continuar para a próxima etapa"
                            onClick={handleSubmit}
                        >
                            <IoReturnDownForward className="btn-rotas-icon" />
                            Continuar
                        </button>
                    ) : (
                        <button
                            className="btn-rotas btn-carrinho-continuar"
                            title="Continuar para a próxima etapa"
                            onClick={handleFinalPedido}
                        >
                            <IoReturnDownForward className="btn-rotas-icon" />
                            Finalizar
                        </button>
                    )}
                </div>

                <ContentLocal />
            </div>
        </>
    );
};

export default Carrinho2;
