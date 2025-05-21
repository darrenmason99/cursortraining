"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed((c) => !c)} />
      <main className="flex-1 p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
} 