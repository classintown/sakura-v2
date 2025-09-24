import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { AccessCard } from "@/components/dashboard/access-card"
import { NotificationCard } from "@/components/dashboard/notification-card"
import { AccessDetailsModal } from "@/components/ui/access-details-modal"
import { NotificationDetailsModal } from "@/components/ui/notification-details-modal"
import { RequestDetailsModal } from "@/components/ui/request-details-modal"
import { Search, Wand2, Settings, Filter, Eye } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccess, setSelectedAccess] = useState<any>(null)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [modalType, setModalType] = useState<"ols" | "rls">("ols")

  // Mock data - in real app this would come from API
  const olsAccess = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics",
      type: "SAR" as const,
      status: "approved" as const,
      description: "This standalone report shows profit and loss by client, detailing revenue, expenses, and net income to identify profitable clients and guide decisions."
    },
    {
      id: "2", 
      name: "Finance Reports",
      workspace: "Finance WS",
      type: "SAR" as const,
      status: "pending" as const,
    },
    {
      id: "3",
      name: "Client Leads Audience", 
      workspace: "Marketing Analytics",
      type: "AUR" as const,
      status: "approved" as const,
    }
  ]

  const rlsAccess = [
    {
      id: "4",
      name: "Growth Insights",
      workspace: "Growth Insights WS", 
      app: "Growth Insights App",
      regions: ["DACH", "CXM", "All"],
      approvedBy: "Sarah Joe"
    },
    {
      id: "5",
      name: "Marketing Analytics",
      workspace: "Marketing WS",
      app: "Marketing App", 
      regions: ["DACH", "CXM"],
      approvedBy: "Sarah Joe"
    }
  ]

  const notifications = [
    {
      id: "1",
      type: "approved" as const,
      title: "Access approved",
      description: "Client P&L access approved.",
      timestamp: "2 minutes ago"
    },
    {
      id: "2", 
      type: "approved" as const,
      title: "LM approved",
      description: "Your request for Client P&L access has been approved by LM. Awaiting next steps.",
      timestamp: "1 hour ago"
    },
    {
      id: "3",
      type: "rejected" as const, 
      title: "Access rejected",
      description: "Finance Report request denied by RLS.",
      timestamp: "1 hour ago"
    }
  ]

  const requests = [
    {
      id: "1",
      name: "Client P&L",
      workspace: "Marketing Analytics", 
      requestedFor: "Me (myself)",
      status: "approved" as const,
      requestDate: "18 Jun, 2025",
      updateDate: "21 Jun, 2025"
    },
    {
      id: "2",
      name: "Finance KPI", 
      workspace: "Finance plans",
      requestedFor: "Me (myself)",
      status: "approved" as const,
      requestDate: "18 Jun, 2025", 
      updateDate: "21 Jun, 2025"
    }
  ]

  // Filter data based on search query
  const filteredOlsAccess = olsAccess.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.workspace.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRlsAccess = rlsAccess.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.workspace?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.regions?.some(region => region.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredRequests = requests.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.workspace.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.requestedFor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          description="Start new access requests and view your access at a glance"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link to="/request-access-guided">
              <Card className="card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg sakura-gradient">
                      <Wand2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        Request access (Guided)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Step by step wizard for beginners via Report Catalogue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/request-access-advanced">
              <Card className="card-shadow hover:elevated-shadow transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-status-aur/10 border border-status-aur/20">
                      <Settings className="h-6 w-6 text-status-aur" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        Request access (Advanced)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Direct workspace and object selection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* OLS Access */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My OLS access</h2>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search objects"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-3">
                {filteredOlsAccess.length > 0 ? (
                  filteredOlsAccess.map((item) => (
                    <AccessCard 
                      key={item.id} 
                      item={item} 
                      onViewDetails={() => {
                        setSelectedAccess(item)
                        setModalType("ols")
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {searchQuery ? `No OLS access found for "${searchQuery}"` : "No OLS access available"}
                  </div>
                )}
              </div>
            </div>

            {/* RLS Access */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My RLS access</h2>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search security models"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-4">
                {filteredRlsAccess.length > 0 ? (
                  filteredRlsAccess.map((item) => (
                    <Card key={item.id} className="card-shadow cursor-pointer hover:elevated-shadow transition-all duration-200" onClick={() => {
                      setSelectedAccess({...item, dataset: "Growth Insights", market: "Germany", serviceLine: "Media", client: "Mercedes"})
                      setModalType("rls")
                    }}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>Workspace: {item.workspace}</p>
                          <p>App: {item.app}</p>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {item.regions.map((region) => (
                            <span 
                              key={region}
                              className="px-2 py-1 bg-muted rounded text-xs"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">
                            Approved by: {item.approvedBy}
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedAccess({...item, dataset: "Growth Insights", market: "Germany", serviceLine: "Media", client: "Mercedes"})
                              setModalType("rls")
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {searchQuery ? `No RLS access found for "${searchQuery}"` : "No RLS access available"}
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} onClick={() => setSelectedNotification(notification)}>
                    <NotificationCard notification={notification} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Requests */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">My requests</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
            
            <Card className="card-shadow">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="px-6 py-4 font-medium text-sm">Name</th>
                        <th className="px-6 py-4 font-medium text-sm">Workspace</th>
                        <th className="px-6 py-4 font-medium text-sm">Requested for</th>
                        <th className="px-6 py-4 font-medium text-sm">Status</th>
                        <th className="px-6 py-4 font-medium text-sm">Requested</th>
                        <th className="px-6 py-4 font-medium text-sm">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                          <tr 
                            key={request.id} 
                            className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <td className="px-6 py-4 text-sm font-medium">{request.name}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{request.workspace}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{request.requestedFor}</td>
                            <td className="px-6 py-4">
                              <StatusBadge variant={request.status}>
                                {request.status === "approved" ? "Approved" : "Pending"}
                              </StatusBadge>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{request.requestDate}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{request.updateDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                            {searchQuery ? `No requests found for "${searchQuery}"` : "No requests available"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modals */}
          <AccessDetailsModal
            open={!!selectedAccess}
            onOpenChange={(open) => !open && setSelectedAccess(null)}
            accessItem={selectedAccess}
            type={modalType}
          />
          
          <NotificationDetailsModal
            open={!!selectedNotification}
            onOpenChange={(open) => !open && setSelectedNotification(null)}
            notification={selectedNotification}
          />
          
          <RequestDetailsModal
            open={!!selectedRequest}
            onOpenChange={(open) => !open && setSelectedRequest(null)}
            request={selectedRequest || {
              id: "1",
              name: "Client P&L",
              workspace: "Marketing Analytics",
              requestedFor: "Me (myself)",
              lineManager: "✓ Line manager",
              olsApprover: "✓ OLS Approver",
              rlsApprover: "— RLS Approver",
              requestDate: "18 Jun, 2025",
              updateDate: "21 Jun, 2025",
              type: "SAR" as const,
              status: "approved" as const,
              description: "This standalone report shows profit and loss by client",
              businessJustification: "Required for quarterly client profitability analysis",
              urgency: "medium" as const
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
