import { Link } from 'react-router-dom';
import { REGIONS, type ServiceSlug } from '@/lib/regions';
import servicesData from '@/data/seed/services.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// We mock region_services mapping here, or just randomly assign for UI purpose if needed.
// Based on the spec, regions have specific serviceSlugs they offer.
export function GlobalServices() {
  // Group services by division
  const divisions = servicesData.reduce((acc, service) => {
    if (!acc[service.division]) {
      acc[service.division] = [];
    }
    acc[service.division].push(service);
    return acc;
  }, {} as Record<string, typeof servicesData>);

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      {/* Header */}
      <div className="bg-hull py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">Global Services</h1>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            Our comprehensive service taxonomy across 9 operating divisions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {Object.entries(divisions).map(([division, services]) => (
            <AccordionItem key={division} value={division} className="border border-steel/20 bg-white shadow-sm px-6">
              <AccordionTrigger className="hover:no-underline text-2xl font-heading text-hull py-6">
                {division} Division
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {services.map(service => {
                    // Find which regions offer this service
                    const offeringRegions = REGIONS.filter(r => r.serviceSlugs.includes(service.slug as ServiceSlug));
                    
                    return (
                      <Link 
                        key={service.id} 
                        to={`/services/${service.slug}`}
                        className="p-4 border border-steel/20 rounded-sm hover:border-hull transition-colors group flex flex-col justify-between"
                      >
                        <h4 className="text-lg font-medium text-hull group-hover:text-accent transition-colors mb-4">
                          {service.name}
                        </h4>
                        
                        <div className="flex flex-col gap-2">
                          <span className="text-xs text-deck-grey font-mono uppercase tracking-wider">Available in:</span>
                          <div className="flex gap-2 flex-wrap">
                            {offeringRegions.length > 0 ? (
                              offeringRegions.map(r => (
                                <div 
                                  key={r.slug} 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: r.accent }}
                                  title={r.entityName}
                                />
                              ))
                            ) : (
                              <span className="text-xs text-deck-grey italic">Global deployment</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
