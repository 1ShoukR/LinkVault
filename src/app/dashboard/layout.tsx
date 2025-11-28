"use client";

import { useState } from "react";
import { HamburgerMenu } from "@/components/dashboard/HamburgerMenu";
import { SidebarToggle } from "@/components/sidebar/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <HamburgerMenu 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userEmail={user?.email}
      />

      <div className="flex flex-1 flex-col transition-all duration-300 lg:ml-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:hidden">
          <SidebarToggle 
            isOpen={sidebarOpen} 
            onToggle={() => setSidebarOpen(!sidebarOpen)} 
          />
          <span className="text-lg font-bold tracking-tight">Dashboard</span>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

