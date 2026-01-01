import { TrendingUp, ArrowRight, Info } from "lucide-react";

interface PricingResultProps {
  currentPrice: number;
  recommendedPrice: number;
  expectedRevenue: number;
  revenueChange: number;
  planName: string;
}

export function PricingResult({ 
  currentPrice, 
  recommendedPrice, 
  expectedRevenue, 
  revenueChange,
  planName 
}: PricingResultProps) {
  const priceChange = recommendedPrice - currentPrice;
  const priceChangePercent = ((priceChange / currentPrice) * 100).toFixed(1);
  
  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Optimization Complete</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Pricing Recommendation for {planName}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Based on causal churn elasticity analysis using Double Machine Learning
        </p>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Price */}
        <div className="executive-card">
          <div className="space-y-3">
            <span className="metric-label">Current Price</span>
            <div className="metric-value text-muted-foreground/80">
              ${currentPrice.toFixed(0)}
              <span className="text-lg font-normal">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">Active pricing tier</p>
          </div>
        </div>

        {/* Recommended Price - Highlighted */}
        <div className="executive-card-elevated recommendation-highlight">
          <div className="space-y-3">
            <span className="metric-label text-accent">Recommended Price</span>
            <div className="metric-value text-foreground">
              ${recommendedPrice.toFixed(0)}
              <span className="text-lg font-normal">/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${priceChange >= 0 ? "text-success" : "text-destructive"}`}>
                {priceChange >= 0 ? "+" : ""}{priceChangePercent}%
              </span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {priceChange >= 0 ? "Increase" : "Decrease"} of ${Math.abs(priceChange).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Expected Revenue */}
        <div className="executive-card">
          <div className="space-y-3">
            <span className="metric-label">Expected Monthly Revenue</span>
            <div className="metric-value text-foreground">
              ${(expectedRevenue / 1000).toFixed(0)}K
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${revenueChange >= 0 ? "text-success" : "text-destructive"}`}>
                {revenueChange >= 0 ? "+" : ""}{revenueChange.toFixed(1)}%
              </span>
              <span className="text-sm text-muted-foreground">projected change</span>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
        <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p>
            This recommendation is derived from <span className="font-medium text-foreground">causal churn elasticity estimation</span> using 
            Double Machine Learning (DML). The model isolates the true causal effect of price changes on churn behavior, 
            controlling for confounding factors such as feature usage, customer segment, and acquisition channel.
          </p>
        </div>
      </div>
    </div>
  );
}
