
import { useEffect, useState } from "react"


export default function ProductPage() {

    const [funko, setFunkos] = useState([])

    useEffect(() => {


        fetch('http://localhost:3000/api/v1/funkoboolpop/:slug ', {})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setFunkos(data)
                console.log(funkos);

            })
    }, [])


    return (
        <>
            <main>
                <div className="container p-4 ">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                        <div className="col" key={funko.slug}>
                            <div className="card h-100 shadow-lg bg-emphasis">
                                <div className="position-relative">
                                    <img
                                        className="card-img-top"
                                        src={funko.images[0].image}
                                        alt={funko.name}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <h1>{funko.name}</h1>
                            <p>{funko.price}</p>
                            <button
                                class="btn btn-outline-success my-2 my-sm-0"
                                type="submit">
                                Aggiungi al carrello
                            </button>
                            <p>{funko.desctription}</p>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Additional Information
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>{funko.categories}</p>
                                            <p>{funko.licenses}</p>
                                            <p>{funko.attributes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}