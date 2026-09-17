import { useParams, Link } from 'react-router-dom';
import { REGIONS, type ServiceSlug } from '@/lib/regions';
import { useServices } from '@/hooks/useSupabaseData';
import { ArrowRight } from 'lucide-react';

export function RegionServices() {
  const { regionId } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const { data: servicesData, isLoading, error } = useServices();

  if (!region) return null;

  // Filter services that this region offers
  const services = servicesData || [];
  const regionalServices = services.filter(s => region.serviceSlugs.includes(s.slug as ServiceSlug));

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      {/* Header */}
      <div className="bg-hull py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-16 h-1 mb-6" style={{ backgroundColor: region.accent }} />
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Services in {region.continent}
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Delivering {regionalServices.length} specialized maritime services across our local network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="py-24 text-center text-steel">Loading services...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">Failed to load services.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionalServices.map(service => (
              <div key={service.id} className="bg-white border border-steel/20 flex flex-col h-full group hover:shadow-md transition-shadow">
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: region.accent }}>
                    {service.division} Division
                  </div>
                  <h3 className="text-2xl font-heading text-hull mb-4">{service.name}</h3>
                  <p className="text-deck-grey mb-8 flex-1">
                    Local execution of {service.name.toLowerCase()} tailored to the regulatory and operational environment of {region.continent}.
                  </p>
                  <Link 
                    to={`/${region.slug}/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-medium transition-colors"
                    style={{ color: region.accent }}
                  >
                    View capabilities <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
