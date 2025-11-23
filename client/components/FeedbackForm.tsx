import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, X } from "lucide-react";

interface FeedbackFormProps {
  productName: string;
  onSubmit: (feedback: FeedbackData) => void;
  onClose: () => void;
}

export interface FeedbackData {
  rating: number;
  title: string;
  comment: string;
  recommend: boolean;
}

export function FeedbackForm({
  productName,
  onSubmit,
  onClose,
}: FeedbackFormProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit({
      rating,
      title,
      comment,
      recommend,
    });

    // Reset form
    setRating(5);
    setTitle("");
    setComment("");
    setRecommend(true);
  };

  return (
    <Card className="fixed inset-0 lg:inset-auto lg:bottom-4 lg:right-4 lg:w-96 z-50 max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Share Your Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <p className="text-sm text-slate-600 mb-2">Product</p>
            <p className="font-semibold text-slate-900">{productName}</p>
          </div>

          {/* Rating */}
          <div>
            <p className="text-sm text-slate-600 mb-3">Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm text-slate-600 block mb-2">
              Review Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm text-slate-600 block mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your detailed experience with this product"
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm resize-none"
            />
          </div>

          {/* Recommend */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={recommend}
                onChange={(e) => setRecommend(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-700">
                I would recommend this product
              </span>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700"
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </Card>
  );
}
