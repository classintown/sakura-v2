import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdvancedSearch } from "@/components/ui/advanced-search"
import { RequestDetailsModal } from "@/components/ui/request-details-modal"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ApprovalWorkflowModal } from "@/components/ui/approval-workflow-modal"
import { BulkActionsModal } from "@/components/ui/bulk-actions-modal"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Filter, Download, Users, CheckCircle, Shield, FileText } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { useNavigate } from "react-router-dom"

const MyRequests = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [showWorkflowModal, setShowWorkflowModal] = useState(false)
  const [workflowRequest, setWorkflowRequest] = useState<any>(null)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkAction, setBulkAction] = useState<"approve" | "reject" | "export" | "withdraw">("export")
  const itemsPerPage = 10
  
  const requests = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      requestedFor: "Me (myself)",
      lineManager: "✓ Line manager",
      olsApprover: "✗ OLS Approver", 
      rlsApprover: "— RLS Approver",
      requestDate: "18 Jun, 2025",
      updateDate: "21 Jun, 2025",
      type: "SAR" as const,
      status: "pending" as const,
      description: "Comprehensive profit and loss report by client",
      businessJustification: "Required for quarterly client profitability analysis and strategic planning",
      urgency: "high" as const
    },
    {
      id: "2",
      name: "Finance KPI",
      workspace: "Finance plans", 
      requestedFor: "Me (myself)",
      lineManager: "✓ Line manager",
      olsApprover: "✓ OLS Approver",
      rlsApprover: "— RLS Approver", 
      requestDate: "18 Jun, 2025",
      updateDate: "21 Jun, 2025",
      type: "APP" as const,
      status: "approved" as const,
      description: "Key performance indicators for finance department",
      businessJustification: "Monthly reporting requirements for executive dashboard",
      urgency: "medium" as const
    },
    {
      id: "3",
      name: "Sales Dashboard",
      workspace: "Sales Analytics",
      requestedFor: "Me (myself)",
      lineManager: "✓ Line manager",
      olsApprover: "✓ OLS Approver",
      rlsApprover: "✓ RLS Approver",
      requestDate: "15 Jun, 2025",
      updateDate: "20 Jun, 2025",
      type: "APP" as const,
      status: "approved" as const,
      description: "Real-time sales performance tracking",
      businessJustification: "Daily sales monitoring and target tracking",
      urgency: "low" as const
    },
    {
      id: "4",
      name: "Customer Analytics",
      workspace: "Marketing Analytics",
      requestedFor: "Team Lead",
      lineManager: "✓ Line manager",
      olsApprover: "⏳ OLS Approver",
      rlsApprover: "— RLS Approver",
      requestDate: "20 Jun, 2025",
      updateDate: "22 Jun, 2025",
      type: "SAR" as const,
      status: "pending" as const,
      description: "Customer behavior and segmentation analysis",
      businessJustification: "Campaign optimization and customer journey mapping",
      urgency: "medium" as const
    }
  ]

  const searchFilters = [
    {
      id: "status",
      type: "dropdown" as const,
      label: "Status",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" }
      ],
      value: statusFilter,
      multiSelect: true
    },
    {
      id: "type",
      type: "dropdown" as const,
      label: "Type",
      options: [
        { value: "SAR", label: "SAR Report" },
        { value: "APP", label: "Application" },
        { value: "AUR", label: "AUR Report" }
      ],
      value: typeFilter,
      multiSelect: true
    }
  ]

  const suggestions = [
    "Client profitability reports",
    "Finance dashboards",
    "Marketing analytics",
    "Sales performance"
  ]

  const handleFiltersChange = (filters: any[]) => {
    const statusF = filters.find(f => f.id === "status")
    const typeF = filters.find(f => f.id === "type")
    if (statusF) setStatusFilter(statusF.value)
    if (typeF) setTypeFilter(typeF.value)
  }

  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           request.workspace.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(request.status)
      const matchesType = typeFilter.length === 0 || typeFilter.includes(request.type)
      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
        case "oldest":
          return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        case "name":
          return a.name.localeCompare(b.name)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="My requests"
          description="Track and manage your access requests"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Enhanced Search */}
          <AdvancedSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={searchFilters}
            onFiltersChange={handleFiltersChange}
            suggestions={suggestions}
            className="mb-6"
          />

          {/* Quick Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FilterDropdown
                title="Sort by"
                options={[
                  { value: "newest", label: "Newest first" },
                  { value: "oldest", label: "Oldest first" },
                  { value: "name", label: "Name A-Z" },
                  { value: "status", label: "Status" }
                ]}
                selectedValues={[sortBy]}
                onSelectionChange={(values) => setSortBy(values[0] || "newest")}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setBulkAction("export")
                  setShowBulkModal(true)
                }}
                disabled={selectedRequests.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export {selectedRequests.length > 0 && `(${selectedRequests.length})`}
              </Button>
              {selectedRequests.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setBulkAction("approve")
                    setShowBulkModal(true)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredRequests.length} requests found
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ols">OLS requests</TabsTrigger>
              <TabsTrigger value="rls">RLS requests</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Card className="card-shadow">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-muted/30">
                        <tr className="text-left">
                          <th className="px-6 py-4 font-medium text-sm">
                            <Checkbox
                              checked={selectedRequests.length === paginatedRequests.length}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedRequests(paginatedRequests.map(r => r.id))
                                } else {
                                  setSelectedRequests([])
                                }
                              }}
                            />
                          </th>
                          <th className="px-6 py-4 font-medium text-sm">Name</th>
                          <th className="px-6 py-4 font-medium text-sm">Workspace</th>
                          <th className="px-6 py-4 font-medium text-sm">Requested for</th>
                          <th className="px-6 py-4 font-medium text-sm">Approval Status</th>
                          <th className="px-6 py-4 font-medium text-sm">Requested</th>
                          <th className="px-6 py-4 font-medium text-sm">Updated</th>
                          <th className="px-6 py-4 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRequests.map((request) => (
                          <tr key={request.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                            <td className="px-6 py-6">
                              <Checkbox
                                checked={selectedRequests.includes(request.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedRequests([...selectedRequests, request.id])
                                  } else {
                                    setSelectedRequests(selectedRequests.filter(id => id !== request.id))
                                  }
                                }}
                              />
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{request.name}</span>
                                <StatusBadge 
                                  variant={request.type === "SAR" ? "sar" : request.type === "APP" ? "app" : "aur"}
                                  className="text-xs"
                                >
                                  {request.type}
                                </StatusBadge>
                                {request.urgency === "high" && (
                                  <span className="w-2 h-2 bg-status-rejected rounded-full animate-pulse"></span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-6 text-sm text-muted-foreground">
                              {request.workspace}
                            </td>
                            <td className="px-6 py-6 text-sm text-muted-foreground">
                              {request.requestedFor}
                            </td>
                            <td className="px-6 py-6">
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className={request.lineManager.includes("✓") ? "text-status-approved" : "text-status-rejected"}>
                                    {request.lineManager}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={
                                    request.olsApprover.includes("✓") ? "text-status-approved" : 
                                    request.olsApprover.includes("✗") ? "text-status-rejected" : 
                                    request.olsApprover.includes("⏳") ? "text-status-pending" :
                                    "text-muted-foreground"
                                  }>
                                    {request.olsApprover}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={
                                    request.rlsApprover.includes("✓") ? "text-status-approved" :
                                    "text-muted-foreground"
                                  }>
                                    {request.rlsApprover}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {request.requestDate}
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {request.updateDate}
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  View details
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setWorkflowRequest(request)
                                    setShowWorkflowModal(true)
                                  }}
                                >
                                  Workflow
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ols" className="mt-6">
              <EmptyState
                icon={FileText}
                title="No OLS requests found"
                description="You haven't made any Object-Level Security access requests yet. OLS requests control access to specific reports, apps, and workspaces."
                action={{
                  label: "Request OLS Access",
                  onClick: () => navigate('/request-access-guided')
                }}
              />
            </TabsContent>

            <TabsContent value="rls" className="mt-6">
              <EmptyState
                icon={Shield}
                title="No RLS requests found"
                description="You haven't made any Row-Level Security access requests yet. RLS requests control access to specific data rows based on your role and permissions."
                action={{
                  label: "Request RLS Access",
                  onClick: () => navigate('/request-access-advanced')
                }}
              />
            </TabsContent>
          </Tabs>

          {/* Modals */}
          <RequestDetailsModal
            open={!!selectedRequest}
            onOpenChange={(open) => !open && setSelectedRequest(null)}
            request={selectedRequest || requests[0]}
          />
          
          <ApprovalWorkflowModal
            open={showWorkflowModal}
            onOpenChange={setShowWorkflowModal}
            request={workflowRequest}
          />
          
          <BulkActionsModal
            open={showBulkModal}
            onOpenChange={setShowBulkModal}
            selectedItems={requests.filter(r => selectedRequests.includes(r.id))}
            actionType={bulkAction}
          />
        </main>
      </div>
    </div>
  )
}

export default MyRequests