import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, ShieldCheck, Map } from 'lucide-react';

const downloads = [
  {
    category: 'Brochures & Factsheets',
    icon: FileText,
    items: [
      { title: 'MMG Corporate Overview 2026', size: '2.4 MB', type: 'PDF' },
      { title: 'Global Agency Network Profile', size: '4.1 MB', type: 'PDF' },
      { title: 'Polar Operations Division Handbook', size: '5.6 MB', type: 'PDF' },
    ]
  },
  {
    category: 'Certificates & Compliance',
    icon: ShieldCheck,
    items: [
      { title: 'ISO 9001:2015 Quality Management', size: '850 KB', type: 'PDF' },
      { title: 'ISO 14001:2015 Environmental', size: '820 KB', type: 'PDF' },
      { title: 'ISO 45001:2018 Occupational Health', size: '840 KB', type: 'PDF' },
      { title: 'Anti-Bribery & Corruption Policy', size: '1.2 MB', type: 'PDF' },
    ]
  },
  {
    category: 'Port Information & Maps',
    icon: Map,
    items: [
      { title: 'Rotterdam Port Tariffs & Restrictions', size: '3.2 MB', type: 'PDF' },
      { title: 'Houston Houston Ship Channel Guide', size: '4.5 MB', type: 'PDF' },
      { title: 'Santos Agri-Bulk Berth Specifications', size: '1.8 MB', type: 'PDF' },
      { title: 'Fremantle Biosecurity Requirements', size: '2.1 MB', type: 'PDF' },
    ]
  }
];

export function DownloadsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="mb-16">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-hull mb-6">Resource Library</h1>
        <p className="text-xl text-deck-grey max-w-3xl">
          Download corporate brochures, compliance certificates, and technical port information sheets for Meridian Maritime Group operations worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {downloads.map((section, idx) => (
          <Card key={idx} className="border-steel/10 shadow-sm rounded-sm">
            <CardHeader className="bg-plimsoll pb-4 border-b border-steel/10">
              <CardTitle className="font-heading text-2xl text-hull flex items-center gap-3">
                <section.icon className="w-6 h-6 text-chart-cyan" />
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-plimsoll flex items-center justify-center text-deck-grey group-hover:text-chart-cyan transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-hull group-hover:text-chart-cyan transition-colors">{item.title}</p>
                        <p className="text-sm text-deck-grey font-mono mt-0.5">{item.type} · {item.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-deck-grey hover:text-chart-cyan hover:bg-chart-cyan/10">
                      <Download className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
