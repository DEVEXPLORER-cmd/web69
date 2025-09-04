import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Sparkles, 
  Globe,
  Eye,
  Clock,
  Zap,
  TrendingUp,
  Users,
  Star
} from "lucide-react";
import ProjectCard from "../components/dashboard/ProjectCard";
import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await Project.list("-updated_date");
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects([]);
    }
    setIsLoading(false);
  };

  const recentProjects = projects.slice(0, 6);
  const publishedProjects = projects.filter(p => p.status === 'published');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">AI-Powered Website Creation</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Build. Launch. <span className="gradient-text">Dominate.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Create stunning websites in minutes with the power of AI. No coding required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Generate")}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl glow-effect">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Generate Website
                  </Button>
                </Link>
                <Link to={createPageUrl("Templates")}>
                  <Button variant="outline" size="lg" className="border-white/20 text-gray-300 hover:bg-white/10 px-8 py-3 rounded-xl">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total Projects"
              value={projects.length}
              icon={Globe}
              gradient="from-blue-500 to-cyan-500"
              change="+12%"
            />
            <StatsCard
              title="Published Sites"
              value={publishedProjects.length}
              icon={TrendingUp}
              gradient="from-green-500 to-emerald-500"
              change="+24%"
            />
            <StatsCard
              title="This Month"
              value={`${projects.length} sites`}
              icon={Clock}
              gradient="from-purple-500 to-pink-500"
              change={`+${projects.length} sites`}
            />
            <StatsCard
              title="AI Generations"
              value={projects.filter(p => p.ai_prompt).length}
              icon={Sparkles}
              gradient="from-orange-500 to-yellow-500"
              change="Ready to create"
            />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Projects */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
              <Link to={createPageUrl("Generate")}>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                  Create New
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
                    <div className="h-32 bg-gray-700 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-700 rounded mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onUpdate={loadProjects}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-effect rounded-2xl">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects yet</h3>
                <p className="text-gray-500 mb-6">Start building your first website with AI</p>
                <Link to={createPageUrl("Generate")}>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Your First Website
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}