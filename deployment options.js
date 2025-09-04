import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Shield, Zap } from "lucide-react";

export default function DeploymentOptions({ selectedPlan }) {
  const deploymentFeatures = {
    free: [
      { icon: Globe, text: "Global CDN", included: true },
      { icon: Shield, text: "SSL Certificate", included: true },
      { icon: Zap, text: "Fast Loading", included: true },
      { icon: CheckCircle, text: "99.9% Uptime", included: false }
    ],
    pro: [
      { icon: Globe, text: "Global CDN", included: true },
      { icon: Shield, text: "SSL Certificate", included: true },
      { icon: Zap, text: "Fast Loading", included: true },
      { icon: CheckCircle, text: "99.9% Uptime", included: true }
    ]
  };

  const features = deploymentFeatures[selectedPlan] || deploymentFeatures.free;

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Deployment Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                feature.included ? 'bg-green-500/10' : 'bg-gray-500/10'
              }`}
            >
              <feature.icon className={`w-5 h-5 ${
                feature.included ? 'text-green-400' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                feature.included ? 'text-white' : 'text-gray-400'
              }`}>
                {feature.text}
              </span>
              {feature.included ? (
                <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
              ) : (
                <Badge variant="outline" className="text-xs ml-auto">Pro</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}