import { FaShoppingCart } from "react-icons/fa";
import "../assets/styles/carrinho.scss";
import { useCarrinho } from "../contexts/CarrinhoContext";


const BtnCarrinho = () => {
    const { carrinho } = useCarrinho();
    const totalItems = carrinho.length

    return (
        <div className="btnCarrinho animacao" title="Abrir carrinho">
            <a href="carrinho" id="cart">
                <FaShoppingCart id="cart-icon" />
                {totalItems > 0 &&(
                    <span className="itemCount">{totalItems}</span>
                )}
            </a>
        </div>
    );
};

export default BtnCarrinho;