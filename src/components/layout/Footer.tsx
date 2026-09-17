import { Link } from 'react-router-dom';
import { REGIONS, SERVICE_TAXONOMY } from '@/lib/regions';
import { LoadLineRule } from '@/components/brand/LoadLineRule';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hull text-plimsoll w-full border-t-4 border-accent">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Group Column */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6">Group</h3>
            <ul className="space-y-3 text-sm text-plimsoll/80">
              <li><Link to="/about" className="hover:text-white transition-colors">About Meridian</Link></li>
              <li><Link to="/about/governance" className="hover:text-white transition-colors">Governance & Board</Link></li>
              <li><Link to="/about/hsseq" className="hover:text-white transition-colors">HSSEQ Standards</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability & IMO Target</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition-colors">Managed Fleet</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition-colors">Corporate Reports</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-plimsoll/80">
              {Array.from(new Set(SERVICE_TAXONOMY.map(s => s.division))).map(division => (
                <li key={division}>
                  <Link to={`/services#${division.toLowerCase()}`} className="hover:text-white transition-colors">
                    {division}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/services" className="text-accent hover:text-white font-medium transition-colors">
                  View all services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions Column */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6">Regions</h3>
            <ul className="space-y-3 text-sm text-plimsoll/80">
              {REGIONS.map(region => (
                <li key={region.slug} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.accent }}></span>
                  <Link to={`/${region.slug}`} className="hover:text-white transition-colors">
                    {region.continent}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6">Connect</h3>
            <ul className="space-y-3 text-sm text-plimsoll/80 mb-6">
              <li><Link to="/contact" className="hover:text-white transition-colors">Global Contact Directory</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/portal" className="hover:text-white transition-colors">Client Portal Login</Link></li>
            </ul>
            
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-steel/20 flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm opacity-20">
            <LoadLineRule activeZone="F" accentColor="var(--plimsoll)" />
          </div>
          
          <div className="text-xs text-plimsoll/50 flex flex-col md:flex-row items-center gap-4 z-10">
            <span>&copy; {currentYear} Meridian Maritime Group. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/legal/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <div className="text-xs font-mono text-plimsoll/30 z-10">
            SEVEN CONTINENTS. ONE STANDARD.
          </div>
        </div>
      </div>
    </footer>
  );
}
