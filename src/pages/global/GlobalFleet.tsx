import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, Filter } from 'lucide-react';
import { useVessels } from '@/hooks/useSupabaseData';

export function GlobalFleet() {
  const [filter, setFilter] = useState<string>('all');
  const { data: vesselsData, isLoading, error } = useVessels();

  const vessels = vesselsData || [];
  const types = Array.from(new Set(vessels.map(v => v.type)));

  const filteredFleet = useMemo(() => {
    return filter === 'all' 
      ? vessels
      : vessels.filter(v => v.type.toLowerCase() === filter.toLowerCase());
  }, [vessels, filter]);

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      <div className="bg-hull py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">Managed Fleet</h1>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            {vessels.length} vessels operating under Meridian technical management globally.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${filter === 'all' ? 'bg-hull text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
          >
            ALL VESSELS
          </button>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${filter.toLowerCase() === type.toLowerCase() ? 'bg-hull text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
            >
              {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        {isLoading ? (
          <div className="py-24 text-center text-steel">Loading fleet...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">Failed to load fleet data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map(vessel => (
              <div key={vessel.id} className="bg-white border border-steel/20 flex flex-col group hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-steel/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-hull/10 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-steel">
                    <Anchor className="w-12 h-12 opacity-50" />
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading text-hull mb-1">{vessel.name}</h3>
                      <div className="text-sm text-deck-grey">{vessel.type}</div>
                    </div>
                    <div className="bg-plimsoll text-hull text-xs font-mono px-2 py-1">
                      IMO {vessel.imoNumber}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 text-sm text-deck-grey flex-1">
                    <div className="flex justify-between">
                      <span>DWT</span>
                      <span className="font-medium text-hull">{vessel.dwt.toLocaleString()} t</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Built</span>
                      <span className="font-medium text-hull">{vessel.builtYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flag</span>
                      <span className="font-medium text-hull">{vessel.flag}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/fleet/${vessel.imoNumber}`}
                    className="inline-flex items-center text-sm font-medium text-hull hover:text-red transition-colors"
                  >
                    View vessel specs <ArrowRight className="ml-2 w-4 h-4" />
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
