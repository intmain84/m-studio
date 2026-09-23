import ContainerMedium from "../common/ContainerMedium";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import Accordion from "../ui/Accordion";
import { FAQS } from "@/content/faq";

export default function FAQSection() {
  return (
    <section>
      <SpacerLarge id="faq" />
      <PaddingGlobal>
        <ContainerMedium>
          <div className="flex flex-col md:flex-row">
            <h2 className="md:w-2/5 mb-10 md:mb-0 text-[3.5rem] text-white uppercase leading-[1.1]">
              [FAQ]
            </h2>
            <Accordion
              items={FAQS}
              className="md:w-3/5"
              activeBackground="bg-[#07295C]"
              activeTextColor="text-white"
            />
          </div>
        </ContainerMedium>
      </PaddingGlobal>
    </section>
  );
}
