import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/styles/menu.scss";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    useEffect(() => {
        const japa = document.getElementById("japacasa");
        const spjapa = document.getElementById("spjapa");

        const handleMouseOver = () => {
            if (spjapa) {
                spjapa.style.color = "white";
            }
        };

        const handleMouseOut = () => {
            if (spjapa) {
                spjapa.style.color = "red";
            }
        };

        if (japa) {
            japa.addEventListener("mouseover", handleMouseOver);
            japa.addEventListener("mouseout", handleMouseOut);
        }

        return () => {
            if (japa) {
                japa.removeEventListener("mouseover", handleMouseOver);
                japa.removeEventListener("mouseout", handleMouseOut);
            }
        };
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar
                variant="dark"
                expand="lg"
                fixed="top"
                className="menu"
                data-bs-theme="dark"
            >
                <Container>
                    <Navbar.Brand href="/" className="logo">
                        <span id="japacasa">
                            <span id="spjapa" style={{ color: "red" }}>
                                Japa
                            </span>
                            Casa!
                        </span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto mb-2 mb-lg-0 ms-lg-5 menuItems">
                            <Nav.Link href="/" id="/home" aria-current="page">
                                <i className="fa-solid fa-house menu-icons"></i>{" "}
                                Home
                            </Nav.Link>

                            <Nav.Link href="/cardapio" id="carda">
                                <i className="fa-solid fa-utensils menu-icons"></i>{" "}
                                Cardápio
                            </Nav.Link>

                            <Nav.Link href="/sobre" id="sobre">
                                <i className="fa-solid fa-circle-info menu-icons"></i>{" "}
                                Sobre
                            </Nav.Link>

                            <Nav.Link href="#cont_local" id="conta">
                                <i className="fa-solid fa-phone menu-icons"></i>{" "}
                                Contato
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.header>
    );
};

export default Header;
