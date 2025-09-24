import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface RequestDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: {
    id: string
    name: string
    workspace: string
    requestedFor: string
    lineManager: string
    olsApprover: string
    rlsApprover: string
    requestDate: string
    updateDate: string
    type: "SAR" | "APP" | "AUR"
    status: "pending" | "approved" | "rejected"
    description?: string
    businessJustification?: string
    duration?: string
    urgency?: "low" | "medium" | "high"
  }
}

export function RequestDetailsModal({ open, onOpenChange, request }: RequestDetailsModalProps) {
  const getApprovalIcon = (approver: string) => {
    if (approver.includes("✓")) return <CheckCircle className="h-4 w-4 text-status-approved" />
    if (approver.includes("✗")) return <XCircle className="h-4 w-4 text-status-rejected" />
    return <Clock className="h-4 w-4 text-status-pending" />
  }

  const getApprovalStatus = (approver: string) => {
    if (approver.includes("✓")) return "approved"
    if (approver.includes("✗")) return "rejected"
    return "pending"
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-status-rejected/10 text-status-rejected"
      case "medium": return "bg-status-pending/10 text-status-pending"
      case "low": return "bg-status-approved/10 text-status-approved"
      default: return "bg-muted/50 text-muted-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">{request.name}</DialogTitle>
            <StatusBadge variant={request.type === "SAR" ? "sar" : request.type === "APP" ? "app" : "aur"}>
              {request.type}
            </StatusBadge>
          </div>
          <DialogDescription>
            Request details and approval status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Request Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Requested for:</span>
                  <span className="font-medium">{request.requestedFor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Workspace:</span>
                  <span className="font-medium">{request.workspace}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Requested:</span>
                  <span className="font-medium">{request.requestDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last updated:</span>
                  <span className="font-medium">{request.updateDate}</span>
                </div>
              </div>

              {request.urgency && (
                <div className="mt-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Urgency:</span>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Approval Status */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Approval Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getApprovalIcon(request.lineManager)}
                    <span className="font-medium">Line Manager</span>
                  </div>
                  <StatusBadge variant={getApprovalStatus(request.lineManager)}>
                    {request.lineManager.replace("✓ ", "").replace("✗ ", "")}
                  </StatusBadge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getApprovalIcon(request.olsApprover)}
                    <span className="font-medium">OLS Approver</span>
                  </div>
                  <StatusBadge variant={getApprovalStatus(request.olsApprover)}>
                    {request.olsApprover.replace("✓ ", "").replace("✗ ", "")}
                  </StatusBadge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getApprovalIcon(request.rlsApprover)}
                    <span className="font-medium">RLS Approver</span>
                  </div>
                  <StatusBadge variant={getApprovalStatus(request.rlsApprover)}>
                    {request.rlsApprover.replace("— ", "Not Required")}
                  </StatusBadge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Justification */}
          {request.businessJustification && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Business Justification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {request.businessJustification}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {request.status === "pending" && (
              <Button variant="destructive">
                Cancel Request
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}