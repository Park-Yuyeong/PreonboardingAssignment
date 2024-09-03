import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariant = cva(
  "flex items-center justify-center rounded border font-semibold hover:scale-105 transition",
  {
    variants: {
      priority: {
        primary: "bg-white text-black",
        secondary: "border border-white text-white",
      },
      size: {
        default: "px-4 py-2 text-base",
        half: "w-1/2 py-2 text-base",
        full: "w-full py-2 text-base",
      },
    },
    defaultVariants: {
      priority: "primary",
      size: "default",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

type ButtonProps = {} & ButtonVariantProps & ComponentProps<"button">;

const Button = ({ priority, size, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariant({ priority, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;
