import { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { AnalysisLevelSelector } from "@/components/AnalysisLevelSelector";
import { OptionSelector } from "@/components/OptionSelector";

type AnalysisLevel = "plan" | "industry"  | null;

interface SimulateResponse {
  expectedChurnPct: number;
  baseChurnPct?: number;
}

const PriceChange = () => {
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [priceChangePct, setPriceChangePct] = useState<number>(5);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisLevelChange = (level: AnalysisLevel) => {
    setAnalysisLevel(level);
    setSelectedOption(null);
    setResult(null);
    setError(null);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setResult(null);
    setError(null);
  };

  const handleSimulate = async () => {
    if (!analysisLevel || !selectedOption) return;

    setIsSimulating(true);
    setError(null);
    setResult(null);

    try {
      const pct = Math.max(-10, Math.min(10, priceChangePct));

      const body: any = {
        analysisLevel,
        selection: selectedOption,
        priceChangePct: pct,
      };

      const res = await fetch("https://pome-backend.onrender.com/simulate-price-change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `API error: ${res.status}`);
      }

      const data: SimulateResponse = await res.json();
      const expected = Number(data?.expectedChurnPct);
      if (!Number.isFinite(expected)) throw new Error("Response missing expectedChurnPct");
      setResult(expected);
    } catch (err: any) {
      setError(err.message || "Failed to simulate price change");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    setAnalysisLevel(null);
    setSelectedOption(null);
    setPriceChangePct(5);
    setResult(null);
    setError(null);
  };

    const canSimulate = Boolean(analysisLevel && selectedOption && !isSimulating);

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Header />

      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Simulate Price Change</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Analyze how a price change affects churn, revenue and elasticity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto executive-card-elevated space-y-8">
          <AnalysisLevelSelector
            selected={analysisLevel}
            onSelect={handleAnalysisLevelChange}
          />

          {analysisLevel && (
            <div className="pt-6 border-t border-border/30">
              <OptionSelector
                analysisLevel={analysisLevel}
                selected={selectedOption}
                onSelect={handleOptionChange}
              />
            </div>
          )}

          {analysisLevel && (
            <div className="pt-6 border-t border-border/30 space-y-4">

              {/* Price slider (shown for all analysis levels) */}
              <div>
                <label className="text-sm text-muted-foreground">Price Change (%)</label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={priceChangePct}
                    onChange={(e) => setPriceChangePct(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="w-20 text-right font-medium">{priceChangePct}%</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Negative values decrease price, positive increase.</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSimulate}
                  disabled={!canSimulate}
                  className="btn-primary-executive group"
                >
                  {isSimulating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Simulate</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    </>
                  )}
                </button>

                <button onClick={handleReset} className="btn-secondary-executive">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

              {result !== null && (
                <div className="bg-card p-6 rounded-md text-center">
                  <h3 className="font-semibold mb-2">Expected Churn Probability</h3>
                  <p className="text-2xl font-bold text-accent">{result.toFixed(3)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PriceChange;
