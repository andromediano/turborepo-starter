import { Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const textareaVariants = cva(
  "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6",
  //"block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
  //"block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
  {
    variants: {
      variant: {
        default: "",
        ////"text-gray-900 placeholder:text-gray-400 focus:ring-indigo-200 hover:bg-blue-100 ",
        primary: "",
        secondary: "",
      },
      mass: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      mass: "default",
    },
  }
);

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  ref?: Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  className,
  variant,
  mass,
  ref,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ className, variant, mass }))}
      {...props}
    />
  );
};
