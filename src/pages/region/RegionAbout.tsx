import { useRegion } from '@/hooks/useRegion';
import { Navigate } from 'react-router-dom';
import { Globe, Target } from 'lucide-react';

export function RegionAbout() {
  const { region, isRegionValid } = useRegion();

  if (!isRegionValid || !region) return <Navigate to="/404" replace />;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center bg-hull overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hull/80 mix-blend-multiply z-10" />
          <img 
            src={region.heroImageUrl || "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1920"}
            alt={`${region.entityName} Operations`} 
            className="w-full h-full object-cover saturate-85"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">
              About <span style={{ color: region.accent }}>{region.entityName}</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl font-light">
              {region.positioning}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-heading text-hull mb-6">Local Mastery in {region.continent}</h2>
              <p className="text-deck-grey mb-4">
                Operating out of {region.address}, our regional headquarters serves as the central nervous system for all operations in the {region.continent} sector. We understand the specific regulatory frameworks, local port dynamics, and logistical challenges unique to this region.
              </p>
              <p className="text-deck-grey mb-8">
                Our team at {region.entityName} is deeply embedded in the local maritime community, maintaining strong relationships with the {region.regulators[0]} and other key authorities.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="p-6 border border-steel/20">
                  <Target className="w-8 h-8 text-hull mb-4" style={{ color: region.accent }} />
                  <h3 className="font-heading text-xl text-hull mb-2">Our Focus</h3>
                  <p className="text-sm text-deck-grey">{region.heroSubline}</p>
                </div>
                <div className="p-6 border border-steel/20">
                  <Globe className="w-8 h-8 text-hull mb-4" style={{ color: region.accent }} />
                  <h3 className="font-heading text-xl text-hull mb-2">Network</h3>
                  <p className="text-sm text-deck-grey">Connected to the global Meridian network, bringing international standards to {region.country}.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-plimsoll p-8 h-fit">
              <h3 className="font-heading text-xl text-hull mb-6 border-b border-steel/20 pb-4">Fast Facts</h3>
              <ul className="space-y-4">
                <li>
                  <div className="text-xs text-deck-grey mb-1 uppercase tracking-wider">Primary Port</div>
                  <div className="text-hull font-medium">{region.primaryPort}</div>
                </li>
                <li>
                  <div className="text-xs text-deck-grey mb-1 uppercase tracking-wider">UN/LOCODE</div>
                  <div className="text-hull font-medium">{region.unlocode}</div>
                </li>
                <li>
                  <div className="text-xs text-deck-grey mb-1 uppercase tracking-wider">Timezone</div>
                  <div className="text-hull font-medium">{region.timezone}</div>
                </li>
                <li>
                  <div className="text-xs text-deck-grey mb-1 uppercase tracking-wider">Languages Spoken</div>
                  <div className="text-hull font-medium">{region.languages.join(', ').toUpperCase()}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
