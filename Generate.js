import React, { useState } from "react";
import { Project } from "@/entities/Project";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowLeft, 
  Wand2,
  Loader2,
  Globe,
  Palette,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import GenerationProgress from "../components/generate/GenerationProgress";
import AIPromptSuggestions from "../components/generate/AIPromptSuggestions";

export default function Generate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website_type: "business",
    color_scheme: "modern"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const websiteTypes = [
    { value: "business", label: "Business Website", icon: "🏢" },
    { value: "portfolio", label: "Portfolio", icon: "💼" },
    { value: "blog", label: "Blog", icon: "📝" },
    { value: "ecommerce", label: "E-commerce", icon: "🛒" },
    { value: "landing", label: "Landing Page", icon: "🚀" },
    { value: "restaurant", label: "Restaurant", icon: "🍕" },
    { value: "agency", label: "Agency", icon: "🎨" },
    { value: "startup", label: "Startup", icon: "💡" }
  ];

  const colorSchemes = [
    { value: "modern", label: "Modern", colors: ["#3B82F6", "#8B5CF6", "#EC4899"] },
    { value: "vibrant", label: "Vibrant", colors: ["#EF4444", "#F97316", "#EAB308"] },
    { value: "minimal", label: "Minimal", colors: ["#6B7280", "#374151", "#111827"] },
    { value: "dark", label: "Dark", colors: ["#1F2937", "#374151", "#4B5563"] },
    { value: "warm", label: "Warm", colors: ["#F59E0B", "#EF4444", "#DC2626"] },
    { value: "cool", label: "Cool", colors: ["#06B6D4", "#3B82F6", "#8B5CF6"] }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);

    try {
      // Step 1: Analyze requirements
      setGenerationStep(1);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 2: Generate structure
      setGenerationStep(2);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 3: Create content
      setGenerationStep(3);
      const prompt = `Create a complete, modern ${formData.website_type} website with the following requirements:

Project Name: ${formData.name}
Description: ${formData.description}
Color Scheme: ${formData.color_scheme}
Website Type: ${formData.website_type}

Generate a fully functional, responsive HTML website with embedded CSS. The website should be:
- Modern and professional
- Mobile-responsive
- Include relevant content for a ${formData.website_type}
- Use the ${formData.color_scheme} color scheme
- Include navigation, hero section, content sections, and footer
- Use modern CSS techniques like flexbox/grid
- Include hover effects and smooth transitions

Return the complete HTML with embedded CSS in the style tags.`;

      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            html_content: { type: "string" },
            css_content: { type: "string" },
            suggested_improvements: { 
              type: "array", 
              items: { type: "string" }
            }
          }
        }
      });

      // Step 4: Save project
      setGenerationStep(4);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const projectData = {
        ...formData,
        ai_prompt: formData.description,
        html_content: result.html_content,
        css_content: result.css_content,
        status: "draft"
      };

      await Project.create(projectData);
      
      setGenerationStep(5);
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate(createPageUrl("Dashboard"));
      
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold gradient-text">AI Website Generator</h1>
            <p className="text-gray-400 mt-1">Describe your vision and watch AI bring it to life</p>
          </div>
        </div>

        {!isGenerating ? (
          <div className="space-y-8">
            {/* Main Form */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <Input
                    placeholder="My Awesome Website"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe Your Website
                  </label>
                  <Textarea
                    placeholder="Describe what kind of website you want. Be specific about features, content, style, and any special requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 h-32"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website Type
                    </label>
                    <Select
                      value={formData.website_type}
                      onValueChange={(value) => setFormData({...formData, website_type: value})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {websiteTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-white">
                            <span className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              {type.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color Scheme
                    </label>
                    <Select
                      value={formData.color_scheme}
                      onValueChange={(value) => setFormData({...formData, color_scheme: value})}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {colorSchemes.map((scheme) => (
                          <SelectItem key={scheme.value} value={scheme.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {scheme.colors.map((color, i) => (
                                  <div 
                                    key={i}
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              {scheme.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Prompt Suggestions */}
            <AIPromptSuggestions 
              onSuggestionClick={(suggestion) => 
                setFormData({...formData, description: suggestion})
              }
            />

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={!formData.name || !formData.description || isGenerating}
                size="lg"
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl glow-effect"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Generate My Website
              </Button>
            </div>
          </div>
        ) : (
          <GenerationProgress step={generationStep} projectName={formData.name} />
        )}
      </div>
    </div>
  );
}