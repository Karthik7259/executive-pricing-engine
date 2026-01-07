import { Activity, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export function Header() {
  return (
    <header className="border-b border-border/30 bg-card/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg tracking-tight">Causal Pricing Optimizer</h1>
              <p className="text-xs text-muted-foreground font-medium">Enterprise Edition</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
              activeClassName="text-foreground bg-secondary/50"
            >
              Home
            </NavLink>

            <NavLink
              to="/simulate-price-change"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
              activeClassName="text-foreground bg-secondary/50"
            >
              Simulate Price Change
            </NavLink>

            <NavLink
              to="/graphs"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
              activeClassName="text-foreground bg-secondary/50"
            >
              Graphs
            </NavLink>

           
            
            <div className="w-px h-6 bg-border mx-3" />
            
            <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-secondary/50 transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
                <span className="text-sm font-semibold text-white">JD</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
