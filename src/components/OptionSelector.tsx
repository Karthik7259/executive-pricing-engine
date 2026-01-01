import { Sparkles, Rocket, Crown, Shield, Code2, GraduationCap } from "lucide-react";

type AnalysisLevel = "plan" | "industry";

interface OptionSelectorProps {
  analysisLevel: AnalysisLevel;
  selected: string | null;
  onSelect: (option: string) => void;
}

const planOptions = [
  { id: "basic", title: "Basic", description: "Entry-level tier", icon: Sparkles, users: "2.4K subscribers" },
  { id: "pro", title: "Pro", description: "Professional tier", icon: Rocket, users: "8.1K subscribers" },
  { id: "enterprise", title: "Enterprise", description: "Enterprise tier", icon: Crown, users: "340 subscribers" },
];

const industryOptions = [
  { id: "cybersecurity", title: "Cybersecurity", description: "Security & compliance", icon: Shield, users: "1.2K accounts" },
  { id: "devtools", title: "DevTools", description: "Developer platforms", icon: Code2, users: "3.8K accounts" },
  { id: "edtech", title: "EdTech", description: "Education technology", icon: GraduationCap, users: "2.1K accounts" },
];

export function OptionSelector({ analysisLevel, selected, onSelect }: OptionSelectorProps) {
  const options = analysisLevel === "plan" ? planOptions : industryOptions;
  const title = analysisLevel === "plan" ? "Select Plan" : "Select Industry";
  const subtitle = analysisLevel === "plan" 
    ? "Choose a subscription tier to analyze" 
    : "Choose an industry vertical to analyze";

  return (
    <div className="space-y-4 fade-in-up">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = selected === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`selection-card text-left ${isActive ? "active" : ""}`}
            >
              <div className="flex flex-col items-start gap-3">
                <div className={`p-3 rounded-lg transition-colors ${
                  isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">{option.users}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
