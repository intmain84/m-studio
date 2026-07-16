"use client";

import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import { CONTACTS } from "@/content/contacts";

export default function ContactsSection() {
  return (
    <section>
      <SpacerLarge id="contacts" />
      <PaddingGlobal>
        <ContainerLarge>
          <h2 className="text-2xl md:text-[3.5rem] text-white uppercase leading-[1.1] md:text-center">
            [Contacts]
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-16 md:mt-40 mb-34">
            {CONTACTS.map(({ label, value, href, orderClass }) => (
              <div key={label} className={orderClass}>
                <p className="text-xs md:text-base text-foreground-muted leading-[1.1] mb-1">
                  {label}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-base text-white leading-[1.1]"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>

          <p className="mb-4 md:mb-6 text-xs text-foreground-muted leading-[1.1] text-center">
            Copyright © {new Date().getFullYear()} The M Studio
          </p>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
