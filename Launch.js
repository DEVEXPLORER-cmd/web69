import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Rocket,
  Globe,
  Link as LinkIcon,
  Share2,
  Download,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import LaunchProgress from "../components/launch/LaunchProgress";
import DeploymentOptions from "../components/launch/DeploymentOptions";

export default function Launch() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await Project.list("-updated_date");
    setProjects(data.filter(p => p.status !== 'published'));
  };

  const handleLaunch = async (deploymentConfig) => {
    setIsLaunching(true);
    setLaunchStep(0);

    try {
      // Simulate launch steps
      for (let i = 1; i <= 5; i++) {
        setLaunchStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Update project status
      await Project.update(selectedProject.id, {
        status: 'published',
        preview_url: `https://${deploymentConfig.subdomain}.web69.app`
      });

      setIsLaunching(false);
      setLaunchStep(0);
      setSelectedProject(null);
      loadProjects();
    } catch (error) {
      console.error("Launch error:", error);
      setIsLaunching(false);
      setLaunchStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Launch Center</h1>
            <p className="text-gray-400 mt-1">Deploy your websites to the world</p>
          </div>
        </div>

        {!isLaunching ? (
          !selectedProject ? (
            <div className="space-y-6">
              {/* Ready to Launch Projects */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Rocket className="w-5 h-5 text-orange-400" />
                    Ready to Launch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length > 0 ? (
                    <div className="grid gap-4">
                      {projects.map((project) => (
                        <div 
                          key={project.id}
                          className="glass-effect rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-white text-lg">{project.name}</h3>
                              <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{format(new Date(project.updated_date), "MMM d, yyyy")}</span>
                                </div>
                                <span className="capitalize">{project.website_type}</span>
                                <span className="capitalize">{project.status}</span>
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                              <Rocket className="w-4 h-4 mr-2" />
                              Launch
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">No projects ready</h3>
                      <p className="text-gray-500 mb-4">Create a website first to launch it</p>
                      <Button onClick={() => navigate(createPageUrl("Generate"))}>
                        Create Website
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <DeploymentOptions
              project={selectedProject}
              onLaunch={handleLaunch}
              onCancel={() => setSelectedProject(null)}
            />
          )
        ) : (
          <LaunchProgress 
            step={launchStep}
            projectName={selectedProject?.name}
          />
        )}
      </div>
    </div>
  );
}