import HeroSlider from "@/components/HeroSlider";
import RoomSelector from "@/components/RoomSelector";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <RoomSelector />
      <FeaturesSection />
      <GallerySection />
      <HowItWorksSection />
      <FAQSection />
    </>
  );
}
