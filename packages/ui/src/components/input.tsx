import { Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  "block w-full rounded-md bg-white/5 text-base text-white placeholder:text-gray-500",
  {
    variants: {
      variant: {
        default:
          "outline-white/10 focus:outline-indigo-500 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2",
        primary: "",
        secondary: "",
      },
      scale: {
        default: "px-3 py-1.5 sm:text-sm/6",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      scale: "default",
    },
  }
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  className,
  variant,
  scale,
  ref,
  type,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(inputVariants({ className, variant, scale }))}
      {...props}
    />
  );
};
