export default function Footer() {
    return (
        <footer className="mt-5">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 mb-3 text-center text-md-start">
                        <h5 className="mb-2">Funko Boolpop</h5>
                        <p className="small">
                            Il tuo shop di fiducia per Funko Pop! <br />
                            Scopri le ultime novità, offerte e collezioni esclusive.
                        </p>
                    </div>
                    <div className="col-md-4 mb-3 text-center">
                        <h6 className="mb-2">Contatti</h6>
                        <p className="mb-1 small">Email: info@funkoboolpop.it</p>
                        <p className="mb-1 small">Tel: +39 0123 456789</p>
                        <div>
                            <a href="#" className="me-2 text-light"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="me-2 text-light"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-light"><i className="bi bi-twitter-x"></i></a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 text-center text-md-end">
                        <h6 className="mb-2">Link utili</h6>
                        <ul className="list-unstyled small">
                            <li><a href="/about" className="text-light text-decoration-none">Chi siamo</a></li>
                            <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
                            <li><a href="/contatti" className="text-light text-decoration-none">Contattaci</a></li>
                            <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="border-light" />
                <div className="text-center text-light small">
                    &copy;2025 Funko Boolpop. Tutti i diritti riservati.
                </div>
            </div>
        </footer>
    );
}
