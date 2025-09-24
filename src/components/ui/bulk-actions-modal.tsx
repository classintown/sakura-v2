import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Download, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BulkActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItems: any[]
  actionType: "approve" | "reject" | "export" | "withdraw"
}

export function BulkActionsModal({ open, onOpenChange, selectedItems, actionType }: BulkActionsModalProps) {
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [exportFormat, setExportFormat] = useState("csv")

  const getActionTitle = () => {
    switch (actionType) {
      case "approve":
        return "Bulk Approve Requests"
      case "reject":
        return "Bulk Reject Requests"
      case "export":
        return "Export Selected Items"
      case "withdraw":
        return "Withdraw Selected Requests"
      default:
        return "Bulk Action"
    }
  }

  const getActionIcon = () => {
    switch (actionType) {
      case "approve":
        return <Check className="h-5 w-5 text-status-approved" />
      case "reject":
        return <X className="h-5 w-5 text-status-rejected" />
      case "export":
        return <Download className="h-5 w-5 text-primary" />
      case "withdraw":
        return <Clock className="h-5 w-5 text-status-pending" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const handleAction = () => {
    // Simulate action
    console.log(`Performing ${actionType} on:`, selectedItems)
    if (comment) console.log("Comment:", comment)
    if (actionType === "export") console.log("Export format:", exportFormat)
    
    // Show success toast
    const actionMessages = {
      approve: `Successfully approved ${selectedItems.length} request${selectedItems.length !== 1 ? 's' : ''}`,
      reject: `Successfully rejected ${selectedItems.length} request${selectedItems.length !== 1 ? 's' : ''}`,
      export: `Successfully exported ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''} as ${exportFormat.toUpperCase()}`,
      withdraw: `Successfully withdrew ${selectedItems.length} request${selectedItems.length !== 1 ? 's' : ''}`
    }
    
    toast({
      title: "Action completed",
      description: actionMessages[actionType],
    })
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getActionIcon()}
            <div>
              <DialogTitle className="text-xl">{getActionTitle()}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Items Preview */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Selected Items</h3>
            <div className="max-h-48 overflow-y-auto border rounded-lg">
              <div className="space-y-1 p-3">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground ml-2">• {item.workspace}</span>
                    </div>
                    {item.status && (
                      <Badge variant={item.status === "approved" ? "default" : item.status === "rejected" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          {actionType === "export" && (
            <>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="export-format">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                      <SelectItem value="json">JSON (.json)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {/* Comment for Approve/Reject Actions */}
          {(actionType === "approve" || actionType === "reject") && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="comment">
                  Comment {actionType === "reject" ? "(Required)" : "(Optional)"}
                </Label>
                <Textarea
                  id="comment"
                  placeholder={actionType === "reject" ? "Please provide a reason for rejection..." : "Add a comment..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </>
          )}

          {/* Warning for destructive actions */}
          {(actionType === "reject" || actionType === "withdraw") && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive">
                    {actionType === "reject" ? "Reject Requests" : "Withdraw Requests"}
                  </h4>
                  <p className="text-sm text-destructive/80 mt-1">
                    {actionType === "reject" 
                      ? "This action will reject the selected requests and notify the requesters."
                      : "This action will withdraw the selected requests and stop the approval process."
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <Separator />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAction}
              variant={actionType === "reject" || actionType === "withdraw" ? "destructive" : "default"}
              disabled={actionType === "reject" && !comment.trim()}
            >
              {actionType === "approve" && "Approve Selected"}
              {actionType === "reject" && "Reject Selected"}
              {actionType === "export" && "Export"}
              {actionType === "withdraw" && "Withdraw Selected"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}