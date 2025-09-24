import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { AlertCircle } from "lucide-react"

interface MultipleAppsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: {
    name: string
    workspace: string
    type: string
  }
  onConfirm: (selection: { app: string; audience: string }) => void
}

export function MultipleAppsModal({ open, onOpenChange, report, onConfirm }: MultipleAppsModalProps) {
  const [selectedApp, setSelectedApp] = useState("")
  const [selectedAudience, setSelectedAudience] = useState("")

  const handleConfirm = () => {
    if (selectedApp && selectedAudience) {
      onConfirm({ app: selectedApp, audience: selectedAudience })
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setSelectedApp("")
    setSelectedAudience("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Multiple apps detected
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            This report is available in more than one app. Please select the app and audience combination 
            that matches your access requirements.
          </p>

          {/* Report Info */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">Workspace: {report.workspace}</p>
                </div>
                <StatusBadge variant={report.type === "SAR" ? "sar" : report.type === "AUR" ? "aur" : "app"}>
                  {report.type}
                </StatusBadge>
              </div>
            </CardContent>
          </Card>

          {/* App Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">App</label>
              <Select value={selectedApp} onValueChange={setSelectedApp}>
                <SelectTrigger>
                  <SelectValue placeholder="Select app" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth-insights-app">Growth Insights App</SelectItem>
                  <SelectItem value="marketing-analytics-app">Marketing Analytics App</SelectItem>
                  <SelectItem value="client-insights-app">Client Insights App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Audience</label>
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client-leads">Client Leads</SelectItem>
                  <SelectItem value="growth-insights">Growth Insights</SelectItem>
                  <SelectItem value="dccs">DCCs</SelectItem>
                  <SelectItem value="cams">CAMs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Your selection determines which object-level approver will review your request</p>
                <p className="text-blue-800">
                  Different apps and audiences may have different approval workflows and access permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedApp || !selectedAudience}
              className="sakura-gradient text-white"
            >
              Confirm selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
