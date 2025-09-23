import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Eye, Lock } from "lucide-react"

interface AccessItem {
  id: string
  name: string
  workspace: string
  type: "SAR" | "AUR" | "APP"
  status: "approved" | "pending" | "rejected"
  description?: string
}

interface AccessCardProps {
  item: AccessItem
  onViewDetails?: (id: string) => void
}

export function AccessCard({ item, onViewDetails }: AccessCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SAR":
        return <Eye className="h-4 w-4" />
      case "AUR":
        return <Lock className="h-4 w-4" />
      default:
        return <Lock className="h-4 w-4" />
    }
  }

  return (
    <Card className="card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(item.type)}
            <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
              {item.name}
            </CardTitle>
          </div>
          <StatusBadge 
            variant={
              item.type === "SAR" ? "sar" : 
              item.type === "AUR" ? "aur" : "app"
            }
          >
            {item.type}
          </StatusBadge>
        </div>
        <p className="text-sm text-muted-foreground">
          Workspace: {item.workspace}
        </p>
      </CardHeader>
      {item.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <StatusBadge variant={item.status}>
              {item.status === "approved" ? "Approved" : 
               item.status === "pending" ? "Awaiting RLS" : "Rejected"}
            </StatusBadge>
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(item.id)}
              >
                View details
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}