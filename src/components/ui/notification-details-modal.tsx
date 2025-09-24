import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, Bell, ExternalLink } from "lucide-react"

interface NotificationDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notification: any
}

export function NotificationDetailsModal({ open, onOpenChange, notification }: NotificationDetailsModalProps) {
  if (!notification) return null

  const getIcon = () => {
    switch (notification.type) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-status-approved" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-status-rejected" />
      case "pending":
        return <Clock className="h-5 w-5 text-status-pending" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusColor = () => {
    switch (notification.type) {
      case "approved":
        return "text-status-approved"
      case "rejected":
        return "text-status-rejected"
      case "pending":
        return "text-status-pending"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <DialogTitle className="text-lg">{notification.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm">{notification.description}</p>
          </div>

          {notification.details && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-2">Additional Details</h4>
                <div className="space-y-2 text-sm">
                  {notification.details.requestName && (
                    <div>
                      <span className="text-muted-foreground">Request:</span>
                      <span className="ml-2 font-medium">{notification.details.requestName}</span>
                    </div>
                  )}
                  {notification.details.approver && (
                    <div>
                      <span className="text-muted-foreground">Approver:</span>
                      <span className="ml-2 font-medium">{notification.details.approver}</span>
                    </div>
                  )}
                  {notification.details.reason && (
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <span className="ml-2">{notification.details.reason}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />
          
          <div className="flex gap-3">
            <Button size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Request
            </Button>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Dismiss
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}