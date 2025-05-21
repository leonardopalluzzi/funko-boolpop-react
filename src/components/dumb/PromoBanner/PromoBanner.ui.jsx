
import style from './promoBanner.module.css'
import AutoCarouselUi from '../AutoCarouosel.ui'

export default function PromoBannerUi({ products }) {

    const images = products.results.map(item => item.images[0].image)

    return (
        <>
            <section id={style.promo_banner}>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 align-items-center justify-content-center w-100 m-auto">
                        <div className={`${style.info} col col-md-3 text-center`}>
                            <h1>Discover our <strong>{products.results[0].category[0].name}</strong> collection!</h1>
                        </div>
                        <div className={`${style.card_container} col col-md-8 d-flex align-items-center justify-content-end`}>
                            <div className={`${style.card_custom} card bg-transparent`}>
                                <div className="card-header bg-white rounded rounded-5">
                                    <AutoCarouselUi images={images} />
                                </div>
                                <div className={`card-body bg-transparent text-center`}>
                                    <button className='btn btn-light'>Find More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}