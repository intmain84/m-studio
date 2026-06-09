"use client";

import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { ModalType } from "@/types/modal";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  setModal?: (modal: ModalType) => void;
};

const links = [
  { name: "About bhq", href: "#" },
  { name: "Group Classes", href: "#" },
  { name: "Personal Trainers", href: "#" },
  { name: "Gym Atmosphere", href: "#" },
  { name: "Contacts", href: "#" },
];

export default function Navbar({ setModal }: NavbarProps) {
  const { isVisible, hasScrolled } = useScrollVisibility(); // Show/hide Navbar based on scroll position
  const [isOpen, setIsOpen] = useState(false);

  return (
    // TEMPLATE: К Nav добавить классы пэддинга
    <header
      className={`flex flex-col transition-transform duration-200 ease-in-out fixed top-0 inset-x-0 z-50 h-24 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="relative flex items-center justify-between px-4 md:px-5 lg:px-8 h-full z-50 bg-background">
        <div>
          <button onClick={() => setIsOpen((prev) => !prev)}>O</button>
        </div>
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Logo />
        </Link>

        <div className="flex gap-8">
          <Link href="#" onClick={() => setModal?.("login")}>
            Book a consultation
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </nav>
      {/* DROPDOWN MENU */}
      <div
        className={`fixed left-0 right-0 z-2 pt-14 pb-10 bg-background w-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-24" : "-translate-y-24 pointer-events-none"
        }`}
      >
        <div className="flex px-4 md:px-5 lg:px-8 space-between items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-center py-4 text-lg w-full"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
