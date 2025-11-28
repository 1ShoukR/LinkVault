import React from 'react'
import { cn } from '@/lib/utils'

interface SidebarToggleProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function SidebarToggle({ isOpen, onToggle, className }: SidebarToggleProps) {
  return (
    <button 
      onClick={onToggle} 
      className={cn("flex flex-col justify-center items-center h-10 w-10 rounded-md hover:bg-accent/50 transition-colors", className)}
      aria-label="Toggle menu"
    >
      <span 
        className={cn(
          "bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm",
          isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
        )}
      />
      <span 
        className={cn(
          "bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-1",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span 
        className={cn(
          "bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm",
          isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
        )}
      />
    </button>
  )
}
