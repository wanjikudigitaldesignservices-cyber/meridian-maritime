import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import vesselsData from '@/data/seed/vessels.json';

export function GlobalFleet() {
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const types = Array.from(new Set(vesselsData.map(v => v.type)));

  const filteredVessels = useMemo(() => {
    if (!typeFilter) return vesselsData;
    return vesselsData.filter(v => v.type === typeFilter);
  }, [typeFilter]);

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      <div className="bg-hull py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">Managed Fleet</h1>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            {vesselsData.length} vessels operating under Meridian technical management globally.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            onClick={() => setTypeFilter(null)}
            className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${!typeFilter ? 'bg-hull text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
          >
            ALL VESSELS
          </button>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-colors ${typeFilter === type ? 'bg-hull text-white' : 'bg-white border border-steel/20 text-deck-grey hover:border-hull'}`}
            >
              {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVessels.map(vessel => (
            <Link 
              key={vessel.id}
              to={`/fleet/${vessel.imoNumber}`}
              className="bg-white border border-steel/20 p-6 flex flex-col hover:shadow-md hover:border-hull transition-all group"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-deck-grey mb-2">
                IMO {vessel.imoNumber}
              </div>
              <h3 className="text-2xl font-heading text-hull mb-6 group-hover:text-accent transition-colors">
                {vessel.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mt-auto border-t border-steel/10 pt-4">
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">Type</div>
                  <div className="font-mono text-hull text-sm">{vessel.type.replace('_', ' ').toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">Built</div>
                  <div className="font-mono text-hull text-sm">{vessel.builtYear}</div>
                </div>
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">DWT</div>
                  <div className="font-mono text-hull text-sm">{vessel.dwt.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-deck-grey uppercase tracking-wider mb-1">CII Rating</div>
                  <div className="font-mono text-hull text-sm">{vessel.ciiRating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
