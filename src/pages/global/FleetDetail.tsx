import { useParams, Link } from 'react-router-dom';
import { useVessels } from '@/hooks/useSupabaseData';
import { ArrowLeft } from 'lucide-react';
import { REGIONS } from '@/lib/regions';

export function FleetDetail() {
  const { imoNumber } = useParams();
  const { data: vesselsData, isLoading, error } = useVessels();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-steel">Loading vessel data...</p>
      </div>
    );
  }

  const vessels = vesselsData || [];
  const vessel = vessels.find(v => v.imoNumber === imoNumber);

  if (!vessel || error) {
    return (
      <div className="min-h-screen bg-plimsoll flex items-center justify-center">
        <p className="text-xl text-deck-grey">Vessel not found.</p>
      </div>
    );
  }

  const region = REGIONS.find(r => r.slug === vessel.region);

  return (
    <div className="w-full bg-plimsoll min-h-screen pb-20">
      <div className="bg-hull py-12 px-4 md:px-8 border-t-4" style={{ borderColor: region?.accent || '#E0A526' }}>
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/fleet"
            className="inline-flex items-center text-sm font-mono uppercase tracking-wider mb-8 hover:underline"
            style={{ color: region?.accent || '#E0A526' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Fleet Registry
          </Link>
          
          <div className="flex flex-wrap items-end gap-6 justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">
                {vessel.name}
              </h1>
              <p className="text-steel text-lg uppercase tracking-wider font-mono">
                {vessel.type.replace('_', ' ')}
              </p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded flex gap-6">
              <div>
                <div className="text-xs text-steel uppercase tracking-wider mb-1">IMO Number</div>
                <div className="text-xl font-mono text-white">{vessel.imoNumber}</div>
              </div>
              <div>
                <div className="text-xs text-steel uppercase tracking-wider mb-1">Flag</div>
                <div className="text-xl font-mono text-white">{vessel.flag}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-heading text-hull mb-6">Technical Specifications</h2>
          
          <div className="grid grid-cols-2 gap-px bg-steel/20 border border-steel/20 rounded-sm overflow-hidden mb-12">
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Built Year</div>
              <div className="text-3xl font-mono text-hull">{vessel.builtYear}</div>
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Deadweight (DWT)</div>
              <div className="text-3xl font-mono text-hull">{vessel.dwt.toLocaleString()} t</div>
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">Class Society</div>
              <div className="text-lg font-mono text-hull">{vessel.classSociety}</div>
            </div>
            <div className="bg-white p-6">
              <div className="text-xs text-deck-grey uppercase tracking-wider mb-2">CII Rating (2023)</div>
              <div className="text-3xl font-mono text-hull">{vessel.ciiRating}</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-heading text-hull mb-6">Management Scope</h2>
          <div className="prose prose-p:text-deck-grey">
            <p>
              The {vessel.name} operates under full technical management by {region?.entityName || 'Meridian Maritime Group'}, ensuring the highest standards of safety, environmental compliance, and operational efficiency.
            </p>
            {vessel.type === 'icebreaker' && (
              <p className="bg-steel/10 p-4 border-l-4" style={{ borderColor: '#5FA8C7' }}>
                <strong>Polar Operations:</strong> This vessel maintains full Polar Code compliance and is equipped for ice-class operations, including research station resupply and extreme environment navigation.
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white border border-steel/20 p-6 sticky top-8">
            <h3 className="font-heading text-xl text-hull mb-4">Chartering & Commercial</h3>
            <p className="text-sm text-deck-grey mb-6">
              For chartering enquiries or to request the vessel's Q88/HVPQ, contact our commercial desk.
            </p>
            <Link 
              to="/contact"
              className="inline-flex justify-center w-full bg-hull text-white py-2 px-4 rounded-sm hover:bg-hull/90 transition-colors"
            >
              Contact Commercial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
