import { Building2, Layers, Check } from "lucide-react";

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
    detail: "Analyze Basic, Pro, Enterprise",
  },
  {
    id: "industry" as const,
    title: "Industry Segment",
    description: "Analyze pricing by vertical market segment",
    icon: Building2,
    detail: "5 industry verticals",
  },
];

export function AnalysisLevelSelector({ selected, onSelect }: AnalysisLevelSelectorProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className={`step-number ${selected ? "step-number-complete" : "step-number-active"}`}>
          {selected ? <Check className="w-4 h-4" /> : "1"}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analysis Level</h2>
          <p className="text-sm text-muted-foreground">
            Choose the dimension for pricing optimization
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-12">
        {levels.map((level, index) => {
          const Icon = level.icon;
          const isActive = selected === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => onSelect(level.id)}
              className={`selection-card text-left fade-in-up stagger-${index + 1}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-4">
                <div className={`icon-container ${isActive ? "icon-container-active" : "icon-container-default"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{level.title}</h3>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2 font-medium">{level.detail}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
