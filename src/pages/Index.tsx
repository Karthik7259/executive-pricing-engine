import { useState } from "react";
import { Sparkles, RotateCcw, ArrowRight } from "lucide-react";
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
  fintech: { currentPrice: 199, recommendedPrice: 229, expectedRevenue: 618300, revenueChange: 13.1, planName: "FinTech Segment" },
  healthtech: { currentPrice: 129, recommendedPrice: 149, expectedRevenue: 283100, revenueChange: 10.6, planName: "HealthTech Segment" },
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
    }, 2000);
  };

  const handleReset = () => {
    setAnalysisLevel(null);
    setSelectedOption(null);
    setShowResults(false);
  };

  const canGenerate = analysisLevel && selectedOption && !isGenerating;
  const resultData = selectedOption ? pricingData[selectedOption] : null;

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Header />
      
      <main className="container mx-auto px-6 py-12 md:py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-14 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Causal AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight text-balance">
            Optimize Pricing with
            <span className="text-gradient-accent"> Causal Intelligence</span>
          </h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
            Generate data-driven pricing recommendations powered by causal inference. 
            Our Double Machine Learning approach isolates true price-churn relationships 
            to maximize revenue without increasing customer attrition.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Selection Section */}
          {!showResults && (
            <div className={`executive-card-elevated space-y-10 ${canGenerate ? 'active' : ''}`}>
              {/* Step 1: Analysis Level */}
              <AnalysisLevelSelector 
                selected={analysisLevel} 
                onSelect={handleAnalysisLevelChange} 
              />

              {/* Step 2: Option Selection */}
              {analysisLevel && (
                <div className="pt-8 border-t border-border/30">
                  <OptionSelector
                    analysisLevel={analysisLevel}
                    selected={selectedOption}
                    onSelect={handleOptionChange}
                  />
                </div>
              )}

              {/* Generate Button */}
              <div className="pt-8 border-t border-border/30">
                <div className="flex flex-col items-center gap-5">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className="btn-primary-executive group"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Analyzing Churn Elasticity...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate Pricing Recommendation</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      </>
                    )}
                  </button>
                  
                  {!analysisLevel && (
                    <p className="text-sm text-muted-foreground">
                      Select an analysis level to begin
                    </p>
                  )}
                  {analysisLevel && !selectedOption && (
                    <p className="text-sm text-muted-foreground">
                      Select a {analysisLevel === "plan" ? "plan tier" : "industry segment"} to analyze
                    </p>
                  )}
                  {canGenerate && (
                    <p className="text-sm text-success font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Ready to generate recommendation
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResults && resultData && (
            <div className="space-y-8 slide-in-bottom">
              <div className="executive-card-elevated active">
                <PricingResult {...resultData} />
              </div>
              
              {/* Reset Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="btn-secondary-executive"
                >
                  <RotateCcw className="w-4 h-4" />
                  Run New Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="max-w-2xl mx-auto mt-20 text-center fade-in-up">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-8" />
          <p className="text-sm text-muted-foreground/60 leading-relaxed">
            Recommendations are based on historical transaction data and causal elasticity models. 
            Always validate pricing changes with controlled experiments before full deployment.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
