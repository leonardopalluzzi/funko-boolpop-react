import style from './bannerMiddle.module.css'

export default function BannerMiddleUi({ contentLeft, contentRight }) {
    return (
        <>
            <section id={style.banner_middle}>
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-2">
                        <div className="col text-center">
                            <h1>{contentLeft}</h1>
                        </div>
                        <div className="col text-center">
                            <h1>bannerino</h1>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}