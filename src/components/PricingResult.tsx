import { TrendingUp, ArrowRight, Info, Zap, Target, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

interface PricingResultProps {
  currentPrice: number;
  recommendedPrice: number;
  expectedRevenue: number;
  revenueChange: number;
  planName: string;
}

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1000 }: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span className="number-animate">{prefix}{displayValue.toLocaleString()}{suffix}</span>;
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
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center fade-in-up">
        <div className="status-badge status-badge-success mb-5 pulse-glow">
          <TrendingUp className="w-4 h-4" />
          <span>Optimization Complete</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Pricing Recommendation
        </h2>
        <p className="text-lg text-muted-foreground">
          <span className="text-gradient-accent font-semibold">{planName}</span>
        </p>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Price */}
        <div className="executive-card fade-in-up stagger-1" style={{ animationFillMode: 'forwards' }}>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <span className="metric-label">Current Price</span>
            <div className="metric-value-muted">
              <AnimatedNumber value={currentPrice} prefix="$" />
              <span className="text-lg font-normal">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">Active pricing tier</p>
          </div>
        </div>

        {/* Recommended Price - Highlighted */}
        <div className="executive-card recommendation-card fade-in-up stagger-2" style={{ animationFillMode: 'forwards' }}>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <span className="metric-label text-accent">Recommended Price</span>
            <div className="metric-value-highlight">
              <AnimatedNumber value={recommendedPrice} prefix="$" duration={1200} />
              <span className="text-lg font-normal text-foreground/60">/mo</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                priceChange >= 0 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              }`}>
                {priceChange >= 0 ? "+" : ""}{priceChangePercent}%
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3" />
                {priceChange >= 0 ? "Increase" : "Decrease"} of ${Math.abs(priceChange).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Expected Revenue */}
        <div className="executive-card fade-in-up stagger-3" style={{ animationFillMode: 'forwards' }}>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <span className="metric-label">Expected Monthly Revenue</span>
            <div className="metric-value">
              <AnimatedNumber value={Math.round(expectedRevenue / 1000)} prefix="$" suffix="K" duration={1400} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                revenueChange >= 0 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              }`}>
                {revenueChange >= 0 ? "+" : ""}{revenueChange.toFixed(1)}%
              </span>
              <span className="text-sm text-muted-foreground">projected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-up stagger-4" style={{ animationFillMode: 'forwards' }}>
        {[
          { label: "Model Confidence", value: "94.2%", color: "text-success" },
          { label: "Churn Elasticity", value: "-0.42", color: "text-accent" },
          { label: "Sample Size", value: "12.4K", color: "text-foreground" },
          { label: "P-Value", value: "<0.001", color: "text-success" },
        ].map((metric) => (
          <div key={metric.label} className="bg-secondary/30 rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{metric.label}</p>
            <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Methodology Note */}
      <div className="flex items-start gap-4 p-5 rounded-xl bg-secondary/30 border border-border/30 fade-in-up stagger-5" style={{ animationFillMode: 'forwards' }}>
        <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
          <Info className="w-5 h-5 text-accent" />
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-1">Methodology</p>
          <p>
            This recommendation is derived from <span className="font-semibold text-foreground">causal churn elasticity estimation</span> using 
            Double Machine Learning (DML). The model isolates the true causal effect of price changes on churn behavior, 
            controlling for confounding factors including feature usage patterns, customer segment attributes, and acquisition channel dynamics.
          </p>
        </div>
      </div>
    </div>
  );
}
