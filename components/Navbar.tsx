"use client";

import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { ModalType } from "@/types/modal";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type NavbarProps = {
  setModal?: (modal: ModalType) => void;
};

const links = [
  { name: "About studio", href: "#", image: "/menu/about.jpg" },
  { name: "Spaces", href: "#", image: "/menu/spaces.jpg" },
  { name: "Privacy", href: "#", image: "/menu/privacy.jpg" },
  { name: "How it works", href: "#", image: "/menu/how.jpg" },
  { name: "Gallery", href: "#", image: "/menu/gallery.jpg" },
  { name: "FAQ", href: "#", image: "/menu/faq.jpg" },
  { name: "Contacts", href: "#", image: "/menu/contacts.jpg" },
];

export default function Navbar({ setModal }: NavbarProps) {
  const { isVisible, hasScrolled } = useScrollVisibility(); // Show/hide Navbar based on scroll position
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    // TEMPLATE: К Nav добавить классы пэддинга
    <header
      className={`flex flex-col transition-transform duration-200 ease-in-out fixed top-0 inset-x-0 z-50 h-15 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="relative flex items-center justify-between px-4 md:px-5 lg:px-8 h-full z-50 bg-background">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-col h-10 w-10 justify-center items-center gap-2 cursor-pointer "
        >
          <span
            className={`block h-0.5 w-6.25 bg-foreground transition-all duration-300 origin-center ${isOpen ? "translate-y-[4.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6.25 bg-foreground transition-all duration-300 origin-center ${isOpen ? "-translate-y-1.25 -rotate-45" : ""}`}
          />
        </button>
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Logo />
        </Link>

        <div className="flex gap-8">
          <a href="#">Gift Certificate</a>
          <Link href="#" onClick={() => setModal?.("book")}>
            Book now
          </Link>
        </div>
      </nav>

      {/* DROPDOWN MENU */}
      <div
        className={`fixed left-0 right-0 grid grid-cols-2 z-2 p-8 pt-20 bg-background h-dvh w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col justify-center px-4 md:px-5 lg:px-8 max-w-md mx-auto"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex py-4 text-lg w-full uppercase gap-6 transition-opacity duration-200 ${
                hoveredIndex !== null && i !== hoveredIndex
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => {
                setHoveredIndex(i);
                setActiveImageIndex(i);
              }}
            >
              <span className="text-[0.75rem] mt-1.5">0{i + 1}</span>
              <span className="relative z-10 text-[2.5rem] leading-none">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="relative overflow-hidden">
          {links.map((link, i) => (
            <Image
              key={link.image}
              src={link.image}
              alt={link.name}
              fill
              className={`object-cover transition-opacity duration-500 ${
                i === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
