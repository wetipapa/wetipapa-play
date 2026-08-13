import Header from "@/components/Header";
import BrandIntro from "@/components/BrandIntro";
import ServiceGrid from "@/components/ServiceGrid";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BrandIntro />
        <ServiceGrid />
        <ConnectSection />
      </main>
      <Footer />
    </>
  );
}
