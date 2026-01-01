import { Building2, Layers } from "lucide-react";

type AnalysisLevel = "plan" | "industry" | null;

interface AnalysisLevelSelectorProps {
  selected: AnalysisLevel;
  onSelect: (level: AnalysisLevel) => void;
}

const levels = [
  {
    id: "plan" as const,
    title: "Plan Level",
    description: "Optimize pricing across your subscription tiers",
    icon: Layers,
  },
  {
    id: "industry" as const,
    title: "Industry Segment",
    description: "Analyze pricing by vertical market segment",
    icon: Building2,
  },
];

export function AnalysisLevelSelector({ selected, onSelect }: AnalysisLevelSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Analysis Level</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the dimension for pricing optimization
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levels.map((level) => {
          const Icon = level.icon;
          const isActive = selected === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => onSelect(level.id)}
              className={`selection-card text-left ${isActive ? "active" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg transition-colors ${
                  isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{level.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
