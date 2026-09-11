import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";

export default function AboutStudioSection() {
  return (
    <section>
      <SpacerLarge id="about" />
      <PaddingGlobal>
        <ContainerLarge>
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
            <h2 className="text-2xl md:text-[3.5rem] text-white uppercase leading-[1.1]">
              [About Studio]
            </h2>
            <div className="flex flex-col gap-6 text-sm text-foreground-muted leading-[1.1] md:max-w-153">
              <p>
                We built The M Studio{" "}
                <span className="text-white">
                  to remove the barrier between an idea and great content
                </span>
                . No searching for a space, no renting scattered gear — just
                a studio that&apos;s ready on your terms.
              </p>
              <p>
                <span className="text-white">
                  One studio, three ways to create.
                </span>{" "}
                <span className="text-white">The Self Room</span> puts you
                behind the lens and in front of it — shoot yourself, in total
                privacy. <span className="text-white">The Main Room</span> is
                a full production space for your own crew — Profoto
                lighting, high ceilings, room to work at scale. Even our
                Reception doubles as a third shooting spot. Whether
                it&apos;s a personal moment, a portfolio, or content for a
                brand — The M Studio gives you the space to do it your way.
              </p>
              <p className="mt-8">Create more. Think less.</p>
            </div>
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
