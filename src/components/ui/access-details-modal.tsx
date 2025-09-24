import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/ui/status-badge"
import { Calendar, Clock, User, Building, Database, Lock, Shield } from "lucide-react"

interface AccessDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accessItem: any
  type: "ols" | "rls"
}

export function AccessDetailsModal({ open, onOpenChange, accessItem, type }: AccessDetailsModalProps) {
  if (!accessItem) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {type === "ols" ? <Database className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <DialogTitle className="text-xl">{accessItem.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{type === "ols" ? "Object Level Security" : "Row Level Security"} Access</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Workspace:</span>
                  <span className="font-medium">{accessItem.workspace}</span>
                </div>
                {accessItem.app && (
                  <div className="flex items-center gap-2 text-sm">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Application:</span>
                    <span className="font-medium">{accessItem.app}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {type === "ols" && (
                  <div className="flex items-center gap-2 text-sm">
                    <StatusBadge variant={accessItem.type === "SAR" ? "sar" : accessItem.type === "APP" ? "app" : "aur"}>
                      {accessItem.type}
                    </StatusBadge>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <StatusBadge variant={accessItem.status}>
                    {accessItem.status}
                  </StatusBadge>
                </div>
              </div>
            </div>
          </div>

          {accessItem.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{accessItem.description}</p>
              </div>
            </>
          )}

          {/* RLS Specific Details */}
          {type === "rls" && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold mb-3">Security Model Access</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {accessItem.dataset && (
                      <div>
                        <span className="text-xs text-muted-foreground">Dataset</span>
                        <div className="font-medium text-sm">{accessItem.dataset}</div>
                      </div>
                    )}
                    {accessItem.market && (
                      <div>
                        <span className="text-xs text-muted-foreground">Market</span>
                        <div className="font-medium text-sm">{accessItem.market}</div>
                      </div>
                    )}
                    {accessItem.serviceLine && (
                      <div>
                        <span className="text-xs text-muted-foreground">Service Line</span>
                        <div className="font-medium text-sm">{accessItem.serviceLine}</div>
                      </div>
                    )}
                    {accessItem.client && (
                      <div>
                        <span className="text-xs text-muted-foreground">Client</span>
                        <div className="font-medium text-sm">{accessItem.client}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {accessItem.regions && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {accessItem.regions.map((region: string) => (
                      <Badge key={region} variant="secondary">{region}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Approval Information */}
          {accessItem.approvedBy && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold mb-2">Approval Details</h3>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Approved by:</span>
                  <span className="font-medium">{accessItem.approvedBy}</span>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <Separator />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm">
              <Lock className="h-4 w-4 mr-2" />
              Revoke Access
            </Button>
            <Button variant="outline" size="sm">
              Request Extension
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}