import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import Accordion from "../ui/Accordion";
import { FAQS } from "@/content/faq";

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
            <Accordion items={FAQS} className="md:w-1/2" />
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
