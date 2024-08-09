import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./assets/styles/global.scss";
import Home from "./routes/Home.tsx";
import Cardapio from "./routes/Cardapio.tsx";
import Sobre from "./routes/Sobre.tsx";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CarrinhoProvider } from "./contexts/CarrinhoContext.tsx";
import Carrinho from "./routes/Carrinho.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <HelmetProvider>
                <CarrinhoProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route path="/" element={<Home />} />
                                <Route path="cardapio" element={<Cardapio />} />
                                <Route path="sobre" element={<Sobre />} />
                                <Route path="carrinho" element={<Carrinho />} />
                            </Route>
                        </Routes>
                    </Router>
                </CarrinhoProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);