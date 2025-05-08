
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function ProductPage() {

    const [funko, setFunkos] = useState({
        state: 'loading'
    })

    const { slug } = useParams()
    console.log(slug);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop/${slug}`)
            .then(res => res.json())
            .then(data => {
                setFunkos({
                    state: 'success',
                    result: data
                })
                console.log(data);


            })
            .catch(err => {
                setFunkos({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])


    switch (funko.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{funko.state}</h1>
                    <p>{funko.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <main>
                        <div className="container p-4 ">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                                <div className="col" key={funko.result.slug}>
                                    <div className="card h-100 shadow-lg bg-emphasis">
                                        <div className="position-relative">
                                            <img
                                                className="card-img-top"
                                                src={funko.result.images[0].image}
                                                alt={funko.result.name}
                                                style={{ height: '300px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <h1>{funko.result.name}</h1>
                                    <p>{funko.result.price}</p>
                                    <button
                                        class="btn btn-outline-success my-2 my-sm-0"
                                        type="submit">
                                        Aggiungi al carrello
                                    </button>
                                    <p>{funko.result.desctription}</p>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Additional Information
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <p>{funko.result.category}</p>
                                                    <p>{funko.result.license}</p>
                                                    <p>{funko.result.attributes[0].name}</p>
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
}