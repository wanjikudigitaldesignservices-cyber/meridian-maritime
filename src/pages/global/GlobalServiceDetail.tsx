import { useParams, Link } from 'react-router-dom';
import { REGIONS, type ServiceSlug } from '@/lib/regions';
import { useServices } from '@/hooks/useSupabaseData';

export function GlobalServiceDetail() {
  const { serviceSlug } = useParams();
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

  if (!service || error) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-deck-grey">Service not found.</p>
      </div>
    );
  }

  const offeringRegions = REGIONS.filter(r => r.serviceSlugs.includes(service.slug as ServiceSlug));

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      {/* Hero */}
      <div className="bg-hull py-20 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm font-mono text-steel uppercase tracking-wider mb-4">
            {service.division} Division
          </div>
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">
            {service.name}
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Global standards applied through local expertise. Discover how we deliver {service.name.toLowerCase()} across our network.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="prose prose-lg prose-headings:font-heading prose-headings:text-hull prose-p:text-deck-grey max-w-none mb-16">
          <p>
            Our {service.name.toLowerCase()} operations are designed to meet the rigorous demands of modern shipping. 
            By centralising accountability while maintaining decentralised execution, we ensure that every operation—regardless of the port—adheres to Meridian's strict HSSEQ policies.
          </p>
          <h3>Typical Scope of Work</h3>
          <ul>
            <li>Pre-arrival preparation and regulatory compliance checks.</li>
            <li>Real-time reporting and continuous communication.</li>
            <li>Cost optimization and disbursement account (DA) management.</li>
            <li>24/7 on-ground support and incident response.</li>
          </ul>
        </div>

        {/* Where we deliver this */}
        <div className="bg-white border border-steel/20 p-8 md:p-12">
          <h2 className="text-2xl font-heading text-hull mb-8">Where we deliver this service</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {offeringRegions.map(r => (
              <Link 
                key={r.slug} 
                to={`/${r.slug}/services/${service.slug}`}
                className="flex items-center gap-4 p-4 rounded-sm border border-steel/20 hover:border-hull transition-colors group"
              >
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: r.accent }} />
                <div>
                  <div className="text-sm font-medium text-hull group-hover:text-accent transition-colors">
                    {r.entityName}
                  </div>
                  <div className="text-xs text-deck-grey">{r.continent}</div>
                </div>
              </Link>
            ))}
          </div>

          {offeringRegions.length === 0 && (
            <p className="text-deck-grey italic">Currently rolling out to the network.</p>
          )}
        </div>
      </div>
    </div>
  );
}
