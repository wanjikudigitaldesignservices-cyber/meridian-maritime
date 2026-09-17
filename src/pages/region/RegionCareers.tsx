import { useRegion } from '@/hooks/useRegion';
import { Navigate, Link } from 'react-router-dom';
import { Briefcase, ArrowRight, MapPin } from 'lucide-react';

export function RegionCareers() {
  const { region, isRegionValid } = useRegion();

  if (!isRegionValid || !region) return <Navigate to="/404" replace />;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center bg-hull overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hull/80 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1920"
            alt={`Careers at ${region.entityName}`} 
            className="w-full h-full object-cover saturate-85"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">
              Careers at <span style={{ color: region.accent }}>{region.entityName}</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl font-light">
              Join our local team in {region.country} and help drive the global maritime supply chain.
            </p>
          </div>
        </div>
      </section>

      {/* Local Opportunities */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading text-hull mb-6">Current Local Opportunities</h2>
            <p className="text-deck-grey">
              We are always looking for talented port agents, logistics coordinators, and maritime professionals to join our operations in {region.primaryPort}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* General App */}
            <div className="mmg-card p-8 border border-steel/20 hover:border-hull transition-colors">
              <Briefcase className="w-8 h-8 text-hull mb-6" style={{ color: region.accent }} />
              <h3 className="font-heading text-xl text-hull mb-3">Shore-Based Roles ({region.continent})</h3>
              <p className="text-sm text-deck-grey mb-6">
                Submit a general application for shore-based roles at our {region.country} office, including operations, finance, and commercial departments.
              </p>
              <Link to="/careers/shore" className="inline-flex items-center text-sm font-medium text-hull hover:text-accent transition-colors">
                Apply Ashore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Seafarer App */}
            <div className="mmg-card p-8 border border-steel/20 hover:border-hull transition-colors">
              <MapPin className="w-8 h-8 text-hull mb-6" style={{ color: region.accent }} />
              <h3 className="font-heading text-xl text-hull mb-3">Local Crewing</h3>
              <p className="text-sm text-deck-grey mb-6">
                Are you a seafarer based in {region.country}? We actively recruit local talent for our managed fleet operating in the {region.continent} sector.
              </p>
              <Link to="/careers/seafarer" className="inline-flex items-center text-sm font-medium text-hull hover:text-accent transition-colors">
                Apply as Seafarer <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
