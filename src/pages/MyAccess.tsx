import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { AccessDetailsModal } from "@/components/ui/access-details-modal"
import { Search, Filter, Download, Eye } from "lucide-react"
import { AccessCard } from "@/components/dashboard/access-card"

const MyAccess = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccess, setSelectedAccess] = useState<any>(null)
  const [modalType, setModalType] = useState<"ols" | "rls">("ols")
  const [sortBy, setSortBy] = useState("name")
  const [filterType, setFilterType] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  
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
      status: "approved" as const,
    },
    {
      id: "3",
      name: "Client Leads Audience", 
      workspace: "Marketing Analytics",
      type: "AUR" as const,
      status: "approved" as const,
      description: "This report is part of the Client Leads Audience in the Marketing Analytics App."
    }
  ]

  const rlsAccess = [
    {
      id: "4",
      name: "Growth Insights",
      workspace: "Growth Insights WS", 
      app: "Growth Insights App",
      regions: ["DACH", "CXM", "All"],
      approvedBy: "Sarah Joe",
      dataset: "Growth Insights",
      market: "Germany", 
      serviceLine: "Media",
      client: "Mercedes"
    },
    {
      id: "5",
      name: "Marketing Analytics",
      workspace: "Marketing WS",
      app: "Marketing App", 
      regions: ["DACH", "CXM"],
      approvedBy: "Sarah Joe",
      dataset: "Marketing Data",
      market: "Germany",
      serviceLine: "Digital",
      client: "BMW"
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="My access"
          description="View and manage your current access permissions"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or workspace"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <FilterDropdown
              title="Sort by"
              options={[
                { value: "name", label: "Name A-Z" },
                { value: "workspace", label: "Workspace" },
                { value: "type", label: "Type" },
                { value: "status", label: "Status" }
              ]}
              selectedValues={[sortBy]}
              onSelectionChange={(values) => setSortBy(values[0] || "name")}
            />
            <FilterDropdown
              title="Type"
              options={[
                { value: "SAR", label: "SAR Report" },
                { value: "APP", label: "Application" },
                { value: "AUR", label: "AUR Report" }
              ]}
              selectedValues={filterType}
              onSelectionChange={setFilterType}
              multiSelect
            />
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="ols" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="ols">OLS Access</TabsTrigger>
              <TabsTrigger value="rls">RLS Access</TabsTrigger>
            </TabsList>

            <TabsContent value="ols" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {olsAccess.map((item) => (
                  <AccessCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rls" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rlsAccess.map((item) => (
                  <Card key={item.id} className="card-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Workspace:</span>
                          <span className="ml-2 font-medium">{item.workspace}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">App:</span>
                          <span className="ml-2 font-medium">{item.app}</span>
                        </div>
                        
                        {/* RLS Details */}
                        <div className="bg-muted/30 rounded-lg p-4 mt-4">
                          <h4 className="font-medium text-sm mb-3">Security Model Access:</h4>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-muted-foreground">Dataset:</span>
                              <div className="font-medium">{item.dataset}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Market:</span>
                              <div className="font-medium">{item.market}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Service line:</span>
                              <div className="font-medium">{item.serviceLine}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Client:</span>
                              <div className="font-medium">{item.client}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 mt-3">
                          {item.regions.map((region) => (
                            <span 
                              key={region}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-muted-foreground text-xs">
                            Approved by: {item.approvedBy}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedAccess(item)
                              setModalType("rls")
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          {/* Access Details Modal */}
          <AccessDetailsModal
            open={!!selectedAccess}
            onOpenChange={(open) => !open && setSelectedAccess(null)}
            accessItem={selectedAccess}
            type={modalType}
          />
        </main>
      </div>
    </div>
  )
}

export default MyAccess