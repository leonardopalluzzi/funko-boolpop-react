import style from '../CollectionBannerUi/collectionBanner.module.css'

export default function CollectioPageUi({ pops, setLimit, setPage }) {
    console.log(pops);

    return (
        <>
            <div class="row align-items-md-stretch">
                <div class="col-md-6">
                    <div
                        class="h-100 p-5 text-white bg-primary border rounded-3"
                    >

                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="h-100 p-5 bg-primary border rounded-3"
                    >
                        <div className="col-12 col-7">
                            <div className={`d-flex ${style.card_stack} position-relative`} style={{ gap: 0 }}>
                                {
                                    pops.data.results.map((item, i) => (
                                        <div
                                            onClick={() => navigate(`/${item.slug}`)}
                                            key={i}
                                            style={{
                                                '--i': i,
                                                '--rotate': `${(i - pops.data.results.length / 2) * 4}deg`
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
            </div>

        </>
    )
}