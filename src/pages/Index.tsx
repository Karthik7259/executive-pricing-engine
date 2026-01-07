import { useState } from "react";
import { Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { AnalysisLevelSelector } from "@/components/AnalysisLevelSelector";
import { OptionSelector } from "@/components/OptionSelector";
import { PricingResult } from "@/components/PricingResult";

type AnalysisLevel = "plan" | "industry" | null;

interface PricingResponse {
  basePrice: number;
  optimizedPrice: number;
  baseRevenue: number;
  expectedRevenue: number;
}

const Index = () => {
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<PricingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisLevelChange = (level: AnalysisLevel) => {
    setAnalysisLevel(level);
    setSelectedOption(null);
    setShowResults(false);
    setResult(null);
    setError(null);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setShowResults(false);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!analysisLevel || !selectedOption) return;

    setIsGenerating(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch("https://pome-backend.onrender.com/optimize-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisLevel,       // "plan" | "industry"
          selection: selectedOption, // "pro" | "fintech" etc.
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "API error");
      }

      const data: PricingResponse = await response.json();

      // ✅ Safety check
      if (
        !Number.isFinite(data.basePrice) ||
        !Number.isFinite(data.optimizedPrice) ||
        !Number.isFinite(data.baseRevenue) ||
        !Number.isFinite(data.expectedRevenue)
      ) {
        throw new Error("Invalid pricing data received");
      }

      setResult(data);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch pricing recommendation");
      setResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setAnalysisLevel(null);
    setSelectedOption(null);
    setShowResults(false);
    setResult(null);
    setError(null);
  };

  const canGenerate = Boolean(analysisLevel && selectedOption && !isGenerating);

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Header />

      <main className="container mx-auto px-6 py-12 md:py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Causal AI
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Optimize Pricing with
            <span className="text-gradient-accent"> Causal Intelligence</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate data-driven pricing recommendations using causal inference
            and Double Machine Learning to maximize revenue safely.
          </p>
        </div>

        {/* Selection Section */}
        {!showResults && (
          <div className="max-w-5xl mx-auto executive-card-elevated space-y-10">
            <AnalysisLevelSelector
              selected={analysisLevel}
              onSelect={handleAnalysisLevelChange}
            />

            {analysisLevel && (
              <div className="pt-8 border-t border-border/30">
                <OptionSelector
                  analysisLevel={analysisLevel}
                  selected={selectedOption}
                  onSelect={handleOptionChange}
                />
              </div>
            )}

            <div className="pt-8 border-t border-border/30 flex flex-col items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="btn-primary-executive group"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Analyzing churn elasticity...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Pricing Recommendation</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </>
                )}
              </button>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && result && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="executive-card-elevated active">
              <PricingResult
                basePrice={result.basePrice}
                optimizedPrice={result.optimizedPrice}
                baseRevenue={result.baseRevenue}
                expectedRevenue={result.expectedRevenue}
              />
            </div>

            <div className="flex justify-center">
              <button onClick={handleReset} className="btn-secondary-executive">
                <RotateCcw className="w-4 h-4" />
                Run New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
