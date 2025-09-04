import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Download,
  Star,
  ExternalLink
} from "lucide-react";

export default function TemplateCard({ template }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-effect border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300">
        <div className="relative">
          <img 
            src={template.image} 
            alt={template.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs">{template.rating}</span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-white text-lg truncate">{template.name}</h3>
            <Badge variant="outline" className="border-blue-400/50 text-blue-400">
              {template.category}
            </Badge>
          </div>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {template.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{template.downloads.toLocaleString()} downloads</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Use This Template
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}