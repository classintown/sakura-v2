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
import { Search, ChevronLeft, ChevronRight, Eye, Users, Smartphone } from "lucide-react"
import { Link } from "react-router-dom"

const RequestAccessGuided = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const stepTitles = [
    "Report catalogue",
    "Request details", 
    "RLS",
    "Approver detection",
    "Summarization"
  ]

  const reports = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      type: "SAR" as const,
      description: "This standalone report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      icon: <Eye className="h-5 w-5" />
    },
    {
      id: "2", 
      name: "Client Leads",
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This report is part of the Client Leads Audience in the Marketing Analytics App. It provides insights into client profitability, resource use, and costs to support decisions.",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "3",
      name: "Marketing Analytics app",
      workspace: "Marketing Analytics", 
      type: "APP" as const,
      description: "This app groups multiple audiences of reports for marketing performance, client portfolio, and financial tracking.",
      icon: <Smartphone className="h-5 w-5" />
    }
  ]

  const handleReportSelect = (report: any) => {
    setSelectedReport(report)
  }

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Report catalogue search</h2>
              <p className="text-muted-foreground">
                Search for SAR (Standalone Reports) and AUR (Audience Reports), or Audiences and Apps across all workspaces
              </p>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select defaultValue="all-workspaces">
                <SelectTrigger>
                  <SelectValue placeholder="All workspaces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-workspaces">All workspaces</SelectItem>
                  <SelectItem value="marketing">Marketing Analytics</SelectItem>
                  <SelectItem value="finance">Finance WS</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-types">
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All types</SelectItem>
                  <SelectItem value="sar">SAR Reports</SelectItem>
                  <SelectItem value="aur">AUR Reports</SelectItem>
                  <SelectItem value="app">Applications</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-access">
                <SelectTrigger>
                  <SelectValue placeholder="All access levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-access">All access levels</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Try: financial dashboard, customer metrics, sales performance"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="font-semibold">Search results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <Card 
                    key={report.id} 
                    className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                      selectedReport?.id === report.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => handleReportSelect(report)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            {report.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base font-semibold">
                              {report.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Workspace: {report.workspace}
                            </p>
                            {report.app && (
                              <p className="text-sm text-muted-foreground">
                                App: {report.app}
                              </p>
                            )}
                          </div>
                        </div>
                        <StatusBadge 
                          variant={
                            report.type === "SAR" ? "sar" : 
                            report.type === "AUR" ? "aur" : "app"
                          }
                        >
                          {report.type}
                        </StatusBadge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Request details</h2>
              <p className="text-muted-foreground">
                Configure the details for your access request
              </p>
            </div>

            {selectedReport && (
              <Card className="card-shadow mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      {selectedReport.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedReport.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Workspace: {selectedReport.workspace}
                      </p>
                      <StatusBadge 
                        variant={
                          selectedReport.type === "SAR" ? "sar" : 
                          selectedReport.type === "AUR" ? "aur" : "app"
                        }
                        className="mt-2"
                      >
                        {selectedReport.type}
                      </StatusBadge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Business justification</label>
                <textarea 
                  className="w-full p-3 border border-border rounded-lg resize-none"
                  rows={4}
                  placeholder="Please provide a business justification for this access request..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Request access for</label>
                <Select defaultValue="myself">
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
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Row Level Security (RLS)</h2>
              <p className="text-muted-foreground">
                Configure your data access permissions
              </p>
            </div>

            <Card className="card-shadow mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Existing RLS found</h3>
                    <p className="text-blue-800 text-sm">
                      You already have RLS access for selected Security Model
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow mb-6">
              <CardHeader>
                <CardTitle>Your current applicable RLS settings:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 font-medium">Dataset</th>
                        <th className="pb-3 font-medium">Market</th>
                        <th className="pb-3 font-medium">Service line</th>
                        <th className="pb-3 font-medium">Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 font-medium">Growth Insights</td>
                        <td className="py-3">Germany</td>
                        <td className="py-3">Media</td>
                        <td className="py-3">Mercedes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold">Would you like to reuse your existing RLS?</h3>
              <p className="text-sm text-muted-foreground">
                Choosing "Yes" will skip RLS configuration and use your existing access settings.
              </p>
              
              <div className="flex gap-4">
                <Button className="sakura-gradient text-white">
                  Yes, reuse existing RLS
                </Button>
                <Button variant="outline">
                  No, I'll define new RLS
                </Button>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Approver detection</h2>
              <p className="text-muted-foreground">
                System has automatically detected the required approvers for your request
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
                        <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                      </div>
                    </div>
                    <StatusBadge variant="approved">Auto-detected</StatusBadge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-status-pending/10 flex items-center justify-center">
                        <span className="text-status-pending font-bold">?</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">OLS Approver</h3>
                        <p className="text-sm text-muted-foreground">Marketing Analytics Team</p>
                      </div>
                    </div>
                    <StatusBadge variant="pending">Detecting...</StatusBadge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground font-bold">—</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">RLS Approver</h3>
                        <p className="text-sm text-muted-foreground">Not required (reusing existing)</p>
                      </div>
                    </div>
                    <StatusBadge variant="approved">Skipped</StatusBadge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Request Summary</h2>
              <p className="text-muted-foreground">
                Review your request details before submission
              </p>
            </div>

            <div className="space-y-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Report:</span>
                    <p className="font-medium">{selectedReport?.name || 'No report selected'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Workspace:</span>
                    <p className="font-medium">{selectedReport?.workspace || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <StatusBadge 
                      variant={
                        selectedReport?.type === "SAR" ? "sar" : 
                        selectedReport?.type === "AUR" ? "aur" : "app"
                      }
                      className="ml-2"
                    >
                      {selectedReport?.type || 'N/A'}
                    </StatusBadge>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Requested for:</span>
                    <p className="font-medium">Me (myself)</p>
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
                      <span>Line Manager (Sarah Johnson)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-status-pending">⏳</span>
                      <span>OLS Approver (Marketing Analytics Team)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">—</span>
                      <span>RLS Approver (Skipped - reusing existing)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button size="lg" className="sakura-gradient text-white px-8">
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Request access (Guided)"
          description="Step by step wizard for beginners via Report Catalogue"
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
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : index + 1 < currentStep
                    ? 'bg-status-approved text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  index + 1 === currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
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
          <div className="flex items-center justify-between mt-8">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Cancel</Button>
              </Link>
              
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === 1 && !selectedReport}
                  className="sakura-gradient text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="sakura-gradient text-white">
                  Submit Request
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RequestAccessGuided