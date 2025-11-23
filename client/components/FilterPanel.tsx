import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { categories } from "@/lib/mockData";

interface FilterPanelProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FilterPanel({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    sort: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleClearFilters = () => {
    onCategoryChange(null);
    onPriceChange([0, 1000]);
    onSortChange("relevance");
  };

  const hasActiveFilters =
    selectedCategory || priceRange[0] !== 0 || priceRange[1] !== 1000;

  return (
    <div className="space-y-4">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card className="p-4 bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary-900">
              Filters Applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-primary-600 hover:text-primary-700"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => onCategoryChange(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                <span>
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
                <button
                  onClick={() => onPriceChange([0, 1000])}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Category Filter */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("category")}
          className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
        >
          <span className="font-semibold text-slate-900">Category</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-600 transition transform ${
              expandedSections.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="p-4 space-y-2 border-t border-slate-200">
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full text-left px-3 py-2 rounded transition ${
                selectedCategory === null
                  ? "bg-primary-100 text-primary-700 font-medium"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  selectedCategory === category
                    ? "bg-primary-100 text-primary-700 font-medium"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Price Filter */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("price")}
          className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
        >
          <span className="font-semibold text-slate-900">Price Range</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-600 transition transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="p-4 space-y-4 border-t border-slate-200">
            <div className="space-y-2">
              <label className="text-sm text-slate-700">
                Min Price: ₹{priceRange[0]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  onPriceChange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">
                Max Price: ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Sort Filter */}
      <Card className="overflow-hidden">
        <button
          onClick={() => toggleSection("sort")}
          className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
        >
          <span className="font-semibold text-slate-900">Sort By</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-600 transition transform ${
              expandedSections.sort ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.sort && (
          <div className="p-4 space-y-2 border-t border-slate-200">
            {[
              { value: "relevance", label: "Relevance" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "rating", label: "Rating" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  sortBy === option.value
                    ? "bg-primary-100 text-primary-700 font-medium"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
