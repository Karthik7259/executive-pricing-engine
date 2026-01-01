import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { AnalysisLevelSelector } from "@/components/AnalysisLevelSelector";
import { OptionSelector } from "@/components/OptionSelector";
import { PricingResult } from "@/components/PricingResult";

type AnalysisLevel = "plan" | "industry" | null;

// Mock pricing data
const pricingData: Record<string, { 
  currentPrice: number; 
  recommendedPrice: number; 
  expectedRevenue: number;
  revenueChange: number;
  planName: string;
}> = {
  basic: { currentPrice: 29, recommendedPrice: 34, expectedRevenue: 81600, revenueChange: 12.4, planName: "Basic Plan" },
  pro: { currentPrice: 79, recommendedPrice: 89, expectedRevenue: 721000, revenueChange: 8.7, planName: "Pro Plan" },
  enterprise: { currentPrice: 299, recommendedPrice: 349, expectedRevenue: 118660, revenueChange: 14.2, planName: "Enterprise Plan" },
  cybersecurity: { currentPrice: 149, recommendedPrice: 169, expectedRevenue: 202800, revenueChange: 11.3, planName: "Cybersecurity Segment" },
  devtools: { currentPrice: 49, recommendedPrice: 59, expectedRevenue: 224200, revenueChange: 15.8, planName: "DevTools Segment" },
  edtech: { currentPrice: 39, recommendedPrice: 44, expectedRevenue: 92400, revenueChange: 9.2, planName: "EdTech Segment" },
};

const Index = () => {
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalysisLevelChange = (level: AnalysisLevel) => {
    setAnalysisLevel(level);
    setSelectedOption(null);
    setShowResults(false);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setShowResults(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  const handleReset = () => {
    setAnalysisLevel(null);
    setSelectedOption(null);
    setShowResults(false);
  };

  const canGenerate = analysisLevel && selectedOption && !isGenerating;
  const resultData = selectedOption ? pricingData[selectedOption] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Optimize Pricing with Causal Intelligence
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Generate data-driven pricing recommendations powered by causal inference. 
            Our Double Machine Learning approach isolates true price-churn relationships 
            to maximize revenue without increasing customer attrition.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Selection Section */}
          {!showResults && (
            <div className="executive-card-elevated space-y-8">
              {/* Step 1: Analysis Level */}
              <AnalysisLevelSelector 
                selected={analysisLevel} 
                onSelect={handleAnalysisLevelChange} 
              />

              {/* Step 2: Option Selection */}
              {analysisLevel && (
                <div className="pt-6 border-t border-border/50">
                  <OptionSelector
                    analysisLevel={analysisLevel}
                    selected={selectedOption}
                    onSelect={handleOptionChange}
                  />
                </div>
              )}

              {/* Generate Button */}
              <div className="pt-6 border-t border-border/50">
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className="btn-primary-executive"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Generating Recommendation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Pricing Recommendation
                      </>
                    )}
                  </button>
                  
                  {!analysisLevel && (
                    <p className="text-sm text-muted-foreground">
                      Select an analysis level to continue
                    </p>
                  )}
                  {analysisLevel && !selectedOption && (
                    <p className="text-sm text-muted-foreground">
                      Select a {analysisLevel === "plan" ? "plan" : "industry"} to analyze
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResults && resultData && (
            <div className="space-y-6">
              <div className="executive-card-elevated">
                <PricingResult {...resultData} />
              </div>
              
              {/* Reset Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Run New Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-sm text-muted-foreground/70">
            Recommendations are based on historical transaction data and causal elasticity models. 
            Always validate pricing changes with controlled experiments before full deployment.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
