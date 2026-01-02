import { BarChart3, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface PricingResultProps {
  basePrice: number;
  optimizedPrice: number;
  expectedRevenue: number;
}

/* ======================
   Animated INR (SAFE)
====================== */
function AnimatedINR({ value }: { value: number }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame: number;
    let start = 0;

    const animate = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / 800, 1);
      setDisplayValue(Math.floor(progress * safeValue));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [safeValue]);

  return (
    <span>
      {new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(displayValue)}
    </span>
  );
}

/* ======================
   Pricing Result
====================== */
export function PricingResult({
  basePrice,
  optimizedPrice,
  expectedRevenue,
}: PricingResultProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Current Price */}
      <div className="executive-card">
        <BarChart3 className="w-5 h-5 mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Current Price</p>
        <p className="text-xl font-semibold">
          <AnimatedINR value={basePrice} /> /mo
        </p>
      </div>

      {/* Recommended Price */}
      <div className="executive-card recommendation-card">
        <Target className="w-5 h-5 mb-2 text-accent" />
        <p className="text-sm text-muted-foreground">Recommended Price</p>
        <p className="text-xl font-semibold">
          <AnimatedINR value={optimizedPrice} /> /mo
        </p>
      </div>

      {/* Expected Revenue */}
      <div className="executive-card">
        <Zap className="w-5 h-5 mb-2 text-success" />
        <p className="text-sm text-muted-foreground">Expected Revenue</p>
        <p className="text-xl font-semibold">
          <AnimatedINR value={expectedRevenue} />
        </p>
      </div>

    </div>
  );
}
