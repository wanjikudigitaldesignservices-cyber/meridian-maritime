import { Link } from 'react-router-dom';
import { RegionSwitcher } from './RegionSwitcher';
import { Button } from '@/components/ui/button';
import type { Region } from '@/lib/regions';

export function RegionHeader({ region }: { region: Region }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-steel/10">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={`/${region.slug}`} className="font-heading font-bold text-xl tracking-tighter flex items-center gap-2 text-hull">
            {/* Logo placeholder */}
            <div className="w-6 h-6 bg-accent rounded-sm"></div>
            {region.entityName}
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-hull">
            <Link to={`/${region.slug}/services`} className="hover:text-accent transition-colors">Services</Link>
            <Link to={`/${region.slug}/ports`} className="hover:text-accent transition-colors">Ports</Link>
            <Link to={`/${region.slug}/insights`} className="hover:text-accent transition-colors">Insights</Link>
            <Link to={`/${region.slug}/careers`} className="hover:text-accent transition-colors">Careers</Link>
            <Link to={`/${region.slug}/about`} className="hover:text-accent transition-colors">About</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <RegionSwitcher />
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-sm bg-accent hover:bg-accent/90 text-white border-none">
            <Link to={`/${region.slug}/quote`}>Get a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
