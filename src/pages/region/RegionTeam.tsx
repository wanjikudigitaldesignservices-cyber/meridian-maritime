import { useParams } from 'react-router-dom';
import peopleData from '@/data/seed/people.json';
import { REGIONS } from '@/lib/regions';
import { Mail, Phone } from 'lucide-react';

export function RegionTeam() {
  const { regionId } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const team = peopleData.filter(p => p.region === regionId);

  if (!region) return null;

  return (
    <div className="w-full bg-plimsoll min-h-screen pb-20">
      <div className="bg-hull py-16 px-4 md:px-8 border-t-4" style={{ borderColor: region.accent }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
            Leadership & Management
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Meet the operational leaders driving Meridian's standards in {region.continent}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(person => (
            <div key={person.id} className="bg-white border border-steel/20 flex flex-col group">
              <div className="aspect-square bg-steel/10 overflow-hidden relative">
                <img 
                  src={person.photoUrl} 
                  alt={person.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-hull/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6 flex-1 flex flex-col border-t-4" style={{ borderColor: region.accent }}>
                <h3 className="text-xl font-heading text-hull mb-1">{person.name}</h3>
                <div className="text-sm text-deck-grey mb-4">{person.title}</div>
                
                <div className="mt-auto space-y-2">
                  <a 
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-sm text-deck-grey hover:text-hull transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{person.email}</span>
                  </a>
                  <a 
                    href={`tel:${person.phone}`}
                    className="flex items-center gap-2 text-sm text-deck-grey hover:text-hull transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{person.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {team.length === 0 && (
          <p className="text-deck-grey text-lg">Team profiles are currently being updated.</p>
        )}
      </div>
    </div>
  );
}
