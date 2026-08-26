import HeroSliderSection from "@/components/sections/HeroSliderSection";
import RoomSelectorSection from "@/components/sections/RoomSelectorSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FAQSection from "@/components/sections/FAQSection";
// import GallerySection from "@/components/sections/GallerySection";
import SpacesSection from "@/components/sections/SpacesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ContactsSection from "@/components/sections/ContactsSection";

export default function Home() {
  return (
    <>
      <HeroSliderSection />
      <RoomSelectorSection />
      <FeaturesSection />
      {/* <GallerySection /> */}
      <SpacesSection />
      <HowItWorksSection />
      <FAQSection />
      <ContactsSection />
    </>
  );
}
