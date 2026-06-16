import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import Accordion from "../ui/Accordion";

const faqs = [
  {
    title: "How many photos can I take during a session?",
    content:
      "You can take as many shots as you like — the camera fires continuously throughout your session. All photos are automatically saved to your personal gallery.",
  },
  {
    title: "Can I bring someone with me?",
    content:
      "Of course. The studio comfortably fits two to three people, so bring a friend, partner, or family member.",
  },
  {
    title: "How does work self room?",
    content:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
  },
  {
    title: "How private is the studio?",
    content:
      "Completely private. There is no staff present during your session — just you, the mirror, and the camera.",
  },
  {
    title: "How will I receive my photos? Will I get the originals?",
    content:
      "Within 24 hours you'll receive a download link with all your high-resolution originals — no watermarks, ready to print or post.",
  },
  {
    title: "What format and quality will my photos be in?",
    content:
      "Photos are delivered in high-resolution JPEG format. Raw files for retouching or large-format printing can be requested separately.",
  },
];

export default function FAQSection() {
  return (
    <section>
      <SpacerLarge id="faq" />
      <PaddingGlobal>
        <ContainerLarge>
          <div className="flex flex-col md:flex-row">
            <h2 className="md:w-1/2 mb-10 md:mb-0 text-[3.5rem] text-white uppercase leading-[1.1]">
              [FAQ]
            </h2>
            <Accordion items={faqs} className="md:w-1/2" />
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
