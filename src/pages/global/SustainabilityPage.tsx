import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Leaf, Ship, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ciiData = [
  { rating: 'A', count: 12, fill: '#1E7A5F' },
  { rating: 'B', count: 8, fill: '#2E8BA8' },
  { rating: 'C', count: 4, fill: '#E0A526' },
  { rating: 'D', count: 0, fill: '#B4531F' },
  { rating: 'E', count: 0, fill: '#C8102E' }
];

export function SustainabilityPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-hull text-white pt-24 pb-32 px-4 md:px-12">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
            <Leaf className="w-4 h-4" /> Group Sustainability
          </div>
          <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">Navigating the Transition</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            From IMO compliance to EU ETS and alternative fuels, Meridian Maritime Group is committed to practical decarbonisation across our managed fleet and operations.
          </p>
        </div>
      </section>

      <section className="py-24 bg-plimsoll px-4 md:px-12 -mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-steel/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-2xl text-hull flex items-center gap-3">
                  <Ship className="w-6 h-6 text-chart-cyan" />
                  Fleet CII Distribution (2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-deck-grey mb-8">
                  100% of the Meridian managed fleet operates at Carbon Intensity Indicator (CII) Rating C or higher, ensuring continued compliance and charterability.
                </p>
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ciiData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <XAxis dataKey="rating" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 'bold' }} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'rgba(22, 48, 74, 0.05)' }}
                        contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {ciiData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-sm border border-steel/10">
                <Shield className="w-8 h-8 text-hull mb-4" />
                <h3 className="font-heading font-semibold text-2xl text-hull mb-3">EU ETS & FuelEU Maritime</h3>
                <p className="text-deck-grey leading-relaxed">
                  Our European division provides end-to-end advisory for EU ETS compliance, including allowance surrender strategies and FuelEU Maritime pooling arrangements to minimise exposure for operators calling at European ports.
                </p>
                <Button asChild variant="link" className="mt-4 p-0 text-chart-cyan">
                  <Link to="/europe/services/emissions-advisory">View Emissions Advisory <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>

              <div className="bg-white p-8 rounded-sm border border-steel/10">
                <Leaf className="w-8 h-8 text-hull mb-4" />
                <h3 className="font-heading font-semibold text-2xl text-hull mb-3">Alternative Fuels</h3>
                <p className="text-deck-grey leading-relaxed">
                  As the world's largest bunkering hub, our Singapore and Rotterdam operations are pioneering the supply of bio-blends (B24) and LNG, backed by mass flow metering for absolute transparency.
                </p>
                <Button asChild variant="link" className="mt-4 p-0 text-chart-cyan">
                  <Link to="/europe/services/bunkering">View Bunkering Services <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-4 md:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading font-bold text-3xl text-hull mb-6">Corporate Sustainability Report</h2>
          <p className="text-lg text-deck-grey mb-8">
            Detailed metrics on our Scope 1, 2, and 3 emissions, diversity initiatives, and governance structure are available in our annual sustainability report.
          </p>
          <Button asChild size="lg" className="bg-hull text-white rounded-sm h-12 px-8">
            <Link to="/downloads">Download 2025 Report (PDF)</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
