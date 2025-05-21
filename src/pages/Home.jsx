import Jumbo from "../components/smart/Jumbo";
import HomeCarousels from "../components/smart/HomeCarousels";
import PromoBanner from "../components/smart/PromoBanner";

export default function Home() {
  return (
    <>
      <Jumbo />

      <main>
        <PromoBanner />
        <HomeCarousels />

        {/* banner chatbot  */}
        <div className="banner_bot">
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-md-2 aling-items-center justify-content-between">
              <div className="col-12 col-md-4 d-flex flex-column justify-content-center m-auto">
                <div className="w-100">
                  <h4>Do you have some questions?</h4>
                  <h2>ASK TO OUR <strong>AI</strong> ASSISTANT</h2>
                  <p>He can help you choose the right funko and clarify questions on our shop's policies</p>
                </div>
              </div>
              <div className="col-12 col-md-7 d-flex align-items-end justify-content-center">
                <i class="bi bi-robot"></i>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
