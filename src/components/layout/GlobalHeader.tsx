import { Link } from 'react-router-dom';
import { RegionSwitcher } from './RegionSwitcher';
import { Button } from '@/components/ui/button';

export function GlobalHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-steel/10">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-heading font-bold text-xl tracking-tighter text-hull flex items-center gap-2">
            {/* Logo placeholder */}
            <div className="w-6 h-6 bg-hull rounded-sm"></div>
            MMG
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-hull">
            <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
            <Link to="/network" className="hover:text-accent transition-colors">Network</Link>
            <Link to="/fleet" className="hover:text-accent transition-colors">Fleet</Link>
            <Link to="/sustainability" className="hover:text-accent transition-colors">Sustainability</Link>
            <Link to="/insights" className="hover:text-accent transition-colors">Insights</Link>
            <Link to="/careers" className="hover:text-accent transition-colors">Careers</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <RegionSwitcher />
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-sm">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
