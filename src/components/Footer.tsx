import '../assets/styles/footer.scss'

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container-footer">
                    <p>
                        {currentYear} <span>Japa</span>Casa! <a target="_blank" href="https://github.com/rickreisme">
                            <span className="rickreisme">&lt;rickreisme/&gt;</span></a>
                    </p>
                    <p>Desenvolvido por Rick Reis</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
