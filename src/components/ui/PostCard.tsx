import { Link } from 'react-router-dom';
import { REGIONS } from '@/lib/regions';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorPhoto?: string;
  date: string;
  readMinutes: number;
  coverImage: string;
  region: string; // empty string for global
}

interface PostCardProps {
  post: Post;
  showRegionBadge?: boolean;
}

export function PostCard({ post, showRegionBadge = true }: PostCardProps) {
  const regionConfig = post.region ? REGIONS.find(r => r.slug === post.region) : null;
  const accentColor = regionConfig ? regionConfig.accent : 'var(--accent)';
  
  // Decide the base URL
  const baseUrl = post.region ? `/${post.region}/insights` : '/news';

  return (
    <div className="mmg-card flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-steel/10">
        {showRegionBadge && regionConfig && (
          <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: accentColor }} />
        )}
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <span 
            className="px-2 py-1 text-xs font-mono font-medium text-white shadow-sm uppercase tracking-wider"
            style={{ backgroundColor: accentColor }}
          >
            {post.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <Link to={`${baseUrl}/${post.slug}`} className="group-hover:text-accent transition-colors">
          <h3 className="text-xl font-heading text-hull mb-3 line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-sm text-deck-grey mb-6 line-clamp-2 flex-1">{post.excerpt}</p>
        
        {/* Meta Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-steel/20 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-steel/30 overflow-hidden shrink-0">
              {post.authorPhoto ? (
                <img src={post.authorPhoto} alt={post.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-plimsoll text-deck-grey text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-medium text-hull">{post.author}</div>
              <div className="text-[10px] text-deck-grey font-mono uppercase">{post.date}</div>
            </div>
          </div>
          <div className="text-xs font-medium text-deck-grey bg-plimsoll px-2 py-1 rounded-[2px]">
            {post.readMinutes} min read
          </div>
        </div>
      </div>
    </div>
  );
}
