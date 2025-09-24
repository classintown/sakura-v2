import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Smartphone, TrendingUp, Calendar, User, Building, Tag } from "lucide-react"

interface ReportDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: {
    id: string
    name: string
    workspace: string
    app?: string
    type: string
    description: string
    status: string
    iconType: string
  } | null
  onRequestAccess?: () => void
}

const getReportIcon = (iconType: string) => {
  switch (iconType) {
    case "eye":
      return <Eye className="h-6 w-6" />
    case "users":
      return <Users className="h-6 w-6" />
    case "smartphone":
      return <Smartphone className="h-6 w-6" />
    case "trending":
      return <TrendingUp className="h-6 w-6" />
    default:
      return <Eye className="h-6 w-6" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "approved": return "Approved"
    case "pending": return "Awaiting RLS"
    case "request": return "Request access"
    default: return status
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved": return "approved"
    case "pending": return "pending"
    case "request": return "sar"
    default: return "sar"
  }
}

export function ReportDetailsModal({ 
  open, 
  onOpenChange, 
  report, 
  onRequestAccess 
}: ReportDetailsModalProps) {
  if (!report) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-muted">
              {getReportIcon(report.iconType)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold">{report.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge 
                  variant={
                    report.type === "SAR" ? "sar" : 
                    report.type === "AUR" ? "aur" : "app"
                  }
                >
                  {report.type}
                </StatusBadge>
                <StatusBadge variant={getStatusVariant(report.status)}>
                  {getStatusText(report.status)}
                </StatusBadge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{report.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Workspace:</span>
                <span className="text-sm text-muted-foreground">{report.workspace}</span>
              </div>
              
              {report.app && (
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">App:</span>
                  <span className="text-sm text-muted-foreground">{report.app}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Type:</span>
                <Badge variant="outline">{report.type}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated:</span>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Owner:</span>
                <span className="text-sm text-muted-foreground">Marketing Team</span>
              </div>
            </div>
          </div>

          {/* Access Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-2">Access Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Status:</span>
                <StatusBadge variant={getStatusVariant(report.status)}>
                  {getStatusText(report.status)}
                </StatusBadge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Sensitivity:</span>
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Retention Period:</span>
                <span className="text-sm">2 years</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {report.status === "request" && onRequestAccess && (
              <Button onClick={onRequestAccess} className="sakura-gradient text-white">
                Request Access
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
