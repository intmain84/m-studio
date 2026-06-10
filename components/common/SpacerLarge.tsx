// Define padding classes for different screen sizes
const paddings = {
  mobile: "pt-14",
  md: "md:pt-35",
};

export default function SpacerLarge() {
  return <div className={`w-full ${paddings.mobile} ${paddings.md}`}></div>;
}
