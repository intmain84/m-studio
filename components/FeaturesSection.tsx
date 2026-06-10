import ContainerLarge from "./common/ContainerLarge";
import PaddingGlobal from "./common/PaddingGlobal";
import SpacerLarge from "./common/SpacerLarge";

const selfRoomFeatures = [
  {
    title: "Absolute\nPrivacy",
    description: "Professional results in total solitude.",
  },
  {
    title: "Instant\nControl",
    description: "You are the photographer. You decide.",
  },
  {
    title: "Instant\nGallery",
    description: "Fast access to high-resolution shots.",
  },
  {
    title: "Mirror\nTech",
    description: "See your reflection, capture perfection.",
  },
];

const mainRoomFeatures = [
  {
    title: "Commercial\nScale",
    description: "Ample space for large-scale productions.",
  },
  {
    title: "Pro\nEquipment",
    description: "Top-tier lighting and technical gear.",
  },
  {
    title: "Creative\nFreedom",
    description: "Flexible setups for complex visions.",
  },
  {
    title: "Expert\nSupport",
    description: "Full assistance for seamless shooting.",
  },
];

function RoomRow({
  label,
  features,
}: {
  label: string;
  features: typeof selfRoomFeatures;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10 md:mb-14">
        <h2 className="text-sm text-white whitespace-nowrap">{label}</h2>
        <div className="flex-1 h-px opacity-30 bg-[radial-gradient(ellipse_at_center,white_0%,transparent_80%)]" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
        {features.map(({ title, description }) => (
          <div key={title} className="flex flex-col gap-6 md:max-w-60">
            <p className="text-xl md:text-[2.5rem] text-white uppercase leading-[1.1]">
              {title}
            </p>
            <p className="text-sm text-foreground-muted leading-[1.1]">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section>
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerLarge>
          <div className="flex flex-col gap-14 md:gap-30">
            <RoomRow label="Self Room" features={selfRoomFeatures} />
            <RoomRow label="Main Room" features={mainRoomFeatures} />
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
