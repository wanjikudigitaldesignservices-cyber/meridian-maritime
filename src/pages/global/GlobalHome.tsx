import { useEffect, useState } from 'react';
import { REGIONS, SERVICE_TAXONOMY } from '@/lib/regions';
import type { RegionSlug } from '@/lib/regions';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Ship, Package, Anchor, Navigation, ShieldCheck, Map, Globe, Briefcase, FileText } from 'lucide-react';
import { LoadLineRule } from '@/components/brand/LoadLineRule';
import { CoordinateBlock } from '@/components/brand/CoordinateBlock';

export function GlobalHome() {
  const [suggestedRegion, setSuggestedRegion] = useState<RegionSlug | null>(null);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('mmg_region') as RegionSlug;
    if (saved && REGIONS.some(r => r.slug === saved)) {
      setSuggestedRegion(saved);
    }

    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      const now = new Date();
      REGIONS.forEach(r => {
        try {
          newTimes[r.slug] = new Intl.DateTimeFormat('en-GB', {
            timeZone: r.timezone,
            hour: '2-digit',
            minute: '2-digit',
          }).format(now);
        } catch(e) {
          newTimes[r.slug] = '00:00';
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  const regionName = REGIONS.find(r => r.slug === suggestedRegion)?.entityName;

  const getDivisionIcon = (division: string) => {
    switch (division) {
      case 'Agency': return <Anchor className="w-8 h-8 text-accent" />;
      case 'Logistics': return <Package className="w-8 h-8 text-accent" />;
      case 'Cargo': return <Ship className="w-8 h-8 text-accent" />;
      case 'Marine': return <Navigation className="w-8 h-8 text-accent" />;
      case 'Management': return <Briefcase className="w-8 h-8 text-accent" />;
      case 'Commercial': return <FileText className="w-8 h-8 text-accent" />;
      case 'Compliance': return <ShieldCheck className="w-8 h-8 text-accent" />;
      case 'Polar': return <Map className="w-8 h-8 text-accent" />;
      default: return <Globe className="w-8 h-8 text-accent" />;
    }
  };

  const uniqueDivisions = Array.from(new Set(SERVICE_TAXONOMY.map(s => s.division)));

  return (
    <div className="w-full">
      {/* Dynamic Continue Banner */}
      {suggestedRegion && (
        <div className="w-full bg-plimsoll border-b border-steel/10 py-3 px-4 flex items-center justify-center gap-4">
          <p className="text-sm text-hull">
            Continue to <span className="font-medium">{regionName}</span>?
          </p>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="h-8 rounded-[2px]">
              <Link to={`/${suggestedRegion}`}>Yes, continue</Link>
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-[2px]" onClick={() => setSuggestedRegion(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* 3. Hero */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551280857-2b9ebe3698af?auto=format&fit=crop&q=80")' }}
        ></div>
        <div className="absolute inset-0 bg-hull/80"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white mb-6 max-w-4xl tracking-tighter">
            Seven continents. One operating standard.
          </h1>
          <p className="text-lg md:text-xl text-plimsoll max-w-3xl mb-12 font-light leading-relaxed">
            Ship agency, marine logistics, vessel management and polar operations — delivered by locally licensed companies under one group accountability line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-[2px] font-medium border-none h-12 px-8">
              <a href="#regions">Find your region</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hull rounded-[2px] font-medium h-12 px-8">
              <Link to="/quote">Request a quote</Link>
            </Button>
          </div>
          <div className="w-full max-w-md opacity-60">
            <LoadLineRule accentColor="var(--white)" />
          </div>
        </div>
      </section>

      {/* 4. Live Counter Strip */}
      <section className="w-full bg-steel py-6 border-b-4 border-accent">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-x-12 gap-y-6">
          <div className="text-center">
            <div className="font-mono text-2xl text-white font-medium">7</div>
            <div className="text-xs font-mono text-plimsoll/60 mt-1">REGIONS</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-white font-medium">41</div>
            <div className="text-xs font-mono text-plimsoll/60 mt-1">PORTS</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-white font-medium">24</div>
            <div className="text-xs font-mono text-plimsoll/60 mt-1">VESSELS MANAGED</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-white font-medium">1,180</div>
            <div className="text-xs font-mono text-plimsoll/60 mt-1">PORT CALLS / YEAR</div>
          </div>
        </div>
      </section>

      {/* 5. Region Grid */}
      <section id="regions" className="section-spacing bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-heading text-hull mb-4">Global Network</h2>
            <p className="text-deck-grey max-w-2xl">Operating through wholly-owned subsidiaries in every major maritime hub.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region, index) => (
              <Link 
                key={region.slug}
                to={`/${region.slug}`}
                className={`group mmg-card overflow-hidden flex flex-col ${index >= 5 ? 'lg:col-span-1 lg:max-w-md lg:mx-auto w-full' : ''}`}
                style={{ '--accent': region.accent } as React.CSSProperties}
              >
                <div className="h-1 w-full bg-accent transition-all duration-300 group-hover:h-2"></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-mono text-xs text-deck-grey mb-2 uppercase">{region.continent}</div>
                      <h3 className="font-heading text-xl text-hull group-hover:text-accent transition-colors">{region.entityName}</h3>
                      <p className="text-sm text-deck-grey mt-1">{region.primaryPort}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-hull font-medium block">
                        {times[region.slug] || '--:--'}
                      </span>
                      <span className="text-deck-grey text-xs">{region.timezone.split('/')[1]?.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  <CoordinateBlock
                    lat={region.coordinates.lat}
                    lon={region.coordinates.lng}
                    locode={region.unlocode}
                    timezone={region.timezone}
                    className="mb-6"
                  />
                  
                  <p className="text-sm text-hull/80 mb-6 flex-1">{region.positioning.split('.')[0]}.</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel/10">
                    <span className="text-sm font-medium text-hull group-hover:text-accent transition-colors flex items-center gap-1">
                      Enter region <ArrowRight className="w-4 h-4 inline-block transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs text-deck-grey opacity-0 group-hover:opacity-100 transition-opacity">
                      {region.serviceSlugs.length} services
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service Divisions */}
      <section className="section-spacing bg-white border-t border-steel/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-heading text-hull mb-4">Core Divisions</h2>
              <p className="text-deck-grey max-w-2xl">Standardised service delivery across all twenty-two operational service lines.</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:text-hull transition-colors">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueDivisions.map(division => (
              <Link key={division} to={`/services#${division.toLowerCase()}`} className="mmg-card p-6 flex items-start gap-4 hover:border-l-4">
                <div className="p-3 bg-plimsoll rounded-sm">
                  {getDivisionIcon(division)}
                </div>
                <div>
                  <h3 className="font-heading text-lg text-hull mb-1">{division}</h3>
                  <p className="text-sm text-deck-grey">
                    {SERVICE_TAXONOMY.filter(s => s.division === division).length} service lines
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Button asChild variant="outline" className="rounded-sm w-full">
              <Link to="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Sustainability Strip */}
      <section className="section-spacing bg-hull text-plimsoll">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">Decarbonisation is a compliance deadline, not a brochure.</h2>
              <p className="text-plimsoll/80 text-lg mb-8 leading-relaxed">
                As emissions regulations tighten globally, compliance failure directly impacts charter rates, port access, and voyage profitability. We provide technical and advisory support to navigate the transition.
              </p>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-sm border-2">
                <Link to="/sustainability">View our IMO Target Strategy</Link>
              </Button>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-steel/40 border border-steel p-6 rounded-sm">
                <div className="text-2xl font-heading text-white mb-2">Net-Zero by 2050</div>
                <p className="text-sm text-plimsoll/70">IMO revised greenhouse gas (GHG) reduction strategy targeting net-zero emissions.</p>
              </div>
              <div className="bg-steel/40 border border-steel p-6 rounded-sm">
                <div className="text-2xl font-heading text-white mb-2">EEXI & CII (2023)</div>
                <p className="text-sm text-plimsoll/70">Mandatory energy efficiency measures and carbon intensity indicators enforced globally.</p>
              </div>
              <div className="bg-steel/40 border border-steel p-6 rounded-sm">
                <div className="text-2xl font-heading text-white mb-2">EU ETS (2024)</div>
                <p className="text-sm text-plimsoll/70">Shipping included in the European Union Emissions Trading System, requiring allowance surrenders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Latest Insights (Placeholder) */}
      <section className="section-spacing bg-plimsoll">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-heading text-hull">Latest Insights</h2>
            <Link to="/insights" className="text-sm font-medium text-accent hover:text-hull transition-colors">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="mmg-card p-6 opacity-60">
                <div className="w-12 h-1 mb-4 bg-steel"></div>
                <div className="text-xs font-mono text-deck-grey mb-2">MARITIME REGULATION</div>
                <h3 className="font-heading text-lg text-hull mb-3">Placeholder Insight Title for Article {i}</h3>
                <p className="text-sm text-deck-grey">Once the database is populated, the latest published insights will dynamically load here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Client Portal CTA */}
      <section className="border-t border-steel/10 bg-white">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-steel/10">
            <h2 className="text-2xl font-heading text-hull mb-4">Track a Job</h2>
            <p className="text-sm text-deck-grey mb-8 max-w-sm">Enter your job reference number (e.g. MMG-KEMBA-2026) or IMO number to track live milestones.</p>
            <form className="w-full max-w-sm flex gap-2" action="/track">
              <input 
                type="text" 
                placeholder="Job Ref or IMO" 
                className="flex-1 bg-plimsoll border border-steel/20 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-accent"
              />
              <Button type="submit" className="bg-hull text-white rounded-sm hover:bg-hull/90">Track</Button>
            </form>
          </div>
          <div className="p-12 md:p-24 flex flex-col justify-center items-center text-center bg-plimsoll/50">
            <h2 className="text-2xl font-heading text-hull mb-4">Client Portal</h2>
            <p className="text-sm text-deck-grey mb-8 max-w-sm">Secure access to Statements of Facts, Disbursement Accounts, and cargo documents.</p>
            <Button asChild variant="outline" className="border-hull text-hull hover:bg-hull hover:text-white rounded-sm px-8">
              <Link to="/portal">Client Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
