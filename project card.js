import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Edit, 
  Globe, 
  Calendar,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";

export default function ProjectCard({ project, onUpdate }) {
  const statusColors = {
    draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    preview: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    published: "bg-green-500/20 text-green-400 border-green-500/30"
  };

  const typeIcons = {
    business: "🏢",
    portfolio: "💼", 
    blog: "📝",
    ecommerce: "🛒",
    landing: "🚀",
    restaurant: "🍕",
    agency: "🎨",
    startup: "💡"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-effect border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300">
        <div className="relative">
          <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {project.preview_url ? (
              <iframe 
                src={project.preview_url} 
                className="w-full h-full pointer-events-none"
                title={project.name}
              />
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {typeIcons[project.website_type] || "🌐"}
                </div>
                <p className="text-gray-400 text-sm">{project.website_type}</p>
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={statusColors[project.status]}>
              {project.status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-white text-lg mb-2 truncate">{project.name}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {project.description || "No description provided"}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{format(new Date(project.updated_date), "MMM d, yyyy")}</span>
            {project.ai_prompt && (
              <>
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400">AI Generated</span>
              </>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1 text-gray-400 hover:text-white hover:bg-white/10">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {project.status === 'published' && (
            <Button variant="ghost" size="sm" className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          )}
          <Button variant="ghost" size="sm" className="flex-1 text-gray-400 hover:text-white hover:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}