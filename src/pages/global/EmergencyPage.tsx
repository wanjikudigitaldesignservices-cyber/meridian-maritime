import { REGIONS } from '@/lib/regions';
import { PhoneCall, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export function EmergencyPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-loadline/10 text-loadline font-medium text-sm mb-6 uppercase tracking-widest">
          <PhoneCall className="w-4 h-4" />
          24/7 Response
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-hull mb-6">Global Emergency Contacts</h1>
        <p className="text-xl text-deck-grey max-w-3xl">
          For immediate operational assistance, vessel casualties, or critical incidents, contact the relevant regional duty officer. Lines are staffed 24/7/365.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS.map(region => {
          // Calculate local time for the region
          let timeString = '';
          try {
            timeString = new Intl.DateTimeFormat('en-US', {
              timeZone: region.timezone,
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).format(now);
          } catch (e) {
            timeString = '00:00';
          }

          return (
            <div key={region.slug} className="border border-steel/20 rounded-sm p-6 hover:border-loadline/50 transition-colors bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-heading font-semibold text-xl text-hull" style={{ color: region.accent }}>
                    {region.entityName}
                  </h2>
                  <p className="text-deck-grey text-sm mt-1">{region.continent}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-mono bg-plimsoll px-2 py-1 rounded text-deck-grey">
                  <Clock className="w-3.5 h-3.5" />
                  {timeString}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-deck-grey uppercase tracking-wider mb-1">24/7 Hotline</p>
                  <a href={`tel:${region.emergencyPhone.replace(/\s+/g, '')}`} className="font-mono text-xl text-loadline font-medium hover:underline block">
                    {region.emergencyPhone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-deck-grey uppercase tracking-wider mb-1">Primary Port</p>
                  <p className="text-hull">{region.primaryPort}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
