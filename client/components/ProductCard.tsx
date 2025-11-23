import { useState } from "react";
import { Product } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { ShoppingCart, Star, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useAppContext();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      retailerId: product.retailerId,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
      onClick={() => onSelect?.(product)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-100 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600">({product.rating})</span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary-600">
            ₹{product.price}
          </span>
          <span
            className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={product.stock === 0 || addedToCart}
          className={`w-full ${
            addedToCart
              ? "bg-green-600 hover:bg-green-600"
              : "bg-primary-600 hover:bg-primary-700"
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
