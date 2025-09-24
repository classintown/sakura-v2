import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { AdvancedSearch } from "@/components/ui/advanced-search"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Eye, Users, Smartphone, TrendingUp, Grid, List, Star, BookOpen, FileSearch } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/ui/empty-state"
import { LoadingState, LoadingOverlay } from "@/components/ui/loading-spinner"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { ReportDetailsModal } from "@/components/ui/report-details-modal"

const ReportCatalogue = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("Client")
  const [sortBy, setSortBy] = useState("recently-updated")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [workspaceFilter, setWorkspaceFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [focusedReportIndex, setFocusedReportIndex] = useState(-1)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedReportForDetails, setSelectedReportForDetails] = useState<any>(null)
  const itemsPerPage = 12

  const allReports = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      type: "SAR" as const,
      description: "This standalone report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      status: "pending" as const,
      iconType: "eye" as const
    },
    {
      id: "2", 
      name: "Client Leads",
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This report is part of the Client Leads Audience in the Marketing Analytics App. It provides insights into client profitability, resource use, and costs to support decisions.",
      status: "approved" as const,
      iconType: "users" as const
    },
    {
      id: "3",
      name: "Marketing Analytics app",
      workspace: "Marketing Analytics", 
      type: "APP" as const,
      description: "This app groups multiple audiences of reports for marketing performance, client portfolio, and financial tracking. It provides a central entry point for business stakeholders to access key dashboards.",
      status: "request" as const,
      iconType: "smartphone" as const
    },
    {
      id: "4",
      name: "Client P&L 1",
      workspace: "Marketing Analytics",
      type: "SAR" as const, 
      description: "This report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      status: "request" as const,
      iconType: "trending" as const
    },
    {
      id: "5",
      name: "Client Leads audience", 
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This audience provides a curated pack of reports focused on client profitability and resource allocation, supporting account managers with client-level insights.",
      status: "approved" as const,
      iconType: "users" as const
    },
    {
      id: "6",
      name: "Financial Overview",
      workspace: "Finance WS",
      type: "SAR" as const,
      description: "Comprehensive financial overview with key metrics and trends",
      status: "approved" as const,
      iconType: "trending" as const
    },
    {
      id: "7",
      name: "Growth Analytics",
      workspace: "Growth WS",
      app: "Growth Analytics App",
      type: "APP" as const,
      description: "Growth metrics and performance indicators",
      status: "request" as const,
      iconType: "smartphone" as const
    }
  ]

  const searchFilters = [
    {
      id: "workspace",
      type: "dropdown" as const,
      label: "Workspace",
      options: [
        { value: "Marketing Analytics", label: "Marketing Analytics" },
        { value: "Finance WS", label: "Finance WS" },
        { value: "Growth WS", label: "Growth WS" }
      ],
      value: workspaceFilter,
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
    },
    {
      id: "status",
      type: "dropdown" as const,
      label: "Access Status",
      options: [
        { value: "approved", label: "Approved" },
        { value: "pending", label: "Pending" },
        { value: "request", label: "Request Access" }
      ],
      value: statusFilter,
      multiSelect: true
    }
  ]

  const suggestions = [
    "client profitability analysis",
    "financial dashboard metrics",
    "marketing performance KPIs",
    "sales revenue reports",
    "customer analytics insights"
  ]

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

  const handleFiltersChange = async (filters: any[]) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const workspaceF = filters.find(f => f.id === "workspace")
    const typeF = filters.find(f => f.id === "type")
    const statusF = filters.find(f => f.id === "status")
    if (workspaceF) setWorkspaceFilter(workspaceF.value)
    if (typeF) setTypeFilter(typeF.value)
    if (statusF) setStatusFilter(statusF.value)
    
    setIsLoading(false)
  }

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query)
    if (query !== searchQuery) {
      setIsLoading(true)
      // Simulate search API delay
      await new Promise(resolve => setTimeout(resolve, 600))
      setIsLoading(false)
    }
  }

  const toggleFavorite = (reportId: string) => {
    const report = allReports.find(r => r.id === reportId)
    const isAdding = !favorites.includes(reportId)
    
    setFavorites(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    )
    
    toast({
      title: isAdding ? "Added to favorites" : "Removed from favorites",
      description: `${report?.name} has been ${isAdding ? 'added to' : 'removed from'} your favorites.`,
    })
  }

  const handleReportClick = (report: any) => {
    // Navigate to guided request flow with the selected report
    navigate('/request-access-guided', { 
      state: { 
        selectedReport: report,
        fromCatalogue: true 
      } 
    })
  }

  const handleViewDetails = (report: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedReportForDetails(report)
    setShowDetailsModal(true)
  }

  const handleRequestAccess = (report: any, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/request-access-guided', { 
      state: { 
        selectedReport: report,
        fromCatalogue: true 
      } 
    })
  }

  const handleRequestAccessFromModal = () => {
    setShowDetailsModal(false)
    navigate('/request-access-guided', { 
      state: { 
        selectedReport: selectedReportForDetails,
        fromCatalogue: true 
      } 
    })
  }

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.workspace.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesWorkspace = workspaceFilter.length === 0 || workspaceFilter.includes(report.workspace)
    const matchesType = typeFilter.length === 0 || typeFilter.includes(report.type)
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(report.status)
    return matchesSearch && matchesWorkspace && matchesType && matchesStatus
  })

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Keyboard navigation
  useKeyboardNavigation({
    onArrowDown: () => {
      setFocusedReportIndex(prev => 
        prev < paginatedReports.length - 1 ? prev + 1 : prev
      )
    },
    onArrowUp: () => {
      setFocusedReportIndex(prev => prev > 0 ? prev - 1 : prev)
    },
    onEnter: () => {
      if (focusedReportIndex >= 0 && focusedReportIndex < paginatedReports.length) {
        handleReportClick(paginatedReports[focusedReportIndex])
      }
    },
    onEscape: () => {
      setFocusedReportIndex(-1)
    },
    enabled: paginatedReports.length > 0 && !isLoading
  })

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "Approved"
      case "pending": return "Awaiting RLS"
      case "request": return "Request access"
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved": return "approved"
      case "pending": return "pending"
      case "request": return "sar"
      default: return "sar"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Report catalogue search"
          description="Search for SAR (Standalone Reports) and AUR (Audience Reports), or Audiences and Apps across all workspaces"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Enhanced Search */}
          <AdvancedSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filters={searchFilters}
            onFiltersChange={handleFiltersChange}
            suggestions={suggestions}
            className="mb-6"
          />

          {/* Results Header with View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Search results</h2>
              <span className="text-sm text-muted-foreground">
                {filteredReports.length} reports found
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <FilterDropdown
                title="Sort by"
                options={[
                  { value: "recently-updated", label: "Recently updated" },
                  { value: "name", label: "Name A-Z" },
                  { value: "workspace", label: "Workspace" },
                  { value: "popularity", label: "Most popular" }
                ]}
                selectedValues={[sortBy]}
                onSelectionChange={(values) => setSortBy(values[0] || "recently-updated")}
              />
              
              <div className="flex items-center bg-muted/30 rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <LoadingOverlay isLoading={isLoading} loadingText="Searching reports...">
            {paginatedReports.length === 0 ? (
            <EmptyState
              icon={FileSearch}
              title="No reports found"
              description={searchQuery || workspaceFilter.length > 0 || typeFilter.length > 0 || statusFilter.length > 0 
                ? "No reports match your current search and filter criteria. Try adjusting your filters or search terms."
                : "No reports are available in the catalogue at this time."
              }
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearchQuery("")
                  setWorkspaceFilter([])
                  setTypeFilter([])
                  setStatusFilter([])
                },
                variant: "outline"
              }}
            />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedReports.map((report, index) => (
                <Card 
                  key={report.id} 
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer group ${
                    focusedReportIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => handleReportClick(report)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          {getReportIcon(report.iconType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                              {report.name}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(report.id)
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Star className={`h-4 w-4 ${favorites.includes(report.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                            </Button>
                          </div>
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
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <StatusBadge variant={getStatusVariant(report.status)}>
                        {getStatusText(report.status)}
                      </StatusBadge>
                      
                      {report.status === "request" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleRequestAccess(report, e)}
                        >
                          Request access
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => handleViewDetails(report, e)}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          View details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedReports.map((report, index) => (
                <Card 
                  key={report.id} 
                  className={`card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer ${
                    focusedReportIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => handleReportClick(report)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-muted">
                          {getReportIcon(report.iconType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{report.name}</h3>
                            <StatusBadge 
                              variant={
                                report.type === "SAR" ? "sar" : 
                                report.type === "AUR" ? "aur" : "app"
                              }
                            >
                              {report.type}
                            </StatusBadge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(report.id)
                              }}
                              className="h-6 w-6 p-0 ml-auto"
                            >
                              <Star className={`h-4 w-4 ${favorites.includes(report.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Workspace: {report.workspace} {report.app && `• App: ${report.app}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge variant={getStatusVariant(report.status)}>
                          {getStatusText(report.status)}
                        </StatusBadge>
                        {report.status === "request" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => handleRequestAccess(report, e)}
                          >
                            Request access
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => handleViewDetails(report, e)}
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            View details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = i + 1
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 2 + i
                      }
                      if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      }
                    }
                    if (pageNum > totalPages) return null
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
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
          </LoadingOverlay>
        </main>
      </div>

      {/* Report Details Modal */}
      <ReportDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        report={selectedReportForDetails}
        onRequestAccess={handleRequestAccessFromModal}
      />
    </div>
  )
}

export default ReportCatalogue