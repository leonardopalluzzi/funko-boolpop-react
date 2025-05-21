import style from './bannerMiddle.module.css'
import Loader from '../Loader.ui';
import { useNavigate } from 'react-router-dom';

export default function BannerMiddleUi({ contentLeft, contentRight }) {

    const images = contentRight.data.results.map(item => item.images[0].image)
    const navigate = useNavigate()

    switch (contentRight.state) {
        case 'laoding':
            return (
                <>
                    <Loader />
                </>
            )
        case 'success':
            return (
                <>
                    <section id={style.banner_middle}>
                        <div className="container-fluid">
                            <div className="row row-cols-1 row-cols-md-2 align-items-center justify-content-between">
                                <div className="col-12 col-md-4 text-center">
                                    <h1 className={style.banner_title}>{contentLeft}</h1>
                                </div>
                                <div className={`${style.card_list_banner} col-12 col-md-7 text-center`}>
                                    <div className="position-relative w-50 h-100">
                                        {
                                            contentRight.data.results.map((item, i) => (
                                                <>
                                                    <div className={`${style.card_banner} card offset-${i + i} overflow-hidden bg-white rounded rounded-3`}>
                                                        <div className={`${style.card_header} card-header bg-white border-0 position-relative h-100`}>
                                                            <img className={style.banner_img} src={`http://localhost:3000/${item.images[0].image}`} alt='' />
                                                            <label className={style.promo_label} htmlFor="">{item.promotions[0].name}</label>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-100 text-center my-4'>
                                <button onClick={() => navigate(`/search-result?searchOnly=true&promotion=${contentRight.data.results[0].promotions[0].name}`)} className='btn btn-dark fs-4'>Shop Now!</button>
                            </div>
                        </div>
                    </section>
                </>
            )
    }
}