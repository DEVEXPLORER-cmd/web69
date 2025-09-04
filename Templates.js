import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Star, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import TemplateCard from "../components/templates/TemplateCard";
import TemplateFilters from "../components/templates/TemplateFilters";

export default function Templates() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      id: "modern-business",
      name: "Modern Business",
      category: "business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      description: "Clean, professional business website with CTA sections",
      tags: ["responsive", "modern", "corporate"],
      rating: 4.8,
      downloads: 1200
    },
    {
      id: "creative-portfolio", 
      name: "Creative Portfolio",
      category: "portfolio",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      description: "Showcase your work with this stunning portfolio template",
      tags: ["creative", "gallery", "minimal"],
      rating: 4.9,
      downloads: 890
    },
    {
      id: "restaurant-modern",
      name: "Restaurant Deluxe", 
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      description: "Beautiful restaurant site with menu and reservations",
      tags: ["food", "booking", "gallery"],
      rating: 4.7,
      downloads: 650
    },
    {
      id: "agency-bold",
      name: "Agency Pro",
      category: "agency", 
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      description: "Bold agency website with case studies and team showcase",
      tags: ["bold", "creative", "team"],
      rating: 4.6,
      downloads: 780
    },
    {
      id: "ecommerce-minimal",
      name: "Shop Minimal",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", 
      description: "Clean e-commerce design focused on products",
      tags: ["shop", "minimal", "products"],
      rating: 4.5,
      downloads: 920
    },
    {
      id: "startup-tech",
      name: "Startup Launch",
      category: "startup",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      description: "High-converting startup landing page template", 
      tags: ["startup", "saas", "conversion"],
      rating: 4.9,
      downloads: 1100
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-3xl font-bold gradient-text">Template Gallery</h1>
            <p className="text-gray-400 mt-1">Choose from professionally designed templates</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 pl-10"
            />
          </div>
          <TemplateFilters 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}