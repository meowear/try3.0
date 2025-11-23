import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";
import { categories } from "@/lib/mockData";

interface ProductForm {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
}

export default function RetailerAddProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Valid price is required";
    if (!formData.stock || isNaN(Number(formData.stock)))
      newErrors.stock = "Valid stock quantity is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setProducts([...products, { ...formData }]);
    setSuccessMessage(`${formData.name} added successfully!`);

    // Reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/retailer")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Manage Inventory
            </h1>
            <p className="text-slate-600">
              Add and manage products for your store
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Add New Product
                </h2>

                {successMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">{successMessage}</p>
                  </div>
                )}

                <form onSubmit={handleAddProduct} className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Fresh Apples"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                        errors.name ? "border-red-500" : "border-slate-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                        errors.category ? "border-red-500" : "border-slate-300"
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Price and Stock */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="100"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.price ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.price && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        placeholder="50"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.stock ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.stock && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your product..."
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none ${
                        errors.description
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </Button>
                </form>
              </Card>
            </div>

            {/* Products List */}
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Added Products ({products.length})
                </h2>

                {products.length > 0 ? (
                  <div className="space-y-3">
                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-900 line-clamp-2">
                            {product.name}
                          </h3>
                          <button
                            onClick={() => removeProduct(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">
                          {product.category}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-primary-600 font-semibold">
                            ₹{product.price}
                          </span>
                          <span className="text-slate-600">
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-center py-8">
                    No products added yet
                  </p>
                )}

                {products.length > 0 && (
                  <Button
                    onClick={() => {
                      setProducts([]);
                      navigate("/retailer");
                    }}
                    className="w-full mt-4 bg-primary-600 hover:bg-primary-700"
                  >
                    Save All Products
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
