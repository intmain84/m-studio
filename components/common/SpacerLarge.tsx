const paddings = {
  mobile: "pt-14",
  md: "md:pt-35",
};

export default function SpacerLarge(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`w-full ${paddings.mobile} ${paddings.md} ${props.className ?? ""}`} />;
}
