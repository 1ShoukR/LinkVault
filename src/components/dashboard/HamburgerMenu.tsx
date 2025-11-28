import React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Settings, 
  CreditCard,
  LogOut,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  label: string
  href: string
  icon: React.ElementType
}

const navigation: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Links', href: '/dashboard/links', icon: LinkIcon },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
  userEmail?: string
}

export function HamburgerMenu({ isOpen, onClose, className, userEmail }: HamburgerMenuProps) {
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <span className="text-lg font-bold tracking-tight">LinkVault</span>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-accent hover:text-accent-foreground lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info (Mobile Only) */}
          {userEmail && (
            <div className="border-b px-6 py-4 lg:hidden">
              <p className="text-sm font-medium text-muted-foreground">Signed in as</p>
              <p className="truncate text-sm font-bold">{userEmail}</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="border-t p-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

