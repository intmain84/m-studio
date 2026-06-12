import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";

const contacts = [
  {
    label: "Phone",
    value: "+971585294559",
    href: "tel:+971585294559",
    orderClass: "md:order-2",
  },
  {
    label: "Email",
    value: "the.m@gmail.com",
    href: "mailto:the.m@gmail.com",
    orderClass: "md:order-3",
  },
  {
    label: "Instagram",
    value: "the.mstudio",
    href: "https://www.instagram.com/the.mstudio",
    orderClass: "md:order-1",
  },
  {
    label: "Address",
    value: "Art of living mall, Al Barsha Second, Al Barsha Dubai",
    href: "https://maps.google.com/?q=Art+of+Living+Mall,+Al+Barsha,+Dubai",
    orderClass: "md:order-4",
  },
];

export default function ContactsSection() {
  return (
    <section>
      <SpacerLarge id="contacts" />
      <PaddingGlobal>
        <ContainerLarge>
          <h2 className="text-2xl md:text-[3.5rem] text-white uppercase leading-[1.1] md:text-center">
            [Contacts]
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-16 md:mt-40 mb-34 md:mt-40">
            {contacts.map(({ label, value, href, orderClass }) => (
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
            Copyright © 2026 The M Studio
          </p>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
