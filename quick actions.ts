import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Sparkles, 
  Palette, 
  Upload,
  Rocket,
  FileText,
  Zap
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "AI Generate",
      description: "Create with AI",
      icon: Sparkles,
      url: createPageUrl("Generate"),
      gradient: "from-purple-500 to-pink-500",
      primary: true
    },
    {
      title: "Browse Templates", 
      description: "Pre-made designs",
      icon: Palette,
      url: createPageUrl("Templates"),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Import Design",
      description: "Upload existing",
      icon: Upload,
      url: createPageUrl("Import"),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Launch Site",
      description: "Go live now",
      icon: Rocket,
      url: createPageUrl("Launch"),
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Zap className="w-6 h-6 text-yellow-400" />
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link key={action.title} to={action.url}>
            <Card className={`glass-effect border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group ${action.primary ? 'lg:col-span-2' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-white ${action.primary ? 'text-xl' : 'text-lg'} mb-1`}>
                      {action.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                    {action.primary && (
                      <p className="text-xs text-gray-500 mt-2">
                        Describe your vision and watch AI build it
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}