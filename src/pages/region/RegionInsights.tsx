import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { REGIONS } from '@/lib/regions';
import { PostCard, type Post } from '@/components/ui/PostCard';
import { Search } from 'lucide-react';

const MOCK_REGION_POSTS: Post[] = [
  { 
    id: '1', slug: 'q3-market-update', title: 'Q3 Market Update: Bunker Trends', 
    excerpt: 'An analysis of recent bunker fuel price fluctuations and their impact on operational costs across major trade routes.', 
    category: 'market-analysis', author: 'Reuben M.', date: 'Oct 12, 2026', readMinutes: 4, region: 'europe',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '1a', slug: 'eu-ets-compliance', title: 'EU ETS Compliance for 2027', 
    excerpt: 'Prepare your fleet for the upcoming phase of European Emissions Trading System requirements.', 
    category: 'regulatory', author: 'Reuben M.', date: 'Oct 01, 2026', readMinutes: 5, region: 'europe',
    coverImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop'
  }
];

export function RegionInsights() {
  const { regionId } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  if (!region) return null;

  // Filter mock data for this region
  let posts = MOCK_REGION_POSTS.filter(p => p.region === regionId);
  
  if (category !== 'all') {
    posts = posts.filter(p => p.category === category);
  }
  if (search) {
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    );
  }

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const gridPosts = posts.slice(1);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-hull py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-16 h-1 mb-6" style={{ backgroundColor: region.accent }} />
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">{region.entityName} Insights</h1>
          <p className="text-lg text-steel max-w-2xl">
            Local intelligence, market updates, and operational guidance from our experts across {region.continent}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1">
            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
              <div className="flex gap-2">
                {['all', 'market-analysis', 'regulatory', 'operations'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors border ${
                      category === cat ? 'text-white border-transparent' : 'bg-white text-deck-grey border-steel/30 hover:border-hull'
                    }`}
                    style={{ backgroundColor: category === cat ? region.accent : undefined }}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-deck-grey absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white border border-steel/20 rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-accent text-hull"
                />
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && category === 'all' && !search && (
              <div className="mb-12 group cursor-pointer" onClick={() => window.location.href = `/${region.slug}/insights/${featuredPost.slug}`}>
                <div className="relative aspect-[21/9] w-full overflow-hidden mb-6 bg-steel/10">
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span 
                      className="px-3 py-1.5 text-xs font-mono font-medium text-white shadow-sm uppercase tracking-wider"
                      style={{ backgroundColor: region.accent }}
                    >
                      {featuredPost.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl font-heading text-hull mb-4 group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-base text-deck-grey mb-4 max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-hull">{featuredPost.author}</div>
                  <div className="w-1 h-1 rounded-full bg-steel" />
                  <div className="text-xs text-deck-grey font-mono uppercase">{featuredPost.date}</div>
                  <div className="w-1 h-1 rounded-full bg-steel" />
                  <div className="text-xs font-medium text-deck-grey">{featuredPost.readMinutes} min read</div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gridPosts.map(post => (
                <PostCard key={post.id} post={post} showRegionBadge={false} />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-20 bg-white border border-steel/20 rounded-sm">
                <p className="text-deck-grey">No posts found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-12">
            
            {/* Newsletter */}
            <div className="bg-hull p-6 rounded-sm text-white">
              <h3 className="text-xl font-heading mb-2">Stay Updated</h3>
              <p className="text-sm text-steel mb-4">Get the latest {region.continent} maritime news delivered to your inbox.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-plimsoll border-none rounded-sm px-3 py-2 text-sm text-hull focus:ring-2 focus:ring-accent outline-none"
                  required
                />
                <button 
                  type="submit"
                  className="w-full py-2 text-sm font-medium text-white rounded-sm transition-colors"
                  style={{ backgroundColor: region.accent }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-sm font-heading uppercase text-hull mb-4 tracking-wider">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Bunkering', 'Compliance', 'Offshore', 'Port Congestion', 'Sustainability'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-medium text-deck-grey bg-white border border-steel/20 rounded-sm hover:border-hull hover:text-hull cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
