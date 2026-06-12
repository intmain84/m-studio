"use client";

import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import Image from "next/image";

function scrollToAnchor(id: string, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY;
  const diff = targetY - startY;
  let start: number | null = null;

  function step(ts: number) {
    if (!start) start = ts;
    const t = Math.min((ts - start) / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    window.scrollTo(0, startY + diff * ease);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const links = [
  { name: "About studio", href: "/#about", image: "/menu/about.jpg" },
  { name: "Spaces", href: "/#spaces", image: "/menu/spaces.jpg" },
  { name: "How it works", href: "/#howitworks", image: "/menu/how.jpg" },
  { name: "Gallery", href: "/#gallery", image: "/menu/gallery.jpg" },
  { name: "FAQ", href: "/#faq", image: "/menu/faq.jpg" },
  { name: "Contacts", href: "/#contacts", image: "/menu/contacts.jpg" },
];

export default function Navbar() {
  const { setModal } = useModal();
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

  const navVisible = isOpen || isVisible;

  return (
    // TEMPLATE: К Nav добавить классы пэддинга
    <header
      className={`flex flex-col transition-transform duration-200 ease-in-out fixed top-0 inset-x-0 z-100 h-15
        ${navVisible ? "translate-y-0" : "-translate-y-full"}
        ${hasScrolled ? "bg-linear-to-b from-black/70 to-transparent" : "bg-transparent"}`}
    >
      <nav className="relative flex items-center justify-between px-4 md:px-5 lg:px-8 h-full z-10000">
        {/* HAMBURGER MENU */}
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

        {/* ADDITIONAL LINKS */}
        <div className="flex gap-8">
          <a href="#" className="hidden md:block">
            Gift Certificate
          </a>
          <Link
            href="#"
            onClick={() => {
              setModal({ type: "book" });
            }}
          >
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Book now</span>
          </Link>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <div
        className={`fixed left-0 right-0 grid md:grid-cols-2 z-9999 p-8 pt-20 bg-background h-dvh w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col justify-center px-4 md:px-5 lg:px-8 max-w-md md:mx-auto"
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
              onClick={(e) => {
                setIsOpen(false);
                if (link.href.startsWith("/#")) {
                  e.preventDefault();
                  scrollToAnchor(link.href.slice(2));
                }
              }}
              onMouseEnter={() => {
                setHoveredIndex(i);
                setActiveImageIndex(i);
              }}
            >
              <span className="text-[0.75rem] mt-1.5">0{i + 1}</span>
              <span className="text-[1.5rem] md:text-[2.5rem] leading-none relative z-10">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="relative overflow-hidden hidden md:block">
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
