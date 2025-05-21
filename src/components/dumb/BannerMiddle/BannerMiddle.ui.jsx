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
                            <div className="row row-cols-1 row-cols-2">
                                <div className="col text-center">
                                    <h1 className={style.banner_title}>{contentLeft}</h1>
                                </div>
                                <div className="col text-center w-25">
                                    <div className={`row row-cols-${images.length} position-relative`}>
                                        {
                                            contentRight.data.results.map((item, i) => (
                                                <>
                                                    <div className={`${style.card_banner} card offset-${i + i} overflow-hidden bg-white rounded rounded-3`}>
                                                        <div className="card-header bg-white">
                                                            <img className={style.banner_img} src={`http://localhost:3000/${item.images[0].image}`} alt='' />
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className='w-100 text-center'>
                                <button onClick={() => navigate(`/search-result?searchOnly=true&promotion=${contentRight.data.results[0].promotions[0].name}`)} className='btn btn-dark'>Shop Now!</button>
                            </div>
                        </div>
                    </section>
                </>
            )
    }
}