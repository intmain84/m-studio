type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "light" | "dark" | "ghost";
  // Looks disabled but stays clickable, so onClick can still show validation errors.
  inactive?: boolean;
};

const variantStyles = {
  light: "bg-foreground text-background hover:bg-[#DCDCDC]",
  dark: "bg-background text-foreground hover:bg-[#DCDCDC] hover:text-background",
  ghost: "bg-transparent text-foreground border border-white/20 hover:bg-foreground/10",
};

const inactiveStyles = "bg-foreground-muted text-background cursor-not-allowed";

export default function Button({
  variant = "light",
  inactive = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`py-4 px-5 transition-all duration-300 text-sm md:text-[1rem] ${inactive ? inactiveStyles : `cursor-pointer ${variantStyles[variant]}`} ${className}`}
      aria-disabled={inactive || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
