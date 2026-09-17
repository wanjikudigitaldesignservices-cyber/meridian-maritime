import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Anchor, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Mock function for AIS position as requested
async function fetchAISPosition(reference: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lat: '04°03′S',
        lng: '039°40′E',
        lastUpdated: new Date().toISOString(),
        status: 'In Transit'
      });
    }, 1000);
  });
}

export function TrackPage() {
  const [reference, setReference] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference) return;
    
    setIsSearching(true);
    // Simulate network request
    await fetchAISPosition(reference);
    
    // Mock result
    setResult({
      reference: reference.toUpperCase(),
      vesselName: 'MMG POLARIS',
      imoNumber: '9123456',
      status: 'In Transit',
      eta: '2026-10-15T08:00:00Z',
      origin: 'Rotterdam, NL (NLRTM)',
      destination: 'Houston, US (USHOU)',
      milestones: [
        { label: 'Job Booked', status: 'completed', time: '2026-09-01T10:00:00Z' },
        { label: 'Vessel Departed Origin', status: 'completed', time: '2026-09-05T14:30:00Z' },
        { label: 'In Transit', status: 'current', time: '2026-09-17T09:00:00Z' },
        { label: 'Estimated Arrival', status: 'pending', time: '2026-10-15T08:00:00Z' },
      ]
    });
    setIsSearching(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="font-heading font-bold text-4xl text-hull mb-4">Track Job or Vessel</h1>
        <p className="text-deck-grey text-lg max-w-2xl mx-auto">
          Enter your booking reference, job number, or IMO number to track cargo status and vessel position.
        </p>
      </div>

      <Card className="mb-12 border-steel/10 rounded-sm shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="reference" className="sr-only">Reference Number</Label>
              <Input 
                id="reference" 
                placeholder="e.g. MMG-KEMBA-2026-0417 or 9123456" 
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-8 bg-hull hover:bg-hull/90" disabled={isSearching}>
              {isSearching ? 'Searching...' : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-steel/10 rounded-sm shadow-sm">
            <CardHeader className="bg-plimsoll pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription className="font-mono text-xs uppercase tracking-wider text-deck-grey mb-1">
                    Reference: {result.reference}
                  </CardDescription>
                  <CardTitle className="font-heading text-2xl text-hull">
                    {result.vesselName} (IMO {result.imoNumber})
                  </CardTitle>
                </div>
                <div className="px-3 py-1 bg-chart-cyan/10 text-chart-cyan rounded-full font-medium text-sm">
                  {result.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-sm text-deck-grey mb-1">Origin</p>
                  <p className="font-medium text-hull">{result.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-deck-grey mb-1">Destination</p>
                  <p className="font-medium text-hull">{result.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-deck-grey mb-1">ETA</p>
                  <p className="font-medium text-hull font-mono text-sm">
                    {new Date(result.eta).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-deck-grey mb-1">Last Position</p>
                  <p className="font-medium text-hull font-mono text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    04°03′S 039°40′E
                  </p>
                </div>
              </div>

              <div className="border-t border-steel/10 pt-8 mt-8">
                <h3 className="font-heading font-semibold text-lg text-hull mb-6">Status Timeline</h3>
                <div className="space-y-6">
                  {result.milestones.map((milestone: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-hull text-white' :
                          milestone.status === 'current' ? 'bg-brass text-white' :
                          'bg-plimsoll text-deck-grey border border-steel/20'
                        }`}>
                          {milestone.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                           milestone.status === 'current' ? <Anchor className="w-4 h-4" /> :
                           <Clock className="w-4 h-4" />}
                        </div>
                        {index < result.milestones.length - 1 && (
                          <div className={`w-0.5 h-full my-2 ${
                            milestone.status === 'completed' ? 'bg-hull' : 'bg-steel/20'
                          }`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`font-medium ${
                          milestone.status === 'pending' ? 'text-deck-grey' : 'text-hull'
                        }`}>
                          {milestone.label}
                        </p>
                        <p className="text-sm text-deck-grey font-mono mt-1">
                          {new Date(milestone.time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
