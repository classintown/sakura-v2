import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { AccessCard } from "@/components/dashboard/access-card"
import { NotificationCard } from "@/components/dashboard/notification-card"
import { Search, Wand2, Settings } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("")

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
                {olsAccess.map((item) => (
                  <AccessCard key={item.id} item={item} />
                ))}
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
                  className="pl-10"
                />
              </div>
              <div className="space-y-4">
                {rlsAccess.map((item) => (
                  <Card key={item.id} className="card-shadow">
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
                      <p className="text-xs text-muted-foreground mt-2">
                        Approved by: {item.approvedBy}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
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
                      {requests.map((request) => (
                        <tr key={request.id} className="border-b border-border hover:bg-muted/30 transition-colors">
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
