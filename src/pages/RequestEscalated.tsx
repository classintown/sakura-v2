import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const RequestEscalated = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Request access (Guided)"
          description="Step by step wizard for beginners via Report Catalogue"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            {/* Escalation Icon */}
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-orange-600 mb-2">Request escalated</h1>
            <p className="text-muted-foreground mb-8">
              Your request could not be completed because no approver was found. The Workspace Owner has been notified.
            </p>

            {/* Current Status Card */}
            <Card className="card-shadow mb-8 text-left">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">!</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Escalated to Workspace Owner</h3>
                    <p className="text-blue-800 text-sm">
                      Your request has been routed to Workspace Owner for review. You'll be contacted if further action is needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What happens next */}
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Escalation sent</h4>
                    <p className="text-sm text-muted-foreground">No approver was detected for your request</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Workspace Owner notified</h4>
                    <p className="text-sm text-muted-foreground">They will review the escalation and determine next steps</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Request abandoned</h4>
                    <p className="text-sm text-muted-foreground">This request will not continue until the Workspace Owner takes action</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Link to="/requests">
                <Button variant="outline">View all requests</Button>
              </Link>
              <Button 
                onClick={() => window.location.reload()} 
                className="sakura-gradient text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New request
              </Button>
              <Link to="/">
                <Button className="sakura-gradient text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to dashboard
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RequestEscalated
