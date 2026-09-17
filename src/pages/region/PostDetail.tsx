import { useParams, Link } from 'react-router-dom';
import { REGIONS } from '@/lib/regions';
import { parseMarkdown } from '@/lib/markdown';
import { Share2, Mail } from 'lucide-react';
import { useEffect } from 'react';

const MOCK_POST = {
  id: '1', 
  slug: 'q3-market-update', 
  title: 'Q3 Market Update: Bunker Trends', 
  excerpt: 'An analysis of recent bunker fuel price fluctuations and their impact on operational costs across major trade routes.', 
  category: 'market-analysis', 
  author: 'Reuben M.', 
  authorTitle: 'Head of Analytics',
  date: 'Oct 12, 2026', 
  readMinutes: 4, 
  region: 'europe',
  coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
  tags: ['Bunkering', 'Market Analysis', 'Fuel'],
  body: `
The global bunker fuel market has experienced significant volatility in the third quarter, driven by a combination of geopolitical tensions, changing refining capacities, and the continued rollout of alternative fuel infrastructure.

### The Shift to Low-Sulfur Alternatives

As the industry pushes toward its 2030 decarbonization goals, the premium for Very Low Sulfur Fuel Oil (VLSFO) has remained relatively stable, though localized spikes have been observed in key bunkering hubs such as Singapore and Rotterdam.

* **Rotterdam:** Steady supply has kept premiums in check.
* **Singapore:** Increased port congestion has led to minor delays in barge availability.
* **Fujairah:** Strategic reserves have buffered against recent crude fluctuations.

> "The transition period requires not just investment in new fuels, but a tactical approach to current procurement strategies." — Reuben M.

### Looking Ahead

Ship operators must remain agile. The integration of real-time fuel consumption monitoring is no longer optional; it is a critical component of voyage optimization. 

For a detailed breakdown of price projections for Q4, please download our comprehensive report available in the client portal.
`
};

export function PostDetail() {
  const { regionId, postSlug } = useParams();
  const region = REGIONS.find(r => r.slug === regionId);

  // SEO Effect (Simulated Helmet)
  useEffect(() => {
    document.title = `${MOCK_POST.title} - Meridian Maritime Group`;
    
    // In a real app, we would update meta tags here or use react-helmet
    return () => {
      document.title = 'Meridian Maritime Group';
    };
  }, [postSlug]);

  if (!region || postSlug !== MOCK_POST.slug) return (
    <div className="py-24 text-center">Post not found.</div>
  );

  return (
    <div className="w-full bg-plimsoll min-h-screen pb-24">
      {/* Cover Image */}
      <div className="w-full h-[300px] md:h-[480px] relative bg-steel">
        <img 
          src={MOCK_POST.coverImage} 
          alt={MOCK_POST.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hull/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
        
        {/* Post Header Card */}
        <div className="bg-white border border-steel/20 shadow-lg p-8 md:p-12 mb-12">
          
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider font-mono text-deck-grey mb-6">
            <Link to={`/${region.slug}`} className="hover:text-accent transition-colors">{region.entityName}</Link>
            <span>/</span>
            <Link to={`/${region.slug}/insights`} className="hover:text-accent transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-accent" style={{ color: region.accent }}>{MOCK_POST.category.replace('-', ' ')}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading text-hull mb-6 leading-tight">
            {MOCK_POST.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-steel/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-steel/30 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-plimsoll text-deck-grey text-sm font-bold">
                  {MOCK_POST.author.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-hull">{MOCK_POST.author}</div>
                <div className="text-xs text-deck-grey">{MOCK_POST.authorTitle}</div>
              </div>
            </div>
            
            <div className="w-px h-8 bg-steel/20 hidden sm:block" />
            
            <div className="text-xs font-mono uppercase tracking-wider text-deck-grey">
              <div>Published</div>
              <div className="font-medium text-hull font-sans normal-case mt-0.5">{MOCK_POST.date}</div>
            </div>

            <div className="w-px h-8 bg-steel/20 hidden sm:block" />

            <div className="text-xs font-mono uppercase tracking-wider text-deck-grey">
              <div>Read Time</div>
              <div className="font-medium text-hull font-sans normal-case mt-0.5">{MOCK_POST.readMinutes} min</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Share Sidebar (Sticky Desktop) */}
          <div className="w-full md:w-12 shrink-0 md:border-r md:border-steel/20 md:pr-4">
            <div className="md:sticky md:top-24 flex md:flex-col gap-4">
              <span className="text-[10px] font-mono text-deck-grey uppercase tracking-wider mb-2 hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Share Article</span>
              <button className="w-10 h-10 rounded-full bg-white border border-steel/20 flex items-center justify-center text-deck-grey hover:text-hull hover:border-hull transition-colors font-medium text-xs">
                in
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-steel/20 flex items-center justify-center text-deck-grey hover:text-hull hover:border-hull transition-colors font-medium text-xs">
                X
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-steel/20 flex items-center justify-center text-deck-grey hover:text-hull hover:border-hull transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-steel/20 flex items-center justify-center text-deck-grey hover:text-hull hover:border-hull transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="flex-1 min-w-0">
            
            <div className="text-lg text-deck-grey leading-relaxed mb-8 font-medium">
              {MOCK_POST.excerpt}
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-hull prose-a:text-accent prose-p:text-hull prose-p:leading-[1.8] prose-blockquote:border-l-4 prose-blockquote:bg-white prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-hull prose-blockquote:shadow-sm"
              style={{ '--tw-prose-links': region.accent, '--tw-prose-quote-borders': region.accent } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(MOCK_POST.body) }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-steel/20 flex flex-wrap gap-2">
              <span className="text-sm font-medium text-deck-grey mr-2 flex items-center">Tags:</span>
              {MOCK_POST.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-steel/20 text-xs font-medium text-deck-grey rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* CTA Block */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="bg-hull p-8 md:p-12 rounded-sm text-center">
          <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
            Need this handled in {region.primaryPort}?
          </h2>
          <p className="text-steel mb-8 max-w-2xl mx-auto">
            Our {region.entityName} team is ready to assist with your operational requirements.
          </p>
          <Link 
            to={`/${region.slug}/quote`}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 rounded-[2px]"
            style={{ backgroundColor: region.accent }}
          >
            Talk to our {region.continent} team
          </Link>
        </div>
      </div>
    </div>
  );
}
