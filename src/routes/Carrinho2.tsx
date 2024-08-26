/* eslint-disable react-hooks/exhaustive-deps */
import formatCurrency from "../utils/formatCurrency";
import "../assets/styles/carrinho.scss";
import { FaMotorcycle } from "react-icons/fa";
import { IoReturnDownBack, IoReturnDownForward } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { useCarrinho } from "../contexts/CarrinhoContext";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import DadosPedidos from "../components/DadosPedidos";
import toast from "react-hot-toast";
import ContentLocal from "../components/ContentLocal";
import { motion } from "framer-motion";
import { formatCEP } from "../utils/formatCEP";

const Carrinho2 = () => {
    const { valorTotal, valorTotalFrete, confirmarPedido, clearCarrinho } =
        useCarrinho();

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [, setNome] = useState("");
    const [, setCelular] = useState("");

    const [dadosPedido, setDadosPedido] = useState(false);
    const [confirma, setConfirma] = useState(false);

    useEffect(() => {
        const enderecoJSON = localStorage.getItem("endereco");
        const userJSON = localStorage.getItem("usuario");

        const enderecoPedido = enderecoJSON ? JSON.parse(enderecoJSON) : null;
        const userPedido = userJSON ? JSON.parse(userJSON) : null;

        setConfirma(true);

        if (enderecoJSON) {
            const { cep, logradouro, bairro, numero, complemento } =
                JSON.parse(enderecoJSON);
            setCep(cep || "");
            setLogradouro(logradouro || "");
            setBairro(bairro || "");
            setNumero(numero || "");
            setComplemento(complemento || "");
            setDadosPedido(true);
        }

        if (userJSON) {
            const { nome, celular } = JSON.parse(userJSON);
            setNome(nome || "");
            setCelular(celular || "");
        }

        const pedido = {
            endereco: enderecoPedido,
            usuario: userPedido,
        };
        confirmaPedido();
        confirmarPedido(pedido);
        setDadosPedido(true);
    }, []);

    const fetchCEP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!cep) {
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

    const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCEP(e.target.value);
        setCep(formattedValue);
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

        setConfirma(true);

        const enderecoJSON = localStorage.getItem("endereco");
        const enderecoPedido = enderecoJSON ? JSON.parse(enderecoJSON) : null;

        const userJSON = localStorage.getItem("usuario");
        const userPedido = userJSON ? JSON.parse(userJSON) : null;

        if (!enderecoPedido) {
            console.error("Endereço não encontrado no localStorage");
            return;
        }

        if (!userPedido) {
            console.error("Usuario não encontrado no localStorage");
        }

        const pedido = {
            endereco: enderecoPedido,
            usuario: userPedido,
        };

        confirmaPedido();
        confirmarPedido(pedido);
        setDadosPedido(true);
    };

    const handleConfirma = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setConfirma(true);

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

        const enderecoJSON = localStorage.getItem("endereco");
        const enderecoPedido = enderecoJSON ? JSON.parse(enderecoJSON) : null;

        const userJSON = localStorage.getItem("usuario");
        const userPedido = userJSON ? JSON.parse(userJSON) : null;

        if (!enderecoPedido) {
            console.error("Endereço não encontrado no localStorage");
            return;
        }

        if (!userPedido) {
            console.error("Usuario não encontrado no localStorage");
        }

        const pedido = {
            endereco: enderecoPedido,
            usuario: userPedido,
        };

        confirmaPedido();
        confirmarPedido(pedido);
        setDadosPedido(true);
    };

    const confirmaPedido = () => {
        if (confirma) {
            toast.success("Pedido confirmado com suceso!", {
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

            return;
        }
    };

    const handleFinalPedido = (e: React.MouseEvent<HTMLButtonElement>) => {
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

        if (confirma == false) {
            toast.error("Por favor, confirme o pedido primeiro!", {
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
        setDadosPedido(false);
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            <Helmet>
                <title>Carrinho | JapaCasa! </title>
            </Helmet>

            <div className="container-carrinho">
                <div className="carrinho_title">
                    <h2>
                        Digite o seu <span id="spjapa2"> endereço:</span>
                    </h2>

                    <h3>Confirme o seu endereço para confirmar o pedido</h3>
                </div>

                <div className="form-carrinho">
                    <form action="">
                        <div className="custom-input cep">
                            <label htmlFor="cep">CEP:</label>
                            <input
                                type="text"
                                id="cep"
                                value={cep}
                                onChange={handleCEPChange}
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

                        {!confirma && (
                            <button
                                className="btn-rotas"
                                onClick={handleConfirma}
                            >
                                Confirmar Endereço
                            </button>
                        )}
                    </form>
                </div>

                {dadosPedido && <DadosPedidos />}

                <div className="carrinho_total">{renderTotal()}</div>

                <div className="rotas-carrinho">
                    <a
                        href="/carrinho"
                        className="btn-rotas btn-carrinho-voltar"
                        title="Voltar para o carrinho"
                    >
                        <IoReturnDownBack className="btn-rotas-icon" />
                        Voltar
                    </a>

                    {!dadosPedido ? (
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
        </motion.div>
    );
};

export default Carrinho2;
