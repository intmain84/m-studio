import Link from "next/link";
import ContactsSection from "@/components/sections/ContactsSection";

export const metadata = {
  title: "Page Not Found — The M Studio",
};

export default function NotFound() {
  return (
    <>
      <section className="mt-24 lg:mt-32 min-h-[60vh] flex flex-col items-center justify-center gap-8 md:gap-10.5 px-4 text-center">
        <svg
          className="size-20 md:size-22.5 shrink-0"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="45" cy="45" r="44" stroke="white" strokeWidth="1.5" />
          <path
            d="M32 32L58 58M58 32L32 58"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col gap-4">
          <p className="text-[1.5rem] md:text-[2.5rem] uppercase leading-[1.1] text-white">
            Error 404
          </p>
          <p className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] text-[#858585]">
            This page doesn&apos;t exist, or it has been moved.
            <br />
            Try heading back to the homepage.
          </p>
        </div>
        <Link
          href="/"
          className="py-4 px-5 transition-all duration-300 text-sm md:text-[1rem] bg-foreground text-background hover:bg-[#DCDCDC]"
        >
          Back to home
        </Link>
      </section>

      <ContactsSection />
    </>
  );
}
