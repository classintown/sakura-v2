import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

const MyRequests = () => {
  const [searchQuery, setSearchQuery] = useState("")
  
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
      status: "pending" as const
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
      status: "approved" as const
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="My requests"
          description="Track and manage your access requests"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
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
                        {requests.map((request) => (
                          <tr key={request.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{request.name}</span>
                                <StatusBadge 
                                  variant={request.type === "SAR" ? "sar" : "app"}
                                  className="text-xs"
                                >
                                  {request.type}
                                </StatusBadge>
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
                                  <span className={request.olsApprover.includes("✓") ? "text-status-approved" : request.olsApprover.includes("✗") ? "text-status-rejected" : "text-muted-foreground"}>
                                    {request.olsApprover}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">
                                    {request.rlsApprover}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-6 text-sm text-muted-foreground">
                              {request.requestDate}
                            </td>
                            <td className="px-6 py-6 text-sm text-muted-foreground">
                              {request.updateDate}
                            </td>
                            <td className="px-6 py-6">
                              <Button variant="ghost" size="sm">
                                View details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ols" className="mt-6">
              <Card className="card-shadow">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>No OLS requests found</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rls" className="mt-6">
              <Card className="card-shadow">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>No RLS requests found</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default MyRequests