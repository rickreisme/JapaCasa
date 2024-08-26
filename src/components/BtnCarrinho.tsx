import { FaShoppingCart } from "react-icons/fa";
import "../assets/styles/carrinho.scss";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { motion } from "framer-motion";

const BtnCarrinho = () => {
    const { carrinho } = useCarrinho();
    const totalItems = carrinho.length;

    return (
        <motion.div
            className="btnCarrinho animacao"
            title="Abrir carrinho"
            initial={{ opacity: 0}}
            animate={{opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            <a href="carrinho" id="cart">
                <FaShoppingCart id="cart-icon" />
                {totalItems > 0 && (
                    <span className="itemCount">{totalItems}</span>
                )}
            </a>
        </motion.div>
    );
};

export default BtnCarrinho;
