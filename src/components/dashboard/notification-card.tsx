import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "approved" | "rejected" | "pending"
  title: string
  description: string
  timestamp: string
}

interface NotificationCardProps {
  notification: Notification
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-status-approved" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-status-rejected" />
      case "pending":
        return <Clock className="h-4 w-4 text-status-pending" />
      default:
        return <Clock className="h-4 w-4 text-status-pending" />
    }
  }

  return (
    <Card className="card-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon(notification.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">
                {notification.title}
              </h4>
              <StatusBadge variant={notification.type}>
                {notification.type === "approved" ? "Approved" : 
                 notification.type === "rejected" ? "Rejected" : "Pending"}
              </StatusBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {notification.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {notification.timestamp}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}