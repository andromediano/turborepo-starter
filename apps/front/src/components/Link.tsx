import { Ref } from "react";
import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

export interface NextLinkProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {
  ref?: Ref<HTMLAnchorElement>;
}

export const NextLink = ({
  className,
  variant,
  scale,
  ref,
  ...props
}: NextLinkProps) => {
  return (
    <Link
      ref={ref}
      className={cn(buttonVariants({ className, variant, scale }))}
      {...props}>
      {props.children}
    </Link>
  );
};
