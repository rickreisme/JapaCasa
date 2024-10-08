import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CarrinhoProvider } from "./contexts/CarrinhoContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/styles/global.scss";
import "./assets/styles/media query/max-375px.scss";
import "./assets/styles/media query/max-425px.scss";
import "./assets/styles/media query/max-475px.scss";
import "./assets/styles/media query/max-600px.scss";
import "./assets/styles/media query/max-725px.scss";
import "./assets/styles/media query/max-790px.scss";
import "./assets/styles/media query/max-900px.scss";
import "./assets/styles/media query/max-1000px.scss";
import "./assets/styles/media query/max-1125px.scss";
import AnimatedRoutes from "./components/AnimatedRoutes.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <HelmetProvider>
                <CarrinhoProvider>
                    <Router>
                        <AnimatedRoutes />
                    </Router>
                </CarrinhoProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
