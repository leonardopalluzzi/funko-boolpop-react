import style from './collectionPage.module.css'
import CardUi from '../CardUi/Card.ui';

export default function CollectioPageUi({ pops, setLimit, setPage }) {
    console.log(pops);

    return (
        <>
            <section>

                {/* banner  */}
                <div
                    id={style.collection_banner}
                    style={{
                        backgroundImage: `url(http://localhost:3000/banner/${pops.banner.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div className={style.overlay}></div>
                    <div className="container-fluid h-100 d-flex align-items-center  justify-content-center">
                        <h1 className={style.banner_title}>{pops.banner.name}</h1>
                    </div >
                </div >

                {/* lista cards  */}
                <div className={style.section_bg}>
                    <div className={style.cards_container}>
                        {
                            pops.data.results.map(item => (
                                <>
                                    <div className="container-fluid">
                                        <div className={style.card_container}>
                                            <div className='row row-cols-1 row-cols-md-2'>
                                                <div className="col-12 col-md-3">
                                                    <CardUi images={item.images} name={item.name} price={item.price} license={item.license} promotions={item.promotions} slug={item.slug} />

                                                </div>
                                                <div className='col-12 col-md-7'>
                                                    <h3 className={style.item_title}>{item.name.toUpperCase()}</h3>
                                                    <p className='p-5 border border-dark rounded rounded-5 my-4'>{item.description}</p>
                                                    <h5 className='mt-4'>INFORMATIONS</h5>
                                                    <ul className='list-unstyled'>
                                                        <li className='ms-4'><strong>CATEGORY: </strong>{item.category[0].name}</li>
                                                        <li className='ms-4'><strong>ATTRIBUTES: </strong>{item.attributes.map(att => (<>{att.name.toUpperCase()}, </>))}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>


            </section>
        </>
    )
}