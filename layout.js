import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Sparkles, 
  LayoutDashboard, 
  Palette, 
  Rocket,
  Settings,
  Globe,
  Zap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "AI Generator",
    url: createPageUrl("Generate"),
    icon: Sparkles,
  },
  {
    title: "Templates",
    url: createPageUrl("Templates"),
    icon: Palette,
  },
  {
    title: "Launch",
    url: createPageUrl("Launch"),
    icon: Rocket,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --bg-gradient: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            --accent-gradient: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
          }
          
          body {
            background: var(--bg-gradient);
            background-attachment: fixed;
          }
          
          .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
          }
          
          .gradient-text {
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glow-effect {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-gray-800 bg-gray-900/50 backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-gray-900" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">web69</h2>
                <p className="text-xs text-gray-400">AI Website Builder</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 py-2">
                Build & Launch
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 rounded-xl mb-1 group ${
                          location.pathname === item.url ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-800 p-4">
            <div className="glass-effect rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-200 text-sm truncate">User</p>
                  <p className="text-xs text-gray-400 truncate">Build amazing websites</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-gray-900">
          <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 text-gray-400" />
              <h1 className="text-xl font-bold gradient-text">web69</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}