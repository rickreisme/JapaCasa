import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { carrinho, isLoading } = useCarrinho();
    console.log(carrinho)

    if (isLoading) {
        return <div>Carregando...</div>; // ou algum spinner de carregamento
    }

    if (carrinho.length === 0) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;