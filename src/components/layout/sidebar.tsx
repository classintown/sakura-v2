import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, LayoutDashboard, FileText, Shield, List, Bell } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { NotificationPanel } from "@/components/ui/notification-panel"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My requests", href: "/requests", icon: FileText },
  { name: "My access", href: "/access", icon: Shield },
  { name: "Report catalogue", href: "/catalogue", icon: List },
]

export function Sidebar() {
  const location = useLocation()
  const [focusedNavIndex, setFocusedNavIndex] = useState(-1)

  // Keyboard navigation for sidebar
  useKeyboardNavigation({
    onArrowDown: () => {
      setFocusedNavIndex(prev => 
        prev < navigation.length - 1 ? prev + 1 : prev
      )
    },
    onArrowUp: () => {
      setFocusedNavIndex(prev => prev > 0 ? prev - 1 : prev)
    },
    onEnter: () => {
      if (focusedNavIndex >= 0 && focusedNavIndex < navigation.length) {
        window.location.href = navigation[focusedNavIndex].href
      }
    },
    onEscape: () => {
      setFocusedNavIndex(-1)
    },
    enabled: true
  })

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg sakura-gradient">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            SAKURA
          </span>
        </div>
        <NotificationPanel />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href
          const isFocused = focusedNavIndex === index
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left font-normal transition-all",
                  isActive && "bg-primary/10 text-primary border border-primary/20",
                  isFocused && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-semibold text-sm mb-2">Need help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use the built-in Help Me option during your request or explore in-app tips.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Contact support
          </Button>
        </div>
      </div>
    </div>
  )
}