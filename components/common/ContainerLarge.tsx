// Define width classes for different screen sizes. By default, the container will take the full width of its parent.
const widths = {
  mobile: "w-full",
  md: "md:w-[80%]",
  lg: "lg:w-[80%]",
};

export default function ContainerLarge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto ${widths.mobile} ${widths.md} ${widths.lg}`}>
      {children}
    </div>
  );
}
