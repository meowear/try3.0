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
  wholesalePrice: string;
  retailPrice: string;
  stock: string;
  description: string;
  image: string;
}

export default function WholesalerAddProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    wholesalePrice: "",
    retailPrice: "",
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
    if (!formData.wholesalePrice || isNaN(Number(formData.wholesalePrice)))
      newErrors.wholesalePrice = "Valid wholesale price is required";
    if (!formData.retailPrice || isNaN(Number(formData.retailPrice)))
      newErrors.retailPrice = "Valid retail price is required";
    if (Number(formData.wholesalePrice) >= Number(formData.retailPrice))
      newErrors.retailPrice =
        "Retail price must be higher than wholesale price";
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
      wholesalePrice: "",
      retailPrice: "",
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
              onClick={() => navigate("/wholesaler")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Manage Wholesale Inventory
            </h1>
            <p className="text-slate-600">
              Add products and set pricing for retailers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Add New Wholesale Product
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
                      placeholder="e.g., Premium Basmati Rice"
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

                  {/* Wholesale and Retail Prices */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Wholesale Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.wholesalePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            wholesalePrice: e.target.value,
                          })
                        }
                        placeholder="150"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.wholesalePrice
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      />
                      {errors.wholesalePrice && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.wholesalePrice}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Retail Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.retailPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            retailPrice: e.target.value,
                          })
                        }
                        placeholder="180"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.retailPrice
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      />
                      {errors.retailPrice && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.retailPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock Quantity (units)
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="500"
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
                      placeholder="Describe your wholesale product..."
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
                    {products.map((product, index) => {
                      const margin = (
                        ((Number(product.retailPrice) -
                          Number(product.wholesalePrice)) /
                          Number(product.wholesalePrice)) *
                        100
                      ).toFixed(1);
                      return (
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
                          <div className="space-y-1 text-xs mb-2">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Wholesale:</span>
                              <span className="font-semibold text-slate-900">
                                ₹{product.wholesalePrice}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Retail:</span>
                              <span className="font-semibold text-slate-900">
                                ₹{product.retailPrice}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Margin:</span>
                              <span className="font-semibold text-green-600">
                                {margin}%
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-600">
                            Stock: {product.stock}
                          </div>
                        </div>
                      );
                    })}
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
                      navigate("/wholesaler");
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
