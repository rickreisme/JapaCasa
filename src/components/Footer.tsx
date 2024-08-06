import "../assets/styles/footer.scss";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container-footer">
                    <div className="logos">
                        <div className="jpc">
                            {currentYear}
                            <div className="jpc-logo">
                                <span>Japa</span>Casa!
                            </div>
                        </div>

                        <a target="_blank" href="https://rickreisme-portfolio.vercel.app">
                            <span className="rickreisme">
                                &lt;rickreisme/&gt;
                            </span>
                        </a>
                    </div>

                    <div className="credits">
                        Desenvolvido por Rick Reis
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
