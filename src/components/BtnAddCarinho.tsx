import { FaPlusCircle, FaShoppingCart } from "react-icons/fa";

const BtnAddCarinho = () => {
    return (
        <>
            <button
                className="btnAddCarrinho"
                title="Adicionar pedido ao carrinho"
            >
                <FaPlusCircle className="plusIcon" />
                <FaShoppingCart />
            </button>
        </>
    );
};

export default BtnAddCarinho;
