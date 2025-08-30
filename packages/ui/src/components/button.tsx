import { Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center gap-x-1.5 font-semibold shadow-xs cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-white bg-indigo-600 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
        primary: "",
        secondary: "bg-white/10 text-white hover:bg-white/20",
      },
      scale: {
        xl: "rounded-md px-6 py-3 text-xl font-bold",
        lg: "rounded-md px-5 py-2.5 text-lg font-bold",
        md: "rounded-md px-4 py-2 text-md font-bold",
        sm: "rounded-sm px-3 py-1.5 text-sm font-bold",
        xs: "rounded-sm px-2 py-1 text-xs font-thin",
      },
    },
    defaultVariants: {
      variant: "default",
      scale: "md",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({
  className,
  variant,
  scale,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ className, variant, scale }))}
      {...props}
    >
      {props.children}
    </button>
  );
};
