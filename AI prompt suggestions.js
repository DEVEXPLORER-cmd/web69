import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";

export default function AIPromptSuggestions({ onSuggestionClick }) {
  const suggestions = [
    "A modern SaaS landing page with hero section, features, pricing, and testimonials. Clean design with blue and purple gradients.",
    "Professional photography portfolio with image gallery, about section, and contact form. Minimalist black and white design.",
    "Restaurant website with menu showcase, online ordering, location info, and customer reviews. Warm, appetizing color scheme.",
    "Digital marketing agency site with services overview, case studies, team profiles, and blog. Bold, creative design.",
    "E-commerce store for handmade jewelry with product catalog, shopping cart, and secure checkout. Elegant, luxury feel.",
    "Tech startup homepage with product demo, investor pitch, team section, and career opportunities. Futuristic design."
  ];

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Need Inspiration?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              className="text-left h-auto p-4 text-gray-300 hover:text-white hover:bg-white/10 justify-start group transition-all duration-300"
              onClick={() => onSuggestionClick(suggestion)}
            >
              <div className="flex items-start gap-3 w-full">
                <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-sm leading-relaxed">{suggestion}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}