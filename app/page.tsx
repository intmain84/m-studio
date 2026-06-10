import HeroSlider from "@/components/HeroSlider";
import RoomSelector from "@/components/RoomSelector";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <RoomSelector />
      <FeaturesSection />
      <GallerySection />
      <FAQSection />
    </>
  );
}
