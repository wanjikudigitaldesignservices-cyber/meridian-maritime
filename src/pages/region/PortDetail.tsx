import { useParams, Link } from 'react-router-dom';
import { usePorts } from '@/hooks/useSupabaseData';
import { REGIONS } from '@/lib/regions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PortDetail() {
  const { regionId, portSlug } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const { data: portsData, isLoading, error } = usePorts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-steel">Loading port data...</p>
      </div>
    );
  }

  const ports = portsData || [];
  const port = ports.find(p => p.slug === portSlug && p.region === regionId);

  if (!region || !port || error) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-deck-grey">Port not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-plimsoll min-h-screen pb-20">
      <div className="bg-hull py-12 px-4 md:px-8 border-t-4" style={{ borderColor: region.accent }}>
        <div className="max-w-4xl mx-auto">
          <Link 
            to={`/${region.slug}/ports`}
            className="inline-flex items-center text-sm font-mono uppercase tracking-wider mb-8 hover:underline"
            style={{ color: region.accent }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {region.continent} Ports
          </Link>
          
          <div className="flex flex-wrap items-end gap-6 justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">
                {port.name}
              </h1>
              <p className="text-steel text-lg">
                {port.country}
              </p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded">
              <div className="text-xs text-steel uppercase tracking-wider mb-1">UN/LOCODE</div>
              <div className="text-xl font-mono text-white">{port.unlocode}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-heading text-hull mb-6">Port Specifications</h2>
          
          <div className="grid grid-cols-2 gap-px bg-steel/20 border border-steel/20 rounded-sm overflow-hidden mb-12">
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Max Draught</div>
              <div className="text-3xl font-mono text-hull">{port.maxDraught}m</div>
              {port.indicative && <div className="text-xs text-deck-grey mt-1">* Indicative figure</div>}
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Max LOA</div>
              <div className="text-3xl font-mono text-hull">{port.maxLoa}m</div>
              {port.indicative && <div className="text-xs text-deck-grey mt-1">* Indicative figure</div>}
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Total Berths</div>
              <div className="text-3xl font-mono text-hull">{port.berthCount}</div>
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Coordinates</div>
              <div className="text-lg font-mono text-hull">
                {port.coordinates.lat}, {port.coordinates.lng}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-heading text-hull mb-6">Supported Cargo Types</h2>
          <div className="flex flex-wrap gap-3">
            {port.cargoTypes.map(type => (
              <div key={type} className="bg-white border border-steel/20 px-4 py-2 rounded-sm text-sm uppercase tracking-wider text-deck-grey">
                {type.replace('-', ' ')}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white border border-steel/20 p-6 sticky top-8">
            <h3 className="font-heading text-xl text-hull mb-4">Port Agency</h3>
            <p className="text-sm text-deck-grey mb-6">
              Meridian provides full agency and husbandry services at {port.name}. 
            </p>
            <Button className="w-full text-white" style={{ backgroundColor: region.accent }} asChild>
              <Link to={`/${region.slug}/contact`}>
                Appoint Agent
              </Link>
            </Button>
            
            <hr className="my-6 border-steel/20" />
            
            <h3 className="font-heading text-xl text-hull mb-4">Port Information</h3>
            <p className="text-sm text-deck-grey mb-6">
              Download the latest terminal constraints and DA templates.
            </p>
            <Button variant="outline" className="w-full border-hull text-hull hover:bg-hull hover:text-white" asChild>
              <Link to="/downloads">
                View Resources
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
