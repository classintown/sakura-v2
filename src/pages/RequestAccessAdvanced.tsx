import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronLeft, ChevronRight, Building2, Database, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"

const RequestAccessAdvanced = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null)
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [selectedAudience, setSelectedAudience] = useState<any>(null)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [accessType, setAccessType] = useState<"workspace" | "app" | "audience" | "report">("workspace")
  const [formData, setFormData] = useState({
    businessJustification: "",
    requestFor: "myself",
    duration: "permanent",
    urgency: "medium"
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showReview, setShowReview] = useState(false)

  const totalSteps = 5 // Added review step
  const progress = isSubmitted ? 100 : (currentStep / totalSteps) * 100

  const stepTitles = [
    "Access scope selection",
    "Request details",
    "RLS",
    "Approver detection",
    "Review & Submit"
  ]

  const workspaces = [
    {
      id: "1",
      name: "Growth Insights Workspace",
      description: "Growth metrics and performance analytics",
      apps: 3,
      reports: 15,
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: "2", 
      name: "Marketing Analytics Workspace",
      description: "Marketing performance and client analytics",
      apps: 5,
      reports: 28,
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: "3",
      name: "Finance Workspace",
      description: "Financial reporting and analysis",
      apps: 2,
      reports: 12,
      icon: <Building2 className="h-5 w-5" />
    }
  ]

  const apps = [
    {
      id: "1",
      name: "Growth Insights App",
      workspace: "Growth Insights Workspace",
      description: "Comprehensive growth analytics and insights",
      audiences: 4,
      icon: <Database className="h-5 w-5" />
    },
    {
      id: "2",
      name: "Marketing Analytics App", 
      workspace: "Marketing Analytics Workspace",
      description: "Marketing performance tracking and optimization",
      audiences: 6,
      icon: <Database className="h-5 w-5" />
    }
  ]

  const audiences = [
    {
      id: "1",
      name: "Client Leads",
      app: "Marketing Analytics App",
      workspace: "Marketing Analytics Workspace",
      description: "Client profitability and resource allocation insights",
      reports: 8,
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "2",
      name: "Growth Insights",
      app: "Growth Insights App", 
      workspace: "Growth Insights Workspace",
      description: "Growth metrics and trend analysis",
      reports: 12,
      icon: <Users className="h-5 w-5" />
    }
  ]

  const reports = [
    {
      id: "1",
      name: "Client P&L",
      audience: "Client Leads",
      app: "Marketing Analytics App",
      workspace: "Marketing Analytics Workspace",
      type: "SAR" as const,
      description: "Profit and loss analysis by client",
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: "2",
      name: "Client Leads Report",
      audience: "Client Leads",
      app: "Marketing Analytics App",
      workspace: "Marketing Analytics Workspace", 
      type: "AUR" as const,
      description: "Lead generation and conversion analytics",
      icon: <Shield className="h-5 w-5" />
    }
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReviewAndFinalize = () => {
    setShowReview(true)
    setCurrentStep(5)
  }

  const handleSubmitRequest = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      setCurrentStep(5)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderAccessScopeSelection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Access scope selection</h2>
        <p className="text-muted-foreground mb-6">
          Select the workspace, app, audience and report you want to request access to
        </p>
      </div>

      {/* Access Type Tabs */}
      <Tabs value={accessType} onValueChange={(value: any) => setAccessType(value)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="app">App</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Available workspaces</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search workspaces" className="pl-10 w-64" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspaces.map((workspace) => (
                <Card 
                  key={workspace.id}
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                    selectedWorkspace?.id === workspace.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedWorkspace(workspace)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {workspace.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{workspace.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{workspace.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{workspace.apps} apps</span>
                          <span>{workspace.reports} reports</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="app" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Available apps</h3>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by workspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All workspaces</SelectItem>
                  <SelectItem value="growth">Growth Insights</SelectItem>
                  <SelectItem value="marketing">Marketing Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map((app) => (
                <Card 
                  key={app.id}
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                    selectedApp?.id === app.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedApp(app)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {app.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{app.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{app.workspace}</p>
                        <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {app.audiences} audiences
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Available audiences</h3>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by workspace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All workspaces</SelectItem>
                    <SelectItem value="growth">Growth Insights</SelectItem>
                    <SelectItem value="marketing">Marketing Analytics</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by app" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All apps</SelectItem>
                    <SelectItem value="growth-app">Growth Insights App</SelectItem>
                    <SelectItem value="marketing-app">Marketing Analytics App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audiences.map((audience) => (
                <Card 
                  key={audience.id}
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                    selectedAudience?.id === audience.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedAudience(audience)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {audience.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{audience.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{audience.app}</p>
                        <p className="text-xs text-muted-foreground mb-2">{audience.workspace}</p>
                        <p className="text-sm text-muted-foreground mb-3">{audience.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {audience.reports} reports
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Available reports</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reports" className="pl-10 w-64" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <Card 
                  key={report.id}
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                    selectedReport?.id === report.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {report.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{report.name}</h4>
                          <StatusBadge variant={report.type === "SAR" ? "sar" : "aur"}>
                            {report.type}
                          </StatusBadge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{report.audience}</p>
                        <p className="text-xs text-muted-foreground mb-2">{report.app}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderAccessScopeSelection()
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Request details</h2>
              <p className="text-muted-foreground">
                Specify who this request is for and why access is needed
              </p>
            </div>

            {/* Selected Item Summary */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Selected for access request:</h3>
                <div className="text-sm">
                  {selectedWorkspace && <p><strong>Workspace:</strong> {selectedWorkspace.name}</p>}
                  {selectedApp && <p><strong>App:</strong> {selectedApp.name}</p>}
                  {selectedAudience && <p><strong>Audience:</strong> {selectedAudience.name}</p>}
                  {selectedReport && <p><strong>Report:</strong> {selectedReport.name}</p>}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Request for</label>
                <Select value={formData.requestFor} onValueChange={(value) => setFormData({...formData, requestFor: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="myself">Me (myself)</SelectItem>
                    <SelectItem value="team">My team</SelectItem>
                    <SelectItem value="other">Other user</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business justification <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className={`w-full p-3 border rounded-lg resize-none ${
                    formErrors.businessJustification ? 'border-red-500' : 'border-border'
                  }`}
                  rows={4}
                  placeholder="Provide business justification for this access request..."
                  value={formData.businessJustification}
                  onChange={(e) => {
                    setFormData({...formData, businessJustification: e.target.value})
                    if (formErrors.businessJustification) {
                      setFormErrors({...formErrors, businessJustification: ""})
                    }
                  }}
                />
                {formErrors.businessJustification && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.businessJustification}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Access duration</label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="temporary">Temporary (90 days)</SelectItem>
                      <SelectItem value="project">Project-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Urgency</label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Row-Level Security</h2>
              <p className="text-muted-foreground">
                Define the row-level security filters that control which data you will see in this report
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Role level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Entity</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entity1">Entity 1</SelectItem>
                    <SelectItem value="entity2">Entity 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Market</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service line</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="client" value="all" className="text-primary" />
                    <span className="text-sm">All clients</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="client" value="specific" className="text-primary" />
                    <span className="text-sm">Specific client</span>
                  </label>
                </div>
                <Select className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select specific client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mercedes">Mercedes</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Approver detection</h2>
              <p className="text-muted-foreground">
                Sakura has automatically identified the required approvers for your request. Review before completing
              </p>
            </div>

            <div className="space-y-4">
              <Card className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-status-approved/10 flex items-center justify-center">
                        <span className="text-status-approved font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Line Manager</h3>
                        <p className="text-sm text-muted-foreground">
                          This approver confirms that the access request is valid for your role and business needs
                        </p>
                        <p className="text-sm font-medium mt-1">Bob Green (bob@example.de)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-status-approved/10 flex items-center justify-center">
                        <span className="text-status-approved font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">OLS Approver</h3>
                        <p className="text-sm text-muted-foreground">
                          This approver manages access to the selected report, app or audience
                        </p>
                        <p className="text-sm font-medium mt-1">Anne Real (anne@example.de)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-status-approved/10 flex items-center justify-center">
                        <span className="text-status-approved font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">RLS Approver</h3>
                        <p className="text-sm text-muted-foreground">
                          This approver will be identified after RLS dimensions are selected
                        </p>
                        <p className="text-sm font-medium mt-1">Jane Brown (jane@example.de)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Approvers will be notified by email and can take action directly in Sakura or via secure email link.
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="sakura-gradient text-white px-8"
                onClick={handleReviewAndFinalize}
              >
                Review and finalize
              </Button>
            </div>
          </div>
        )

      case 5:
        if (isSubmitted) {
          return (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-green-600 mb-2">Request successfully submitted!</h2>
                <p className="text-muted-foreground">
                  Your access request has been routed for approval
                </p>
              </div>

              <Card className="card-shadow mb-6 text-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Pending Line manager approval</h3>
                      <p className="text-blue-800 text-sm">Waiting for Bob Green to review</p>
                    </div>
                    <StatusBadge variant="pending" className="ml-auto">Pending</StatusBadge>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Link to="/requests">
                  <Button variant="outline">View all requests</Button>
                </Link>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="sakura-gradient text-white"
                >
                  + New request
                </Button>
                <Link to="/">
                  <Button className="sakura-gradient text-white">Back to dashboard</Button>
                </Link>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Review & Submit</h2>
              <p className="text-muted-foreground">
                Review your request details before submitting
              </p>
            </div>

            <div className="space-y-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Selected Items:</span>
                    <div className="mt-2 space-y-2">
                      {selectedWorkspace && <p className="font-medium">• Workspace: {selectedWorkspace.name}</p>}
                      {selectedApp && <p className="font-medium">• App: {selectedApp.name}</p>}
                      {selectedAudience && <p className="font-medium">• Audience: {selectedAudience.name}</p>}
                      {selectedReport && <p className="font-medium">• Report: {selectedReport.name}</p>}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Requested for:</span>
                    <p className="font-medium">{formData.requestFor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <p className="font-medium">{formData.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Urgency:</span>
                    <p className="font-medium">{formData.urgency}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Business Justification:</span>
                    <p className="font-medium">{formData.businessJustification}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Approval Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-status-approved">✓</span>
                      <span>Line Manager (Bob Green)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-status-pending">⏳</span>
                      <span>OLS Approver (Anne Real)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-status-pending">⏳</span>
                      <span>RLS Approver (Jane Brown)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="sakura-gradient text-white px-8"
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {}
    
    switch (currentStep) {
      case 1:
        if (!selectedWorkspace && !selectedApp && !selectedAudience && !selectedReport) {
          errors.selection = "Please select at least one item to continue"
        }
        break
      case 2:
        if (!formData.businessJustification.trim()) {
          errors.businessJustification = "Business justification is required"
        }
        break
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedWorkspace || selectedApp || selectedAudience || selectedReport
      case 2:
        return formData.businessJustification.trim().length > 0
      default:
        return true
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Request access (Advanced)"
          description="Direct workspace and object selection"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center gap-4 mb-8">
            {stepTitles.slice(0, isSubmitted ? stepTitles.length : stepTitles.length - 1).map((title, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : index + 1 < currentStep || isSubmitted
                    ? 'bg-status-approved text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {(index + 1 < currentStep || isSubmitted) ? '✓' : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  index + 1 === currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {title}
                </span>
                {index < (isSubmitted ? stepTitles.length - 1 : stepTitles.length - 2) && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="card-shadow">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {!isSubmitted && (
            <div className="flex items-center justify-between mt-8">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Cancel</Button>
              </Link>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={() => {
                    if (validateCurrentStep()) {
                      handleNext()
                    }
                  }}
                  className="sakura-gradient text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : currentStep === 4 ? (
                <Button 
                  onClick={handleReviewAndFinalize}
                  className="sakura-gradient text-white"
                >
                  Review and finalize
                </Button>
              ) : null}
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default RequestAccessAdvanced
