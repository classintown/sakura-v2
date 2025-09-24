import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, X } from "lucide-react"

interface EscalationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEscalate: (message: string) => void
}

export function EscalationModal({ open, onOpenChange, onEscalate }: EscalationModalProps) {
  const [escalationMessage, setEscalationMessage] = useState("")

  const handleEscalate = () => {
    onEscalate(escalationMessage)
    setEscalationMessage("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setEscalationMessage("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Escalate to Workspace Owner
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error or need assistance with your request, you can escalate this issue to the Workspace Owner. After you submit escalation, the request progress will be abandoned.
          </p>

          <div className="space-y-2">
            <Label htmlFor="escalation-message">Message (optional)</Label>
            <Textarea
              id="escalation-message"
              placeholder="Provide enough context for approvers (e.g. reporting purpose, client requirements)"
              value={escalationMessage}
              onChange={(e) => setEscalationMessage(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              App Owners might need some additional details to grant access
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleEscalate}
              className="sakura-gradient text-white"
            >
              Submit escalation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
