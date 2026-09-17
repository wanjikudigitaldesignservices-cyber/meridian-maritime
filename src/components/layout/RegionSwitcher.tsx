import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { REGIONS } from '@/lib/regions';
import { CoordinateBlock } from '@/components/brand/CoordinateBlock';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegionSwitcher() {
  const [open, setOpen] = useState(false);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      const now = new Date();
      REGIONS.forEach(r => {
        try {
          newTimes[r.slug] = new Intl.DateTimeFormat('en-GB', {
            timeZone: r.timezone,
            hour: '2-digit',
            minute: '2-digit',
          }).format(now);
        } catch(e) {
          newTimes[r.slug] = '00:00';
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000); // update every 10s
    return () => clearInterval(interval);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2 text-sm font-medium text-hull hover:text-accent transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">Regions</span>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md w-full bg-plimsoll">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-heading text-xl text-hull">Select a Region</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4">
          {REGIONS.map((region) => (
            <Link
              key={region.slug}
              to={`/${region.slug}`}
              onClick={() => setOpen(false)}
              className="block mmg-card p-4 hover:border-l-4"
              style={{ '--accent': region.accent } as React.CSSProperties}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading text-hull text-lg">{region.continent}</h3>
                  <p className="text-deck-grey text-sm">{region.primaryPort}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-hull font-medium block">
                    {times[region.slug] || '--:--'}
                  </span>
                  <span className="text-deck-grey text-xs">{region.timezone.split('/')[1]?.replace('_', ' ')}</span>
                </div>
              </div>
              <CoordinateBlock
                lat={region.coordinates.lat}
                lon={region.coordinates.lng}
                locode={region.unlocode}
                timezone={region.timezone}
                className="mb-3"
              />
              <div className="text-xs text-hull/70">
                {region.serviceSlugs.length} services offered
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
