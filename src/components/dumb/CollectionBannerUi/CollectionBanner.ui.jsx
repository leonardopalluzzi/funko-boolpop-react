import style from './collectionBanner.module.css'
import { useNavigate } from 'react-router-dom'

export default function CollectionBannerUi({ product, banner }) {

    const navigate = useNavigate()

    return (
        <>
            <section
                style={{
                    backgroundImage: `url(http://localhost:3000/banner/${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                id={style.collection_banner}>
                <div className={style.overlay}></div>
                <div style={{ position: 'relative', zIndex: 2 }} className="container-fluid p-4">
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="col-12 col-4 my-4">
                            <p className={style.parag}>DISCOVER OUR {product.results[0].license.name.toUpperCase()} COLLECTION</p>
                            <h2 className={style.title}>{product.results[0].license.name}</h2>
                            <button className='btn btn-light'>Show Collection</button>
                        </div>
                        <div className="col-12 col-7">
                            <div className={`d-flex ${style.card_stack} position-relative`} style={{ gap: 0 }}>
                                {
                                    product.results.map((item, i) => (
                                        <div
                                            onClick={() => navigate(`/${item.slug}`)}
                                            key={i}
                                            style={{
                                                '--i': i,
                                                '--rotate': `${(i - product.results.length / 2) * 4}deg`
                                            }}

                                            className={`${style.card_banner} card overflow-hidden bg-white rounded-3`}
                                        >
                                            <div className={`${style.card_header} card-header bg-white border-0 position-relative h-100`}>
                                                <img className={style.banner_img} src={`http://localhost:3000/${item.images[0].image}`} alt='' />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}