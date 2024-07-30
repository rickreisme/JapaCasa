import { FaPlusCircle, FaShoppingCart } from "react-icons/fa";

type BtnAddCarrinhoProps = {
    onClick: () => void;
};

const BtnAddCarinho: React.FC<BtnAddCarrinhoProps> = ({onClick}) => {
    return (
        <>
            <button
                className="btnAddCarrinho"
                title="Adicionar pedido ao carrinho"
                onClick={onClick}
            >
                <FaPlusCircle className="plusIcon" />
                <FaShoppingCart />
            </button>
        </>
    );
};

export default BtnAddCarinho;