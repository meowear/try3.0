import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, ThumbsUp } from "lucide-react";

interface Feedback {
  id: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  recommend: boolean;
}

const mockFeedback: Feedback[] = [
  {
    id: "1",
    productName: "Fresh Apples",
    rating: 5,
    title: "Excellent quality and taste",
    comment:
      "The apples were incredibly fresh and sweet. Great quality for the price. Highly recommend!",
    date: "2024-01-15",
    helpful: 12,
    recommend: true,
  },
  {
    id: "2",
    productName: "Whole Wheat Bread",
    rating: 4,
    title: "Good bread but could be fresher",
    comment:
      "Tasty bread with good texture, though it could have been delivered fresher. Still a good purchase.",
    date: "2024-01-14",
    helpful: 8,
    recommend: true,
  },
  {
    id: "3",
    productName: "Organic Carrots",
    rating: 5,
    title: "Perfect for cooking",
    comment:
      "Fresh, organic carrots that are perfect for cooking. No pesticides and great taste!",
    date: "2024-01-13",
    helpful: 15,
    recommend: true,
  },
];

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(mockFeedback);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">(
    "recent",
  );

  const [formData, setFormData] = useState({
    productName: "",
    rating: 5,
    title: "",
    comment: "",
    recommend: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim())
      newErrors.productName = "Product selection is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required";
    if (formData.comment.length < 10)
      newErrors.comment = "Comment must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newFeedback: Feedback = {
      id: Math.random().toString(),
      productName: formData.productName,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      recommend: formData.recommend,
    };

    setFeedbackList([newFeedback, ...feedbackList]);

    // Reset form
    setFormData({
      productName: "",
      rating: 5,
      title: "",
      comment: "",
      recommend: true,
    });

    setShowForm(false);
  };

  const sortedFeedback = [...feedbackList].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const averageRating = (
    feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length
  ).toFixed(1);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Feedback & Reviews
            </h1>
            <p className="text-slate-600">
              Share your experience and read reviews from other customers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feedback Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Write Review Button */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Share Your Feedback
                  </h2>
                  {!showForm && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Write Review
                    </Button>
                  )}
                </div>

                {showForm && (
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Product
                      </label>
                      <input
                        type="text"
                        value={formData.productName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productName: e.target.value,
                          })
                        }
                        placeholder="Select or type product name"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.productName
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      />
                      {errors.productName && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.productName}
                        </p>
                      )}
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, rating: star })
                            }
                            className="focus:outline-none transition"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= formData.rating
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Summarize your experience"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                          errors.title ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.title && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData({ ...formData, comment: e.target.value })
                        }
                        placeholder="Share details about your experience"
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none ${
                          errors.comment ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.comment && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.comment}
                        </p>
                      )}
                    </div>

                    {/* Recommend */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="recommend"
                        checked={formData.recommend}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recommend: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor="recommend"
                        className="text-sm text-slate-700"
                      >
                        I would recommend this product
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-primary-600 hover:bg-primary-700"
                      >
                        Submit Review
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </Card>

              {/* Sort Options */}
              <div className="flex gap-2">
                {(
                  [
                    { value: "recent" as const, label: "Most Recent" },
                    { value: "helpful" as const, label: "Most Helpful" },
                    { value: "rating" as const, label: "Highest Rated" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-lg transition ${
                      sortBy === option.value
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                {sortedFeedback.map((feedback) => (
                  <Card key={feedback.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {feedback.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {feedback.productName}
                        </p>
                      </div>
                      <span className="text-xs text-slate-600">
                        {new Date(feedback.date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {feedback.rating}/5
                      </span>
                      {feedback.recommend && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>

                    {/* Comment */}
                    <p className="text-slate-700 mb-4">{feedback.comment}</p>

                    {/* Helpful Button */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 transition">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({feedback.helpful})
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - Stats */}
            <div className="space-y-6">
              {/* Rating Summary */}
              <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Rating Summary
                </h2>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {averageRating}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(Number(averageRating))
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Based on {feedbackList.length} reviews
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = feedbackList.filter(
                      (f) => f.rating === rating,
                    ).length;
                    const percentage =
                      feedbackList.length > 0
                        ? ((count / feedbackList.length) * 100).toFixed(0)
                        : 0;

                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 w-8">
                          {rating}★
                        </span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 w-8 text-right">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Customer Sentiment
                </h2>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Recommended</p>
                    <p className="text-2xl font-bold text-green-600">
                      {feedbackList.filter((f) => f.recommend).length}/
                      {feedbackList.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">
                      Average Helpfulness
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(
                        feedbackList.reduce((sum, f) => sum + f.helpful, 0) /
                        feedbackList.length
                      ).toFixed(1)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
