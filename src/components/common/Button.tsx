import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariant = cva(
  "flex items-center justify-center rounded border font-semibold px-4 py-2 text-base hover:scale-105 transition",
  {
    variants: {
      priority: {
        primary: "bg-white text-black",
        secondary: "border border-white text-white",
      },
    },
    defaultVariants: {
      priority: "primary",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

type ButtonProps = {} & ButtonVariantProps & ComponentProps<"button">;

const Button = ({ priority, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariant({ priority })} {...props}>
      {children}
    </button>
  );
};

export default Button;
