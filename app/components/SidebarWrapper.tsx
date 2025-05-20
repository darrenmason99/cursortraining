"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed((c) => !c)} />
      <main className={`flex-1 min-h-screen transition-all duration-200 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>{children}</main>
    </div>
  );
} 