import { useParams, Link } from 'react-router-dom';
import { REGIONS, type ServiceSlug } from '@/lib/regions';
import { useServices } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';

export function RegionServiceDetail() {
  const { regionId, serviceSlug } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const { data: servicesData, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-steel">Loading service data...</p>
      </div>
    );
  }

  const services = servicesData || [];
  const service = services.find(s => s.slug === serviceSlug);

  if (!region || !service || !region.serviceSlugs.includes(service.slug as ServiceSlug) || error) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-deck-grey">Service not available in this region.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-plimsoll min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-hull py-20 px-4 md:px-8 relative border-t-4" style={{ borderColor: region.accent }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider mb-4" style={{ color: region.accent }}>
            <Link to={`/${region.slug}/services`} className="hover:underline">Services</Link>
            <span>/</span>
            <span>{service.division}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">
            {service.name}
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Delivering {service.name.toLowerCase()} tailored to the operational realities of {region.continent}.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 prose prose-lg prose-headings:font-heading prose-headings:text-hull prose-p:text-deck-grey max-w-none">
          <h2>Local Expertise, Global Standard</h2>
          <p>
            In {region.continent}, our {service.name.toLowerCase()} operations are managed by {region.entityName}. 
            Our deep understanding of local regulations, terminal constraints, and supply chains ensures that your operations run smoothly and predictably.
          </p>
          <p>
            Whether handling complex port calls or managing critical logistics pathways, we apply the Meridian standard: absolute transparency, rigorous compliance, and unwavering safety.
          </p>
          
          <h3>Regulatory Note</h3>
          <div className="bg-steel/10 p-6 border-l-4" style={{ borderColor: region.accent }}>
            <p className="text-sm m-0">
              Operations in {region.continent} are subject to specific regional frameworks. Ensure your DA and operational planning account for local environmental and safety mandates. 
              {region.slug === 'europe' && ' This includes EU ETS compliance for all qualifying voyages.'}
              {region.slug === 'antarctica' && ' This includes strict adherence to the Antarctic Treaty System and Polar Code.'}
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white border border-steel/20 p-6 sticky top-8">
            <h3 className="font-heading text-xl text-hull mb-4">Request a Quote</h3>
            <p className="text-sm text-deck-grey mb-6">
              Get an accurate estimate for {service.name.toLowerCase()} in {region.continent}.
            </p>
            <Button className="w-full text-white" style={{ backgroundColor: region.accent }} asChild>
              <Link to={`/${region.slug}/quote?service=${service.slug}`}>
                Request Pricing
              </Link>
            </Button>
            
            <hr className="my-6 border-steel/20" />
            
            <h3 className="font-heading text-xl text-hull mb-4">Need Immediate Assistance?</h3>
            <p className="text-sm text-deck-grey mb-6">
              For urgent operational matters or agency appointments.
            </p>
            <Button variant="outline" className="w-full border-hull text-hull hover:bg-hull hover:text-white" asChild>
              <Link to={`/${region.slug}/contact`}>
                Contact Operations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
