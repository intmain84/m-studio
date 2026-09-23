"use client";

import Link from "next/link";
import ContainerMedium from "../common/ContainerMedium";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import { CONTACTS } from "@/content/contacts";
import { UNDERLINE_HOVER } from "@/lib/utils";

export default function ContactsSection() {
  return (
    <section id="contacts">
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerMedium>
          <h2 className="text-2xl md:text-[3.5rem] text-white uppercase leading-[1.1] md:text-center">
            [Contacts]
          </h2>

          <div className="relative w-full aspect-[3/2] md:aspect-[5/1] overflow-hidden mt-10 md:mt-16">
            <iframe
              src="https://www.google.com/maps?q=Art+of+Living+Mall,+Al+Barsha+2,+Dubai&output=embed"
              className="absolute inset-0 w-full h-full border-0 invert-[.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The M Studio location"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-16 md:mt-24 mb-34">
            {CONTACTS.map(({ label, value, href, orderClass }) => (
              <div key={label} className={orderClass}>
                <p className="text-xs md:text-base text-foreground-muted leading-[1.1] mb-1">
                  {label}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs md:text-base text-white leading-[1.1] whitespace-pre-line ${UNDERLINE_HOVER}`}
                >
                  {value}
                </a>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6 text-xs text-foreground-muted leading-[1.1]">
            <p>Copyright © {new Date().getFullYear()} The M Studio</p>
            <Link href="/terms" className={UNDERLINE_HOVER}>
              Terms &amp; Agreement
            </Link>
          </div>
        </ContainerMedium>
      </PaddingGlobal>
    </section>
  );
}
