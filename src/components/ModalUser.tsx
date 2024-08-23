import { useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import "../assets/styles/cardapio.scss";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";

type ModalProps = {
    onClose: () => void;
    modalOpen: boolean;
    onConfirm: (userId: string, nome: string, celular: string) => void;
};

const ModalUser: React.FC<ModalProps> = ({ modalOpen, onClose, onConfirm }) => {
    const [nome, setNome] = useState("");
    const [celular, setCelular] = useState("");

    const handleConfirmUser = () => {
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

        const userId = uuidv4();

        localStorage.setItem(
            "usuario",
            JSON.stringify({ id: userId, nome, celular }),
        );

        onConfirm(userId, nome, celular);

        onClose();
    };

    const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setCelular(formattedValue);
    };

    return (
        <>
            <Modal
                className="modalUser"
                open={modalOpen}
                aria-labelledby="Preenchimento dos dados do usuário"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: {
                            xs: "90%",
                            sm: "80%",
                            md: "65%",
                            lg: "45%",
                            xl: "30%",
                        },
                        maxWidth: "450px",
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
                            <strong>Por favor, preencha os seus dados primeiro:</strong>
                        </h1>
                    </Typography>

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                        required
                        sx={{
                            width: "100%",
                            margin: "10px 0",
                            padding: "2px",

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
                                minHeight: "50px",
                                fontSize: "1.2rem",
                            },
                        }}
                    />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Celular"
                        value={celular}
                        type="tel"
                        onChange={handleCelularChange}
                        required
                        sx={{
                            width: "100%",
                            margin: "10px 0",
                            padding: "2px",

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
                                minHeight: "50px",
                                fontSize: "1.2rem",
                            },
                        }}
                    />

                    <div className="modal-buttons">
                        <button
                            onClick={onClose}
                            className="modal_btn modal_btn-cancelar"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleConfirmUser}
                            className="modal_btn modal_btn-add"
                        >
                            Enviar
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ModalUser;
