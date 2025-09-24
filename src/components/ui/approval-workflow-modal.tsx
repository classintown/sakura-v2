import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, User, ArrowRight } from "lucide-react"

interface ApprovalWorkflowModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: any
}

export function ApprovalWorkflowModal({ open, onOpenChange, request }: ApprovalWorkflowModalProps) {
  if (!request) return null

  const workflowSteps = [
    {
      id: "line-manager",
      title: "Line Manager",
      name: "Sarah Johnson",
      status: request.lineManager?.includes("✓") ? "approved" : request.lineManager?.includes("✗") ? "rejected" : "pending",
      timestamp: "2024-06-18 10:30 AM",
      comment: "Approved. Business justification is valid."
    },
    {
      id: "ols-approver", 
      title: "OLS Approver",
      name: "Mike Chen",
      status: request.olsApprover?.includes("✓") ? "approved" : request.olsApprover?.includes("✗") ? "rejected" : request.olsApprover?.includes("⏳") ? "pending" : "not-required",
      timestamp: request.olsApprover?.includes("✓") ? "2024-06-19 2:15 PM" : undefined,
      comment: request.olsApprover?.includes("✗") ? "Access level too broad for business requirement" : request.olsApprover?.includes("✓") ? "Approved with standard access level" : undefined
    },
    {
      id: "rls-approver",
      title: "RLS Approver", 
      name: "Emily Rodriguez",
      status: request.rlsApprover?.includes("✓") ? "approved" : "not-required",
      timestamp: undefined,
      comment: undefined
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-status-approved" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-status-rejected" />
      case "pending":
        return <Clock className="h-4 w-4 text-status-pending" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "pending":
        return "Pending"
      default:
        return "Not Required"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Approval Workflow</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Request: {request.name} - {request.workspace}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Status */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Current Status</h3>
                <p className="text-sm text-muted-foreground">Request submitted on {request.requestDate}</p>
              </div>
              <Badge variant={request.status === "approved" ? "default" : request.status === "rejected" ? "destructive" : "secondary"}>
                {request.status}
              </Badge>
            </div>
          </div>

          {/* Workflow Steps */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Approval Steps</h3>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(step.status)}
                      {index < workflowSteps.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <span className={`text-xs font-medium ${getStatusColor(step.status)}`}>
                          {getStatusText(step.status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <User className="h-3 w-3" />
                        <span>{step.name}</span>
                      </div>
                      
                      {step.timestamp && (
                        <p className="text-xs text-muted-foreground mb-2">{step.timestamp}</p>
                      )}
                      
                      {step.comment && (
                        <div className="bg-muted/20 rounded p-2 text-xs">
                          <strong>Comment:</strong> {step.comment}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <Separator />
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Withdraw Request
            </Button>
            <Button variant="outline" size="sm">
              Contact Approver
            </Button>
            <Button size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}