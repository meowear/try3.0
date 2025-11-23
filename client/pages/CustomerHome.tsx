import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { products, retailers } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerHome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Live MART
            </h1>
            <p className="text-lg mb-8 text-primary-100">
              Your one-stop shop for fresh groceries and essentials delivered to
              your doorstep
            </p>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <Button className="bg-white text-primary-600 hover:bg-slate-100">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Retailers Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Nearby Retailers
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {retailers.map((retailer) => (
              <Card
                key={retailer.id}
                className="p-5 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {retailer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      {retailer.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-slate-900">
                    {retailer.rating}
                  </span>
                  <span className="text-slate-600">
                    • {retailer.distance} km
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filter Panel */}
            <aside className="lg:col-span-1">
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </aside>

            {/* Products Grid */}
            <main className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-slate-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={() => navigate(`/product/${product.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">
                    No products found matching your filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(null);
                      setPriceRange([0, 1000]);
                    }}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
