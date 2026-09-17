import { useRegion } from '@/hooks/useRegion';
import { Button } from '@/components/ui/button';
import { LoadLineRule } from '@/components/brand/LoadLineRule';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useSupabaseData';

export function RegionHome() {
  const { region: currentRegion, isRegionValid } = useRegion();

  const { data: servicesData, isLoading, error } = useServices();

  if (!isRegionValid || !currentRegion) {
    return <div className="min-h-screen" />;
  }

  const isAntarctica = currentRegion.slug === 'antarctica';
  // Use serviceSlugs array from regions to determine which services are featured
  const services = servicesData || [];
  const regionServices = services.filter(s => currentRegion.serviceSlugs.includes(s.slug as any));

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center bg-hull overflow-hidden">
        {/* Background Image (Mock) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hull/70 mix-blend-multiply z-10" />
          <img 
            src={`https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1920`}
            alt="Hero background"
            className="w-full h-full object-cover saturate-85"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-12 mx-auto mt-24">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 tracking-tight">
              {currentRegion.heroHeadline}
            </h1>
            <p className="font-sans text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              {currentRegion.heroSubline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-hull hover:bg-hull/90 text-white rounded-sm h-12 px-8">
                <Link to={`/${currentRegion.slug}/contact`}>Appoint an Agent</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-hull hover:bg-white/10 rounded-sm h-12 px-8">
                <Link to={`/${currentRegion.slug}/quote`}>Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Season Banner (Antarctica Only) */}
      {isAntarctica && (
        <div className="w-full py-3 text-center text-white" style={{ backgroundColor: currentRegion.accent }}>
          <p className="font-sans font-medium text-sm">
            Operating season: November – March. Out-of-season enquiries answered within 48 hours.
          </p>
        </div>
      )}

      {/* Load Line Rule */}
      <div className="w-full bg-plimsoll py-12">
        <div className="container mx-auto px-4 md:px-12">
          <LoadLineRule 
            activeZone={currentRegion.loadLineZone as any} 
            accentColor={currentRegion.accent}
            showLabels={true}
          />
        </div>
      </div>

      {/* Featured Services */}
      <section className="py-24 bg-plimsoll">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="font-heading font-semibold text-3xl text-hull mb-4">Regional Capabilities</h2>
              <p className="text-deck-grey max-w-2xl text-lg">
                Delivering group-standard service across {currentRegion.entityName}'s operating footprint.
              </p>
            </div>
            <Button asChild variant="link" className="text-chart-cyan hover:text-chart-cyan/80 p-0">
              <Link to={`/${currentRegion.slug}/services`}>View all services →</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-steel">Loading services...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-500">Failed to load services.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionServices.map((service: any) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  regionSlug={currentRegion.slug}
                  accentColor={currentRegion.accent}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why This Region (Positioning) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-semibold text-3xl text-hull mb-6">About {currentRegion.entityName}</h2>
              <div className="prose prose-lg text-deck-grey font-sans">
                <p>{currentRegion.positioning}</p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button asChild variant="outline" className="border-steel text-hull rounded-sm">
                  <Link to={`/${currentRegion.slug}/about`}>More about us</Link>
                </Button>
              </div>
            </div>
            <div className="bg-plimsoll p-8 rounded border border-steel/10">
              <h3 className="font-heading font-semibold text-xl text-hull mb-6">Licences & Compliance</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-sans font-semibold text-sm text-deck-grey mb-2 uppercase tracking-wider">Regulators</h4>
                  <ul className="space-y-2">
                    {currentRegion.regulators.map((reg: string) => (
                      <li key={reg} className="text-hull flex items-start gap-2">
                        <span className="text-chart-cyan mt-1">•</span>
                        {reg}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-deck-grey mb-2 uppercase tracking-wider">Licences</h4>
                  <ul className="space-y-2">
                    {currentRegion.licences.map((lic: string) => (
                      <li key={lic} className="text-hull flex items-start gap-2">
                        <span className="text-chart-cyan mt-1">•</span>
                        {lic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
