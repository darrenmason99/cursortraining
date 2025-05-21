"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed((c) => !c)} />
      <main className={`flex-1 min-h-screen transition-all duration-200 lg:ml-64 ${sidebarCollapsed ? 'lg:ml-20' : ''}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 