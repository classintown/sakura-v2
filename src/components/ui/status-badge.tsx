import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        sar: "bg-status-sar/10 text-status-sar border border-status-sar/20",
        aur: "bg-status-aur/10 text-status-aur border border-status-aur/20",
        app: "bg-status-app/10 text-status-app border border-status-app/20",
        approved: "bg-status-approved/10 text-status-approved border border-status-approved/20",
        pending: "bg-status-pending/10 text-status-pending border border-status-pending/20",
        rejected: "bg-status-rejected/10 text-status-rejected border border-status-rejected/20",
      },
    },
    defaultVariants: {
      variant: "sar",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props} />
  )
}

export { StatusBadge, statusBadgeVariants }