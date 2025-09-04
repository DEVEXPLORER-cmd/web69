import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  Server,
  Globe,
  Shield,
  CheckCircle,
  Sparkles
} from "lucide-react";

const steps = [
  { id: 1, title: "Preparing Files", icon: Server, description: "Optimizing your website..." },
  { id: 2, title: "Setting Up Domain", icon: Globe, description: "Configuring DNS and domain..." },
  { id: 3, title: "Security Setup", icon: Shield, description: "Adding SSL certificate..." },
  { id: 4, title: "Final Deployment", icon: Rocket, description: "Publishing to the web..." },
  { id: 5, title: "Live!", icon: CheckCircle, description: "Your website is now live!" }
];

export default function LaunchProgress({ step, projectName }) {
  const progress = ((step) / steps.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="glass-effect border-white/10 w-full max-w-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Launching {projectName}</h2>
            <p className="text-gray-400">Your website is going live...</p>
          </div>

          <div className="space-y-6">
            <Progress value={progress} className="h-3 bg-gray-800" />
            
            <div className="space-y-4">
              {steps.map((stepItem) => (
                <motion.div
                  key={stepItem.id}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: stepItem.id <= step ? 1 : 0.3,
                    scale: stepItem.id === step ? 1.05 : 1
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    stepItem.id <= step ? 'bg-white/10' : 'bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${
                    stepItem.id < step 
                      ? 'bg-green-500' 
                      : stepItem.id === step 
                        ? 'bg-orange-500 animate-pulse' 
                        : 'bg-gray-600'
                  }`}>
                    <stepItem.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${stepItem.id <= step ? 'text-white' : 'text-gray-400'}`}>
                      {stepItem.title}
                    </p>
                    <p className={`text-sm ${stepItem.id <= step ? 'text-gray-300' : 'text-gray-500'}`}>
                      {stepItem.description}
                    </p>
                  </div>
                  {stepItem.id < step && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  {stepItem.id === step && step === 5 && (
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}