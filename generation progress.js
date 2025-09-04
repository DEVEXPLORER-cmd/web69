import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Brain,
  Palette,
  Code,
  Rocket,
  CheckCircle
} from "lucide-react";

const steps = [
  { id: 1, title: "Analyzing Requirements", icon: Brain, description: "Understanding your vision..." },
  { id: 2, title: "Generating Structure", icon: Palette, description: "Creating layout and design..." },
  { id: 3, title: "Building Content", icon: Code, description: "Writing code and content..." },
  { id: 4, title: "Saving Project", icon: Rocket, description: "Finalizing your website..." },
  { id: 5, title: "Complete!", icon: CheckCircle, description: "Your website is ready!" }
];

export default function GenerationProgress({ step, projectName }) {
  const progress = ((step) / steps.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="glass-effect border-white/10 w-full max-w-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Generating {projectName}</h2>
            <p className="text-gray-400">AI is creating your website...</p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="space-y-3">
              {steps.map((stepItem) => (
                <motion.div
                  key={stepItem.id}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: stepItem.id <= step ? 1 : 0.3,
                    scale: stepItem.id === step ? 1.05 : 1
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    stepItem.id <= step ? 'bg-white/10' : 'bg-white/5'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    stepItem.id < step 
                      ? 'bg-green-500' 
                      : stepItem.id === step 
                        ? 'bg-blue-500 animate-pulse' 
                        : 'bg-gray-600'
                  }`}>
                    <stepItem.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${stepItem.id <= step ? 'text-white' : 'text-gray-400'}`}>
                      {stepItem.title}
                    </p>
                    <p className={`text-sm ${stepItem.id <= step ? 'text-gray-300' : 'text-gray-500'}`}>
                      {stepItem.description}
                    </p>
                  </div>
                  {stepItem.id < step && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
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