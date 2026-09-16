"use client";

import { useState } from "react";

const CONTACT_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/971557070329",
    icon: (
      <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9957 0C6.72641 0 0 6.7283 0 14.9999C0 18.2803 1.0579 21.3225 2.85625 23.7918L0.987244 29.3649L6.75278 27.5222C9.12412 29.0919 11.954 30 15.0043 30C23.2736 30 30 23.2715 30 15.0001C30 6.72856 23.2736 0.000247955 15.0043 0.000247955L14.9957 0ZM10.808 7.61927C10.5172 6.92267 10.2967 6.89629 9.85611 6.87838C9.70608 6.86967 9.53888 6.86096 9.35352 6.86096C8.78028 6.86096 8.18092 7.02845 7.8194 7.39878C7.37877 7.84849 6.28551 8.89774 6.28551 11.0495C6.28551 13.2013 7.85473 15.2823 8.06622 15.5735C8.28666 15.8642 11.1255 20.3439 15.5333 22.1697C18.9802 23.5982 20.0031 23.4658 20.7875 23.2983C21.9335 23.0514 23.3706 22.2045 23.7321 21.1819C24.0937 20.1588 24.0936 19.2857 23.9877 19.1006C23.8819 18.9154 23.5908 18.8099 23.1502 18.5891C22.7095 18.3686 20.5671 17.3104 20.1616 17.1693C19.7647 17.0195 19.3858 17.0725 19.0862 17.4958C18.663 18.0866 18.2488 18.6864 17.9136 19.0478C17.6491 19.33 17.217 19.3654 16.8557 19.2153C16.3708 19.0127 15.0133 18.5361 13.3381 17.0459C12.0421 15.8908 11.1606 14.4536 10.9051 14.0215C10.6493 13.5808 10.8787 13.3247 11.0812 13.0868C11.3016 12.8133 11.5131 12.6194 11.7336 12.3635C11.954 12.108 12.0774 11.9756 12.2185 11.6757C12.3685 11.3847 12.2625 11.0848 12.1568 10.8643C12.051 10.6438 11.1695 8.49207 10.808 7.61927Z"
          fill="#072657"
        />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/TheMStudio2026",
    icon: (
      <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25.8871 4.56812C25.8871 4.56812 28.3154 3.62124 28.113 5.9208C28.0456 6.86769 27.4385 10.1817 26.9663 13.7664L25.3474 24.3849C25.3474 24.3849 25.2126 25.9405 23.9984 26.2111C22.7842 26.4816 20.963 25.2642 20.6257 24.9936C20.3559 24.7907 15.5667 21.7472 13.8804 20.2592C13.4082 19.8534 12.8686 19.0418 13.9478 18.0949L21.0304 11.3316C21.8399 10.5199 22.6493 8.62619 19.2766 10.9257L9.83319 17.351C9.83319 17.351 8.75394 18.0273 6.73037 17.4186L2.34589 16.0659C2.34589 16.0659 0.727006 15.0514 3.49259 14.0369C10.2379 10.8581 18.5347 7.61162 25.8871 4.56812Z"
          fill="#072657"
        />
      </svg>
    ),
  },
];

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Button size (3.875rem) + gap between stacked buttons (0.5rem) — how far each one travels to its resting spot
  const STEP_REM = 4.375;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Sized exactly like the main button — the extra buttons are absolutely
          positioned inside it so their closed state sits perfectly behind/under it */}
      <div className="relative size-[3.875rem]">
        {CONTACT_LINKS.map((link, index) => {
          const offsetRem = STEP_REM * (index + 1);
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              aria-hidden={!isOpen}
              tabIndex={isOpen ? 0 : -1}
              style={{
                // Closed: collapsed to the main button's spot and shrunk, so it visually hides under it.
                // Open: slides up to its resting spot and pops back to full size.
                transform: isOpen ? `translateY(-${offsetRem}rem) scale(1)` : "translateY(0) scale(0.4)",
                // Staggers each button in turn: bottom-most (index 0) leads on open, top-most leads on close
                transitionDelay: `${(isOpen ? index : CONTACT_LINKS.length - 1 - index) * 80}ms`,
              }}
              className={`absolute inset-0 z-0 flex items-center justify-center rounded-full bg-white transition-all duration-300 ease-out ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {link.icon}
            </a>
          );
        })}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
          className={`relative z-10 flex items-center justify-center size-full rounded-full border border-white/20 transition-colors duration-300 cursor-pointer ${
            isOpen ? "bg-[#072657]" : "bg-white"
          }`}
        >
          {isOpen ? (
            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5.06066" y1="4" x2="26" y2="24.9393" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line
                x1="0.75"
                y1="-0.75"
                x2="30.3627"
                y2="-0.75"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 26 4)"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 29C22.7319 29 29 22.7319 29 15C29 7.26801 22.7319 1 15 1C7.26801 1 1 7.26801 1 15C1 17.2396 1.52587 19.3562 2.46084 21.2335C2.70932 21.7323 2.79201 22.3025 2.64797 22.8408L1.81411 25.9574C1.45213 27.3102 2.68981 28.5478 4.04269 28.1859L7.15915 27.3521C7.6975 27.208 8.26769 27.2907 8.76654 27.5391C10.6437 28.4742 12.7604 29 15 29ZM9.4 16.75C8.82011 16.75 8.35 17.2201 8.35 17.8C8.35 18.3799 8.82011 18.85 9.4 18.85H17.1C17.6799 18.85 18.15 18.3799 18.15 17.8C18.15 17.2201 17.6799 16.75 17.1 16.75H9.4ZM8.35 12.9C8.35 12.3201 8.82011 11.85 9.4 11.85H20.6C21.1799 11.85 21.65 12.3201 21.65 12.9C21.65 13.4799 21.1799 13.95 20.6 13.95H9.4C8.82011 13.95 8.35 13.4799 8.35 12.9Z"
                fill="#072657"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingButton;
