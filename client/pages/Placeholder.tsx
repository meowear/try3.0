import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function PlaceholderPage({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-600 mb-8">
            This page is coming soon. Continue exploring other features while we
            prepare this section.
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Go Back
          </Button>
        </div>
      </div>
    </>
  );
}
