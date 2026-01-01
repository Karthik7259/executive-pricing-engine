import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Causal Pricing Optimizer</h1>
              <p className="text-xs text-muted-foreground">Powered by Double ML</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Documentation
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              API
            </span>
            <div className="flex items-center gap-2 pl-6 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-sm font-medium text-accent">JD</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
