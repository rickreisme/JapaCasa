import { useEffect, useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import "../assets/styles/cardapio.scss";
import formatCurrency from "../utils/formatCurrency";

type ProdutoModal = {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    quantidadeCarrinho: number;
    observacoes?: string;
};

type ModalProps = {
    produtoModal: ProdutoModal;
    onClose: () => void;
    modalOpen: boolean;
    onConfirm: (
        id: number,
        nome: string,
        imagem: string,
        quantidadeCarrinho: number,
        preco: number,
        observacoes: string,
    ) => void;
};

const ModalCarrinho: React.FC<ModalProps> = ({
    produtoModal,
    modalOpen,
    onClose,
    onConfirm,
}) => {
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(1);
    const [precoCarrinho, setPrecoCarrinho] = useState(
        produtoModal.preco * produtoModal.quantidadeCarrinho,
    );
    const [observacoes, setObservacoes] = useState("");

    useEffect(() => {
        setPrecoCarrinho(produtoModal.preco * quantidadeCarrinho);
    }, [quantidadeCarrinho, produtoModal.preco]);

    const handleQuantidadeChange = (delta: number) => {
        setQuantidadeCarrinho((prevQuantidade) =>
            Math.max(1, prevQuantidade + delta),
        );
    };

    const handleConfirm = () => {
        console.log("Confirmando adição ao carrinho:", {
            id: produtoModal.id,
            nome: produtoModal.nome,
            imagem: produtoModal.imagem,
            quantidadeCarrinho,
            precoCarrinho,
            observacoes,
        });
        onConfirm(
            produtoModal.id,
            produtoModal.nome,
            produtoModal.imagem,
            quantidadeCarrinho,
            precoCarrinho,
            observacoes,
        );
    };

    return (
        <>
            <Modal
                className="modalCarrinho"
                open={modalOpen}
                disableScrollLock={true}
                aria-labelledby="Confirmação de adição ao carrinho"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: {
                            xs: '90%',
                            sm: '80%',
                            md: '65%',
                            lg: '45%',
                            xl: '30%',
                        },
                        maxWidth: '450px',
                        bgcolor: "#e62825",
                        color: "white",
                        border: "2px solid red",
                        borderRadius: "10px",
                        boxShadow: 5,
                        p: 3,
                    }}
                >
                    <Typography id="modal-modal-title" marginTop="0">
                        <h1>
                            <strong>{produtoModal.nome}</strong>
                        </h1>
                    </Typography>

                    <Typography id="modal-modal-title" marginTop="0">
                        <h3>{formatCurrency(precoCarrinho)}</h3>
                    </Typography>

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Observações"
                        multiline
                        maxRows={6}
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        sx={{
                            width: "100%",
                            margin: "10px 0",
                            padding: "8px",

                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#c9c9c9",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "white",
                                "&.Mui-focused": {
                                    color: "white",
                                },
                            },
                        }}
                        InputProps={{
                            sx: {
                                color: "white",
                                minHeight: "70px",
                                fontSize: "1.2rem",
                            },
                        }}
                    />

                    <div className="quantidade-control">
                        <button onClick={() => handleQuantidadeChange(-1)}>
                            <FaMinusCircle className="icon-quantidade-control" />
                        </button>

                        <span>{quantidadeCarrinho}</span>

                        <button onClick={() => handleQuantidadeChange(1)}>
                            <FaPlusCircle />
                        </button>
                    </div>

                    <div className="modal-buttons">
                        <button
                            onClick={onClose}
                            className="modal_btn modal_btn-cancelar"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleConfirm}
                            className="modal_btn modal_btn-add"
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ModalCarrinho;
