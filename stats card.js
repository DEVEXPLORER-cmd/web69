import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, gradient, change }) {
  return (
    <Card className="glass-effect border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}