type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "light" | "dark";
};

const variantStyles = {
  light: "bg-foreground text-background hover:bg-[#DCDCDC]",
  dark: "bg-background text-foreground hover:bg-[#DCDCDC] hover:text-background",
};

export default function Button({
  variant = "light",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`py-4 px-5 cursor-pointer transition-all duration-300 text-sm md:text-[1rem] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
