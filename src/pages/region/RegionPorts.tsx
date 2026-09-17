import { useParams, Link } from 'react-router-dom';
import portsData from '@/data/seed/ports.json';
import { REGIONS } from '@/lib/regions';
import { MapPin } from 'lucide-react';

export function RegionPorts() {
  const { regionId } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const regionPorts = portsData.filter(p => p.region === regionId);

  if (!region) return null;

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      {/* Header */}
      <div className="bg-hull py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-16 h-1 mb-6" style={{ backgroundColor: region.accent }} />
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Ports in {region.continent}
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            {regionPorts.length} key operational hubs managed by {region.entityName}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionPorts.map(port => (
            <div key={port.id} className="bg-white border border-steel/20 p-6 flex flex-col hover:shadow-md transition-shadow group relative">
              <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: region.accent }} />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: region.accent }}>
                    {port.country}
                  </div>
                  <h3 className="text-xl font-heading text-hull">{port.name}</h3>
                </div>
                <div className="bg-plimsoll px-2 py-1 rounded text-xs font-mono text-deck-grey">
                  {port.unlocode}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider">Max Draught</div>
                  <div className="font-mono text-hull">{port.maxDraught}m {port.indicative && '*'}</div>
                </div>
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider">Max LOA</div>
                  <div className="font-mono text-hull">{port.maxLoa}m {port.indicative && '*'}</div>
                </div>
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider">Berths</div>
                  <div className="font-mono text-hull">{port.berthCount}</div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-steel/10 flex justify-between items-center">
                <div className="flex gap-2">
                  {port.cargoTypes.map(type => (
                    <span key={type} className="text-[10px] uppercase tracking-wider bg-plimsoll px-2 py-1 rounded text-deck-grey">
                      {type.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/${region.slug}/ports/${port.slug}`}
                  className="text-hull hover:text-accent transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  Details <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
