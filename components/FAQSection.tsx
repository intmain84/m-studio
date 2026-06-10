"use client";

import { useState } from "react";
import ContainerLarge from "./common/ContainerLarge";
import PaddingGlobal from "./common/PaddingGlobal";
import SpacerLarge from "./common/SpacerLarge";

const faqs = [
  {
    question: "How many photos can I take during a session?",
    answer:
      "You can take as many shots as you like — the camera fires continuously throughout your session. All photos are automatically saved to your personal gallery.",
  },
  {
    question: "Can I bring someone with me?",
    answer:
      "Of course. The studio comfortably fits two to three people, so bring a friend, partner, or family member.",
  },
  {
    question: "How does work self room?",
    answer:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
  },
  {
    question: "How private is the studio?",
    answer:
      "Completely private. There is no staff present during your session — just you, the mirror, and the camera.",
  },
  {
    question: "How will I receive my photos, будут ли исходники?",
    answer:
      "Within 24 hours you'll receive a download link with all your high-resolution originals — no watermarks, ready to print or post.",
  },
  {
    question: "Какого формата/качества будут мои фотографии?",
    answer:
      "Фотографии в формате JPEG с высоким разрешением. Для ретуши или крупной печати исходники можно запросить отдельно.",
  },
];

function Arrow({ open }: { open: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
    >
      <path
        d="M14.7018 6.92875C15.0995 7.31917 15.0993 7.95226 14.7018 8.34282L8.22008 14.7071C7.82235 15.0976 7.17765 15.0976 6.77991 14.7071L0.298149 8.34281C-0.0992836 7.95226 -0.0994857 7.31917 0.298149 6.92875C0.695782 6.53832 1.34056 6.53852 1.73832 6.92875L6.48154 11.586L6.48154 1C6.48154 0.447717 6.93752 -3.52422e-07 7.5 -3.27835e-07C8.06248 -3.03249e-07 8.51846 0.447717 8.51846 1L8.51846 11.586L13.2617 6.92875C13.6594 6.53852 14.3042 6.53832 14.7018 6.92875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerLarge>
          <div className="flex flex-col md:flex-row">
            <h2 className="md:w-1/2 mb-10 md:mb-0 text-[3.5rem] text-white uppercase leading-[1.1]">
              [FAQ]
            </h2>

            <div className="md:w-1/2">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`border border-border hover:border-foreground -mt-px transition-colors duration-300 ${
                      isOpen ? "bg-white text-[#0f0f11]" : "text-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                    >
                      <span className="text-sm md:text-[1.125rem] leading-[1.1]">
                        {faq.question}
                      </span>
                      <Arrow open={isOpen} />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-xs md:text-sm leading-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
