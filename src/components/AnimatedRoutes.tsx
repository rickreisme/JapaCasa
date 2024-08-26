import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Cardapio from '../routes/Cardapio';
import Home from '../routes/Home';
import App from '../App';
import Sobre from '../routes/Sobre';
import Carrinho from '../routes/Carrinho';
import Carrinho2 from '../routes/Carrinho2';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="cardapio" element={<Cardapio />} />
                    <Route path="sobre" element={<Sobre />} />
                    <Route
                        path="carrinho"
                        element={<ProtectedRoute element={<Carrinho />} />}
                    />
                    <Route
                        path="carrinho/confirmacao"
                        element={<ProtectedRoute element={<Carrinho2 />} />}
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes
