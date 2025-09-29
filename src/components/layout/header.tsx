import { Bell, User, Settings, LogOut, UserCircle, HelpCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const { toast } = useToast()

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'profile':
        toast({
          title: "Profile",
          description: "Profile settings would open here.",
        })
        break
      case 'settings':
        toast({
          title: "Settings",
          description: "Application settings would open here.",
        })
        break
      case 'help':
        toast({
          title: "Help & Support",
          description: "Help documentation would open here.",
        })
        break
      case 'logout':
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        })
        break
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <ThemeSwitcher />
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback className="sakura-gradient text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">
                  sarah.johnson@company.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleMenuAction('profile')}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuAction('settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuAction('help')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleMenuAction('logout')} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}