type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "light" | "dark";
};

const variantStyles = {
  light: "bg-foreground text-background hover:bg-background hover:text-foreground",
  dark: "bg-background text-foreground hover:bg-foreground hover:text-background",
};

export default function Button({
  variant = "light",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`py-4 px-5 cursor-pointer transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
