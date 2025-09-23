import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Eye, Users, Smartphone, TrendingUp } from "lucide-react"

const ReportCatalogue = () => {
  const [searchQuery, setSearchQuery] = useState("Client")
  const [sortBy, setSortBy] = useState("recently-updated")

  const reports = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      type: "SAR" as const,
      description: "This standalone report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      status: "pending" as const,
      icon: <Eye className="h-5 w-5" />
    },
    {
      id: "2", 
      name: "Client Leads",
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This report is part of the Client Leads Audience in the Marketing Analytics App. It provides insights into client profitability, resource use, and costs to support decisions.",
      status: "approved" as const,
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "3",
      name: "Marketing Analytics app",
      workspace: "Marketing Analytics", 
      type: "APP" as const,
      description: "This app groups multiple audiences of reports for marketing performance, client portfolio, and financial tracking. It provides a central entry point for business stakeholders to access key dashboards.",
      status: "request" as const,
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      id: "4",
      name: "Client P&L 1",
      workspace: "Marketing Analytics",
      type: "SAR" as const, 
      description: "This report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions.",
      status: "request" as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: "5",
      name: "Client Leads audience", 
      workspace: "Marketing Analytics",
      app: "Marketing Analytics App",
      type: "AUR" as const,
      description: "This audience provides a curated pack of reports focused on client profitability and resource allocation, supporting account managers with client-level insights.",
      status: "approved" as const,
      icon: <Users className="h-5 w-5" />
    }
  ]

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
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="request">Request Access</SelectItem>
              </SelectContent>
            </Select>

            <div className="md:col-start-4">
              <Button className="w-full sakura-gradient text-white font-medium">
                Show tips
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              💡 Try: "financial dashboard", "customer metrics", "sales performance"
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Search results</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently-updated">Sort by: Recently updated</SelectItem>
                <SelectItem value="name">Sort by: Name</SelectItem>
                <SelectItem value="workspace">Sort by: Workspace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        {report.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
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
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {report.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <StatusBadge variant={getStatusVariant(report.status)}>
                      {getStatusText(report.status)}
                    </StatusBadge>
                    
                    {report.status === "request" ? (
                      <Button variant="outline" size="sm">
                        Request access
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        View details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ReportCatalogue