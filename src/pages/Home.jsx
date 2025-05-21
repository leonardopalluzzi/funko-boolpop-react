import Jumbo from "../components/smart/Jumbo";
import HomeCarousels from "../components/smart/HomeCarousels";
import PromoBanner from "../components/smart/PromoBanner";

export default function Home() {
  return (
    <>
      <Jumbo />

      <main className="">
        <PromoBanner />
        <HomeCarousels />

      </main>
    </>
  );
}
