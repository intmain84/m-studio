import HeroSliderSection from "@/components/sections/HeroSliderSection";
import AboutStudioSection from "@/components/sections/AboutStudioSection";
import RoomSelectorSection from "@/components/sections/RoomSelectorSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FAQSection from "@/components/sections/FAQSection";
// import GallerySection from "@/components/sections/GallerySection";
import SpacesSection from "@/components/sections/SpacesSection";
import ContactsSection from "@/components/sections/ContactsSection";

export default function Home() {
  return (
    <>
      <HeroSliderSection />
      <AboutStudioSection />
      <RoomSelectorSection />
      <FeaturesSection />
      {/* <GallerySection /> */}
      <SpacesSection />
      <FAQSection />
      <ContactsSection />
    </>
  );
}
