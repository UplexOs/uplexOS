import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta-700 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand-terracotta-700)] text-[var(--color-white-warm)] hover:bg-[var(--color-brand-terracotta-600)]",
        secondary:
          "bg-transparent border border-[var(--color-brand-terracotta-700)] text-[var(--color-brand-terracotta-700)] hover:bg-[var(--color-brand-terracotta-100)]",
        ghost: "hover:bg-[var(--color-brand-cream-100)] text-[var(--color-brand-terracotta-700)]",
        link: "text-[var(--color-brand-terracotta-700)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 rounded-md",
        sm: "h-10 rounded-md px-4 text-xs",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-12 w-12 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
