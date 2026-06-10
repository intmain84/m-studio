// Define padding classes for different screen sizes
const paddings = {
  mobile: "px-4",
  md: "md:px-8",
  lg: "lg:px-8",
};

export default function PaddingGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${paddings.mobile} ${paddings.md} ${paddings.lg}`}>
      {children}
    </div>
  );
}
