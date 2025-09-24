import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { MultipleAppsModal } from "@/components/ui/multiple-apps-modal"
import { EscalationModal } from "@/components/ui/escalation-modal"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, Eye, Users, Smartphone, TrendingUp } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const RequestAccessGuided = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedReport, setSelectedReport] = useState<any>(location.state?.selectedReport || null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessJustification: "",
    requestFor: "myself",
    reuseExistingRLS: true,
    consentToMonitoring: false,
    dataAwareness: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showMultipleAppsModal, setShowMultipleAppsModal] = useState(false)
  const [multipleAppsReport, setMultipleAppsReport] = useState<any>(null)
  const [showAdvancedRLS, setShowAdvancedRLS] = useState(false)
  const [rlsConfig, setRlsConfig] = useState({
    roleLevel: "",
    entity: "",
    market: "",
    cluster: "",
    region: "",
    serviceLine: "",
    clientType: "all",
    specificClient: ""
  })
  const [showEscalationModal, setShowEscalationModal] = useState(false)
  const [isEscalated, setIsEscalated] = useState(false)
  const [isDetectingApprovers, setIsDetectingApprovers] = useState(false)
  const [isNextLoading, setIsNextLoading] = useState(false)
  const [isYesLoading, setIsYesLoading] = useState(false)
  const [rlsApproverFound, setRlsApproverFound] = useState<boolean | null>(null)

  const totalSteps = 6 // Added success step
  const progress = isSubmitted ? 100 : (currentStep / totalSteps) * 100

  const stepTitles = [
    "Report catalogue",
    "Request details", 
    "RLS",
    "Approver detection",
    "Summarization",
    "Success"
  ]

  const reports = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      type: "SAR" as const,
      description: "This standalone report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      iconType: "eye" as const
    },
    {
      id: "2", 
      name: "Client Leads",
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This report is part of the Client Leads Audience in the Marketing Analytics App. It provides insights into client profitability, resource use, and costs to support decisions.",
      iconType: "users" as const
    },
    {
      id: "3",
      name: "Marketing Analytics app",
      workspace: "Marketing Analytics", 
      type: "APP" as const,
      description: "This app groups multiple audiences of reports for marketing performance, client portfolio, and financial tracking.",
      iconType: "smartphone" as const
    }
  ]

  const handleReportSelect = (report: any) => {
    // Simulate multiple apps detection for Client P&L 1
    if (report.id === "4" || report.name === "Client P&L 1") {
      setMultipleAppsReport(report)
      setShowMultipleAppsModal(true)
    } else {
      setSelectedReport(report)
    }
  }

  const handleMultipleAppsConfirm = (selection: { app: string; audience: string }) => {
    const updatedReport = {
      ...multipleAppsReport,
      selectedApp: selection.app,
      selectedAudience: selection.audience
    }
    setSelectedReport(updatedReport)
    setMultipleAppsReport(null)
  }

  const handleEscalate = (message: string) => {
    setIsEscalated(true)
    // In a real app, this would send the escalation to the backend
    console.log('Escalation sent:', message)
    // Navigate to the escalated page
    navigate('/request-escalated')
  }

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {}
    
    switch (currentStep) {
      case 1:
        if (!selectedReport) {
          errors.selectedReport = "Please select a report to continue"
        }
        break
      case 2:
        if (!formData.businessJustification.trim()) {
          errors.businessJustification = "Business justification is required"
        }
        if (!formData.consentToMonitoring) {
          errors.consentToMonitoring = "You must consent to usage monitoring"
        }
        if (!formData.dataAwareness) {
          errors.dataAwareness = "You must acknowledge data sensitivity awareness"
        }
        break
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setIsNextLoading(true)
      
      // Simulate approver detection when moving to step 4
      if (currentStep === 3) {
        setIsDetectingApprovers(true)
        // Randomly determine if RLS approver is found (70% chance of success)
        const isRlsApproverFound = Math.random() > 0.3
        setRlsApproverFound(isRlsApproverFound)
        
        setTimeout(() => {
          setIsDetectingApprovers(false)
          setIsNextLoading(false)
          setCurrentStep(currentStep + 1)
        }, 2000)
      } else {
        // Add a small delay for better UX
        setTimeout(() => {
          setIsNextLoading(false)
          setCurrentStep(currentStep + 1)
        }, 800)
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      setCurrentStep(6) // Go to success step
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      // Reset RLS approver state when going back to step 3
      if (currentStep === 4) {
        setRlsApproverFound(null)
      }
      setCurrentStep(currentStep - 1)
    }
  }

  const handleYesReuseRLS = () => {
    setIsYesLoading(true)
    setTimeout(() => {
      setFormData({...formData, reuseExistingRLS: true})
      setShowAdvancedRLS(false)
      setIsYesLoading(false)
    }, 400)
  }

  const handleAdjustDimensionFilters = () => {
    setRlsApproverFound(null)
    setCurrentStep(3)
  }

  const getReportIcon = (iconType: string) => {
    switch (iconType) {
      case "eye":
        return <Eye className="h-5 w-5" />
      case "users":
        return <Users className="h-5 w-5" />
      case "smartphone":
        return <Smartphone className="h-5 w-5" />
      case "trending":
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Eye className="h-5 w-5" />
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
                            {getReportIcon(report.iconType)}
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
                      {getReportIcon(selectedReport.iconType)}
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
                <label className="block text-sm font-medium mb-2">
                  Who is this request for? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="requestFor" 
                      value="myself"
                      checked={formData.requestFor === "myself"}
                      onChange={(e) => setFormData({...formData, requestFor: e.target.value})}
                      className="text-primary"
                    />
                    <span>Me (myself)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="requestFor" 
                      value="other"
                      checked={formData.requestFor === "other"}
                      onChange={(e) => setFormData({...formData, requestFor: e.target.value})}
                      className="text-primary"
                    />
                    <span>Another user</span>
                  </label>
                </div>
                {formData.requestFor === "other" && (
                  <div className="mt-3">
                    <Input placeholder="Search by name or email" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Select yourself or another dentsu user
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Justification <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className={`w-full p-3 border rounded-lg resize-none ${
                    formErrors.businessJustification ? 'border-red-500' : 'border-border'
                  }`}
                  rows={4}
                  placeholder="Provide enough context for approvers (e.g. reporting purpose, client requirements)"
                  value={formData.businessJustification}
                  onChange={(e) => setFormData({...formData, businessJustification: e.target.value})}
                />
                {formErrors.businessJustification && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.businessJustification}</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Additional details required by App owner</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What specific tasks or projects will you be using this App for?
                  </label>
                  <textarea 
                    className="w-full p-3 border border-border rounded-lg resize-none"
                    rows={3}
                    placeholder="Provide enough context for approvers (e.g. reporting purpose, client requirements)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ℹ️ App Owners might need some additional details to grant access
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox"
                    id="consentMonitoring"
                    checked={formData.consentToMonitoring}
                    onChange={(e) => setFormData({...formData, consentToMonitoring: e.target.checked})}
                    className={`mt-1 ${formErrors.consentToMonitoring ? 'border-red-500' : ''}`}
                  />
                  <label htmlFor="consentMonitoring" className="text-sm">
                    Do you consent to having your usage of this App monitored for compliance and improvement purposes?
                  </label>
                </div>
                {formErrors.consentToMonitoring && (
                  <p className="text-red-500 text-sm">{formErrors.consentToMonitoring}</p>
                )}

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox"
                    id="dataAwareness"
                    checked={formData.dataAwareness}
                    onChange={(e) => setFormData({...formData, dataAwareness: e.target.checked})}
                    className={`mt-1 ${formErrors.dataAwareness ? 'border-red-500' : ''}`}
                  />
                  <label htmlFor="dataAwareness" className="text-sm">
                    I'm aware of the sensitivity of the data in this App and the security measures required.
                  </label>
                </div>
                {formErrors.dataAwareness && (
                  <p className="text-red-500 text-sm">{formErrors.dataAwareness}</p>
                )}
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
                <Button 
                  className="sakura-gradient text-white"
                  onClick={handleYesReuseRLS}
                  disabled={isYesLoading}
                >
                  {isYesLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Yes, reuse existing RLS'
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFormData({...formData, reuseExistingRLS: false})
                    setShowAdvancedRLS(true)
                  }}
                >
                  No, I'll define new RLS
                </Button>
              </div>

              {showAdvancedRLS && (
                <Card className="card-shadow mt-6">
                  <CardHeader>
                    <CardTitle>Define new RLS configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Role level</label>
                        <Select value={rlsConfig.roleLevel} onValueChange={(value) => setRlsConfig({...rlsConfig, roleLevel: value})}>
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
                        <Select value={rlsConfig.entity} onValueChange={(value) => setRlsConfig({...rlsConfig, entity: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select entity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entity">Entity</SelectItem>
                            <SelectItem value="market">Market</SelectItem>
                            <SelectItem value="cluster">Cluster</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Market</label>
                        <Select value={rlsConfig.market} onValueChange={(value) => setRlsConfig({...rlsConfig, market: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select market" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="spain">Spain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Cluster</label>
                        <Select value={rlsConfig.cluster} onValueChange={(value) => setRlsConfig({...rlsConfig, cluster: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cluster" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dach">DACH</SelectItem>
                            <SelectItem value="uk">UK</SelectItem>
                            <SelectItem value="nordics">Nordics</SelectItem>
                            <SelectItem value="emea">EMEA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Region</label>
                        <Select value={rlsConfig.region} onValueChange={(value) => setRlsConfig({...rlsConfig, region: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emea">EMEA</SelectItem>
                            <SelectItem value="apac">APAC</SelectItem>
                            <SelectItem value="americas">Americas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Service line</label>
                        <Select value={rlsConfig.serviceLine} onValueChange={(value) => setRlsConfig({...rlsConfig, serviceLine: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service line" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Client</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="clientType" 
                            value="all"
                            checked={rlsConfig.clientType === "all"}
                            onChange={(e) => setRlsConfig({...rlsConfig, clientType: e.target.value})}
                            className="text-primary"
                          />
                          <span>All clients</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="clientType" 
                            value="specific"
                            checked={rlsConfig.clientType === "specific"}
                            onChange={(e) => setRlsConfig({...rlsConfig, clientType: e.target.value})}
                            className="text-primary"
                          />
                          <span>Specific client</span>
                        </label>
                      </div>
                      {rlsConfig.clientType === "specific" && (
                        <div className="mt-3">
                          <label className="block text-sm text-muted-foreground mb-2">Select specific client</label>
                          <Select value={rlsConfig.specificClient} onValueChange={(value) => setRlsConfig({...rlsConfig, specificClient: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specific client" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mercedes">Mercedes</SelectItem>
                              <SelectItem value="bmw">BMW</SelectItem>
                              <SelectItem value="audi">Audi</SelectItem>
                              <SelectItem value="volkswagen">Volkswagen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">?</span>
                        </div>
                        <div className="text-sm">
                          <h4 className="font-medium text-blue-900 mb-1">Need help?</h4>
                          <p className="text-blue-800 mb-2">
                            Use the built-in <strong>Help Me</strong> option during your request or explore in-app tips. For 
                            unresolved issues, Sakura Support will guide you step-by-step.
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300">
                              Contact Workspace Owner
                            </Button>
                            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300">
                              Open support ticket
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )

      case 4:
        if (isDetectingApprovers) {
          return (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Approver detection</h2>
                <p className="text-muted-foreground">
                  Sakura is automatically identifying the required approvers for your request...
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
                          <h3 className="font-semibold">Line manager</h3>
                          <p className="text-sm text-muted-foreground">Bob Green (bob@example.de)</p>
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
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-status-pending border-t-transparent"></div>
                        </div>
                        <div>
                          <h3 className="font-semibold">OLS Approver</h3>
                          <p className="text-sm text-muted-foreground">Detecting...</p>
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
                          <div className="animate-pulse rounded-full h-4 w-4 bg-muted-foreground/30"></div>
                        </div>
                        <div>
                          <h3 className="font-semibold">RLS Approver</h3>
                          <p className="text-sm text-muted-foreground">Detecting...</p>
                        </div>
                      </div>
                      <StatusBadge variant="pending">Detecting...</StatusBadge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        }

        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Approver detection</h2>
              <p className="text-muted-foreground">
                Sakura has automatically identified the required approvers for your request. Review before completing.
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
                        <h3 className="font-semibold">Line manager</h3>
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

              {rlsApproverFound === false ? (
                <Card className="card-shadow border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-bold">!</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-900">No RLS Approver found</h3>
                          <p className="text-sm text-red-800">
                            Sakura could not find a configured approver for this dimension.
                          </p>
                          <p className="text-sm text-red-800 font-medium mt-1">
                            Missing approvers must be resolved before the request can proceed.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowEscalationModal(true)}
                          className="text-red-700 border-red-300 hover:bg-red-50"
                        >
                          Escalate to Workspace Owner
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleAdjustDimensionFilters}
                          className="sakura-gradient text-white"
                        >
                          Adjust dimension filters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : rlsApproverFound === true ? (
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
                            This approver manages access to the selected report, app or audience
                          </p>
                          <p className="text-sm font-medium mt-1">Carl Smith (carl@example.de)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
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

              {/* <div className="flex justify-center">
                <Button size="lg" className="sakura-gradient text-white px-8">
                  Submit Request
                </Button>
              </div> */}
            </div>
          </div>
        )

      case 6:
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

            <div className="bg-muted/30 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Request submitted</h4>
                    <p className="text-sm text-muted-foreground">System validation completed</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Status updates</h4>
                    <p className="text-sm text-muted-foreground">You'll receive email updates as each approver takes action</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Access granted</h4>
                    <p className="text-sm text-muted-foreground">Once approved, access will be automatically granted</p>
                  </div>
                </div>
              </div>
            </div>

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
                  <Button variant="outline" onClick={handlePrevious} disabled={isSubmitting}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
                </Link>
                
                {currentStep < 5 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={isSubmitting || isNextLoading || (currentStep === 4 && rlsApproverFound === false)}
                    className="sakura-gradient text-white"
                  >
                    {isNextLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="sakura-gradient text-white"
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
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Multiple Apps Modal */}
      <MultipleAppsModal
        open={showMultipleAppsModal}
        onOpenChange={setShowMultipleAppsModal}
        report={multipleAppsReport || { name: "", workspace: "", type: "" }}
        onConfirm={handleMultipleAppsConfirm}
      />
      
      {/* Escalation Modal */}
      <EscalationModal
        open={showEscalationModal}
        onOpenChange={setShowEscalationModal}
        onEscalate={handleEscalate}
      />
    </div>
  )
}

export default RequestAccessGuided