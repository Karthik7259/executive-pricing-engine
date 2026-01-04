import { Sparkles, Rocket, Crown, Shield, Code2, GraduationCap, Landmark, HeartPulse, Check } from "lucide-react";

type AnalysisLevel = "plan" | "industry";

interface OptionSelectorProps {
  analysisLevel: AnalysisLevel;
  selected: string | null;
  onSelect: (option: string) => void;
}

const planOptions = [
  { id: "basic", title: "Basic", description: "Entry-level tier", icon: Sparkles, users: "", color: "from-blue-500 to-cyan-500" },
  { id: "pro", title: "Pro", description: "Professional tier", icon: Rocket, users: "", color: "from-violet-500 to-purple-500" },
  { id: "enterprise", title: "Enterprise", description: "Enterprise tier", icon: Crown, users: "", color: "from-amber-500 to-orange-500" },
];

const industryOptions = [
  { id: "cybersecurity", title: "Cybersecurity", description: "Security & compliance", icon: Shield, users: "", color: "from-red-500 to-rose-500" },
  { id: "devtools", title: "DevTools", description: "Developer platforms", icon: Code2, users: "", color: "from-emerald-500 to-teal-500" },
  { id: "edtech", title: "EdTech", description: "Education technology", icon: GraduationCap, users: "", color: "from-blue-500 to-indigo-500" },
  { id: "fintech", title: "FinTech", description: "Financial services", icon: Landmark, users: "", color: "from-amber-500 to-yellow-500" },
  { id: "healthtech", title: "HealthTech", description: "Healthcare solutions", icon: HeartPulse, users: "", color: "from-pink-500 to-rose-500" },
];

export function OptionSelector({ analysisLevel, selected, onSelect }: OptionSelectorProps) {
  const options = analysisLevel === "plan" ? planOptions : industryOptions;
  const title = analysisLevel === "plan" ? "Select Plan" : "Select Industry";
  const subtitle = analysisLevel === "plan" 
    ? "Choose a subscription tier to analyze" 
    : "Choose an industry vertical to analyze";

  return (
    <div className="space-y-5 fade-in-up">
      <div className="flex items-center gap-4">
        <div className={`step-number ${selected ? "step-number-complete" : "step-number-active"}`}>
          {selected ? <Check className="w-4 h-4" /> : "2"}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      <div className={`grid grid-cols-1 ${analysisLevel === "plan" ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-5"} gap-4 pl-12`}>
        {options.map((option, index) => {
          const Icon = option.icon;
          const isActive = selected === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`selection-card text-left fade-in-up stagger-${index + 1}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col items-start gap-3">
                <div className={`icon-container ${isActive ? "icon-container-active" : "icon-container-default"}`}
                     style={isActive ? { background: `linear-gradient(135deg, var(--tw-gradient-stops))` } : undefined}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{option.title}</h3>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-1 flex-1 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${option.color} transition-all duration-500`}
                        style={{ width: isActive ? '100%' : '30%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground/70 font-medium">{option.users}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
