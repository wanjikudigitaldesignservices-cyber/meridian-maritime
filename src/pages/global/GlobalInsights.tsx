import { useState } from 'react';
import { REGIONS } from '@/lib/regions';
import { PostCard, type Post } from '@/components/ui/PostCard';
import { Search } from 'lucide-react';

const MOCK_GLOBAL_POSTS: Post[] = [
  { 
    id: '1', slug: 'q3-market-update', title: 'Q3 Market Update: Bunker Trends', 
    excerpt: 'An analysis of recent bunker fuel price fluctuations and their impact on operational costs across major trade routes.', 
    category: 'market-analysis', author: 'Reuben M.', date: 'Oct 12, 2026', readMinutes: 4, region: 'europe',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '2', slug: 'singapore-port-expansion', title: 'Singapore Port Expansion Impacts', 
    excerpt: 'How the new Tuas Mega Port phases are reshaping vessel turnaround times in the Malacca Strait.', 
    category: 'operations', author: 'Wei C.', date: 'Sep 28, 2026', readMinutes: 6, region: 'asia',
    coverImage: 'https://images.unsplash.com/photo-1582236968037-3e110ce25852?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '3', slug: 'antarctic-season-prep', title: 'Antarctic Season Preparation Guide', 
    excerpt: 'Essential compliance and provisioning checklists for research and expedition vessels heading south.', 
    category: 'regulatory', author: 'Lars O.', date: 'Sep 15, 2026', readMinutes: 8, region: 'antarctica',
    coverImage: 'https://images.unsplash.com/photo-1517783999520-f068d374bdc9?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '4', slug: 'new-customs-santos', title: 'Navigating New Customs Regulations in Santos', 
    excerpt: 'Brazil has implemented stricter documentation requirements for breakbulk cargo. Here is what you need to know.', 
    category: 'regulatory', author: 'Maria S.', date: 'Sep 02, 2026', readMinutes: 3, region: 'south-america',
    coverImage: 'https://images.unsplash.com/photo-1588602636230-019b8849b380?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '5', slug: 'decarbonization-milestones', title: 'Decarbonization Milestones Reached', 
    excerpt: 'Our managed fleet has hit a new low in CII ratings. Read the full sustainability report summary.', 
    category: 'sustainability', author: 'Elena V.', date: 'Aug 20, 2026', readMinutes: 5, region: '',
    coverImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop'
  }
];

export function GlobalInsights() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  let posts = MOCK_GLOBAL_POSTS;
  if (selectedRegion !== 'all') {
    posts = posts.filter(p => p.region === selectedRegion);
  }
  if (search) {
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="w-full bg-plimsoll min-h-screen">
      {/* Header */}
      <div className="bg-hull py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-6">Global Insights</h1>
          <p className="text-lg text-steel max-w-2xl mx-auto">
            Market analysis, operational updates, and industry perspectives from Meridian's experts across all seven continents.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors border ${
                selectedRegion === 'all' ? 'bg-hull text-white border-hull' : 'bg-white text-deck-grey border-steel/20 hover:border-hull'
              }`}
            >
              All Regions
            </button>
            {REGIONS.map(r => (
              <button
                key={r.slug}
                onClick={() => setSelectedRegion(r.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors border ${
                  selectedRegion === r.slug ? 'text-white' : 'bg-white text-deck-grey border-steel/20 hover:border-hull'
                }`}
                style={{ 
                  backgroundColor: selectedRegion === r.slug ? r.accent : undefined,
                  borderColor: selectedRegion === r.slug ? r.accent : undefined
                }}
              >
                {r.continent}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-5 h-5 text-deck-grey absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search insights..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-steel/20 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent text-hull"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} showRegionBadge={true} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-lg text-deck-grey">No insights found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
