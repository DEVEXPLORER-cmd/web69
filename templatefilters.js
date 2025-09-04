import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function TemplateFilters({ selectedCategory, onCategoryChange }) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "business", label: "Business" },
    { value: "portfolio", label: "Portfolio" },
    { value: "restaurant", label: "Restaurant" },
    { value: "agency", label: "Agency" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "startup", label: "Startup" }
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-gray-400" />
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="bg-white/5 border-white/20 text-white w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {categories.map((category) => (
            <SelectItem 
              key={category.value} 
              value={category.value} 
              className="text-white hover:bg-white/10"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}