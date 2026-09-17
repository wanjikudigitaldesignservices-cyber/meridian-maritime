import { useAdmin } from '@/contexts/AdminContext';
import { REGIONS } from '@/lib/regions';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Inbox, FileSignature, FileText, Briefcase, ChevronRight } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_LINE_DATA = Array.from({ length: 12 }).map((_, i) => ({
  week: `Wk ${i + 1}`,
  africa: Math.floor(Math.random() * 20) + 5,
  europe: Math.floor(Math.random() * 40) + 10,
  asia: Math.floor(Math.random() * 50) + 20,
  'north-america': Math.floor(Math.random() * 30) + 15,
  'south-america': Math.floor(Math.random() * 25) + 10,
  oceania: Math.floor(Math.random() * 15) + 5,
  antarctica: Math.floor(Math.random() * 5),
}));

const MOCK_BAR_DATA = [
  { service: 'Ship Agency', leads: 145 },
  { service: 'Bunkering', leads: 92 },
  { service: 'Customs Clearance', leads: 78 },
  { service: 'Crew Change', leads: 64 },
  { service: 'Offshore Support', leads: 45 },
  { service: 'Ship Management', leads: 32 },
  { service: 'Project Cargo', leads: 28 },
  { service: 'Tanker Lightering', leads: 21 },
];

const MOCK_RECENT_LEADS = [
  { id: '1', region: 'europe', service: 'Bunkering', contact: 'John Smith (Global Maritime)', status: 'new', date: '2 hours ago' },
  { id: '2', region: 'asia', service: 'Ship Agency', contact: 'Wei Chen (Pacific Lines)', status: 'contacted', date: '5 hours ago' },
  { id: '3', region: 'africa', service: 'Customs Clearance', contact: 'Sarah Jones (Logistics Ltd)', status: 'quoted', date: '1 day ago' },
  { id: '4', region: 'north-america', service: 'Offshore Support', contact: 'Mike Davis (Energy Corp)', status: 'new', date: '1 day ago' },
  { id: '5', region: 'oceania', service: 'Crew Change', contact: 'Anna Lee (TransOcean)', status: 'won', date: '2 days ago' },
];

const MOCK_DRAFTS = [
  { id: '1', title: 'Q3 Market Update: Bunker Trends', region: 'europe', status: 'draft', updated: '2 days ago' },
  { id: '2', title: 'Navigating New Customs Regulations in Santos', region: 'south-america', status: 'review', updated: '3 days ago' },
  { id: '3', title: 'Antarctic Season Preparation Guide', region: 'antarctica', status: 'draft', updated: '1 week ago' },
];
// -----------------

export function AdminDashboard() {
  const { selectedRegion } = useAdmin();

  // Filter data if a region is selected
  const activeRegions = selectedRegion 
    ? REGIONS.filter(r => r.slug === selectedRegion) 
    : REGIONS;

  const leads = selectedRegion 
    ? MOCK_RECENT_LEADS.filter(l => l.region === selectedRegion)
    : MOCK_RECENT_LEADS;

  const drafts = selectedRegion
    ? MOCK_DRAFTS.filter(d => d.region === selectedRegion)
    : MOCK_DRAFTS;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading text-hull mb-1">Dashboard</h1>
        <p className="text-deck-grey text-sm">
          {selectedRegion 
            ? `Viewing metrics for ${REGIONS.find(r => r.slug === selectedRegion)?.entityName}`
            : 'Global metrics across all regions'}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'New Leads (7d)', value: selectedRegion ? '12' : '84', icon: Inbox, color: 'text-blue-500' },
          { label: 'Open Applications', value: selectedRegion ? '3' : '27', icon: FileSignature, color: 'text-purple-500' },
          { label: 'Published Posts (30d)', value: selectedRegion ? '2' : '15', icon: FileText, color: 'text-green-500' },
          { label: 'Active Jobs', value: selectedRegion ? '41' : '312', icon: Briefcase, color: 'text-orange-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-steel/20 rounded-sm p-4 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-xs font-medium text-deck-grey uppercase mb-1">{stat.label}</div>
              <div className="text-3xl font-heading text-hull">{stat.value}</div>
            </div>
            <div className={`p-2 bg-plimsoll rounded-sm ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white border border-steel/20 rounded-sm p-5 shadow-sm">
          <h2 className="text-sm font-heading text-hull mb-6">Leads per Week (Last 12 Weeks)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_LINE_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', fontSize: '12px', border: '1px solid #cbd5e1' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                {activeRegions.map(region => (
                  <Line 
                    key={region.slug}
                    type="monotone" 
                    dataKey={region.slug} 
                    name={region.continent}
                    stroke={region.accent} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-steel/20 rounded-sm p-5 shadow-sm">
          <h2 className="text-sm font-heading text-hull mb-6">Leads by Service (Top 8)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BAR_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="service" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '2px', fontSize: '12px', border: '1px solid #cbd5e1' }}
                />
                <Bar dataKey="leads" fill="var(--hull)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads Table */}
        <div className="lg:col-span-2 bg-white border border-steel/20 rounded-sm shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-steel/20 flex justify-between items-center bg-plimsoll/30">
            <h2 className="text-sm font-heading text-hull">Recent Leads</h2>
            <Link to="/admin/leads" className="text-xs text-accent hover:underline flex items-center">
              View all <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-plimsoll/50 text-deck-grey text-xs uppercase font-mono">
                <tr>
                  <th className="px-4 py-3 font-medium">Region</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel/10">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-plimsoll/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 bg-plimsoll px-2 py-0.5 rounded-[2px] text-xs font-medium text-hull border border-steel/20">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: REGIONS.find(r => r.slug === lead.region)?.accent }}></span>
                        {REGIONS.find(r => r.slug === lead.region)?.continent}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-hull">{lead.contact}</div>
                      <div className="text-xs text-deck-grey">{lead.date}</div>
                    </td>
                    <td className="px-4 py-3 text-deck-grey">{lead.service}</td>
                    <td className="px-4 py-3">
                      <select 
                        defaultValue={lead.status}
                        className="bg-plimsoll border border-steel/20 text-xs px-2 py-1 rounded-[2px] focus:outline-none focus:border-accent capitalize"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-deck-grey text-sm">No recent leads for this region.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drafts Panel */}
        <div className="bg-white border border-steel/20 rounded-sm shadow-sm flex flex-col">
          <div className="p-4 border-b border-steel/20 flex justify-between items-center bg-plimsoll/30">
            <h2 className="text-sm font-heading text-hull">In Progress Posts</h2>
            <Link to="/admin/posts" className="text-xs text-accent hover:underline flex items-center">
              All posts <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-4">
              {drafts.map(draft => (
                <div key={draft.id} className="group border border-steel/20 rounded-sm p-3 hover:border-accent transition-colors relative">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center gap-1.5 bg-plimsoll px-1.5 py-0.5 rounded-[2px] text-[10px] font-medium text-hull uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: REGIONS.find(r => r.slug === draft.region)?.accent }}></span>
                      {draft.region}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded-[2px] ${
                      draft.status === 'review' ? 'bg-orange-100 text-orange-800' : 'bg-steel/20 text-deck-grey'
                    }`}>
                      {draft.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-hull mb-3 leading-snug group-hover:text-accent transition-colors">
                    {draft.title}
                  </h3>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-deck-grey">Updated {draft.updated}</span>
                    <Link to={`/admin/posts/${draft.id}`} className="text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Continue editing &rarr;
                    </Link>
                  </div>
                </div>
              ))}
              {drafts.length === 0 && (
                <div className="text-center py-8 text-deck-grey text-sm">
                  No posts currently in draft or review.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
