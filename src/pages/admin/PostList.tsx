import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { REGIONS } from '@/lib/regions';
import { Plus, Search, Filter, Edit2, Eye, Trash2 } from 'lucide-react';

const MOCK_POSTS = [
  { id: '1', title: 'Q3 Market Update: Bunker Trends', region: 'europe', type: 'insight', category: 'market-analysis', status: 'published', author: 'Reuben M.', date: 'Oct 12, 2026' },
  { id: '2', title: 'Navigating New Customs Regulations in Santos', region: 'south-america', type: 'insight', category: 'regulatory', status: 'review', author: 'Maria S.', date: '-' },
  { id: '3', title: 'Antarctic Season Preparation Guide', region: 'antarctica', type: 'insight', category: 'operations', status: 'draft', author: 'Lars O.', date: '-' },
  { id: '4', title: 'Meridian Appoints New Head of Ocean Logistics', region: '', type: 'news', category: 'corporate', status: 'published', author: 'Corporate Comms', date: 'Oct 01, 2026' },
  { id: '5', title: 'Singapore Port Expansion Impacts', region: 'asia', type: 'insight', category: 'market-analysis', status: 'published', author: 'Wei C.', date: 'Sep 28, 2026' },
];

export function PostList() {
  const { user } = useAdminGuard();
  const { selectedRegion } = useAdmin();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter logic
  let filteredPosts = MOCK_POSTS;
  
  // If user is regional_editor, lock to their region
  if (user.role === 'regional_editor' && user.region_id) {
    filteredPosts = filteredPosts.filter(p => p.region === user.region_id);
  } else if (selectedRegion) {
    // Admin filtering via context
    filteredPosts = filteredPosts.filter(p => p.region === selectedRegion);
  }

  if (statusFilter !== 'all') {
    filteredPosts = filteredPosts.filter(p => p.status === statusFilter);
  }

  if (search) {
    filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-hull mb-1">Posts & Insights</h1>
          <p className="text-deck-grey text-sm">Manage blog posts and corporate news.</p>
        </div>
        <Link 
          to="/admin/posts/new"
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-steel/20 rounded-sm p-4 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-deck-grey absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-plimsoll border border-steel/20 rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-deck-grey" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-plimsoll border border-steel/20 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="review">In Review</option>
              <option value="draft">Drafts</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-steel/20 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-plimsoll/50 text-deck-grey text-xs uppercase font-mono border-b border-steel/20">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Region</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel/10">
            {filteredPosts.map(post => (
              <tr key={post.id} className="hover:bg-plimsoll/30 transition-colors group">
                <td className="px-6 py-4">
                  <Link to={`/admin/posts/${post.id}`} className="font-medium text-hull hover:text-accent transition-colors block truncate max-w-sm">
                    {post.title}
                  </Link>
                  <div className="text-xs text-deck-grey mt-0.5">
                    {post.type === 'news' ? 'Press Release' : 'Insight'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {post.region ? (
                    <span className="inline-flex items-center gap-1.5 bg-plimsoll px-2 py-0.5 rounded-[2px] text-xs font-medium text-hull border border-steel/20">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: REGIONS.find(r => r.slug === post.region)?.accent }}></span>
                      {REGIONS.find(r => r.slug === post.region)?.continent}
                    </span>
                  ) : (
                    <span className="text-deck-grey text-xs">Global</span>
                  )}
                </td>
                <td className="px-6 py-4 text-deck-grey capitalize">{post.category.replace('-', ' ')}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-[2px] ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' :
                    post.status === 'review' ? 'bg-orange-100 text-orange-800' :
                    'bg-steel/20 text-deck-grey'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-hull">{post.author}</div>
                  <div className="text-xs text-deck-grey">{post.date}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-deck-grey hover:text-hull rounded-sm hover:bg-steel/10 transition-colors" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link to={`/admin/posts/${post.id}`} className="p-1.5 text-deck-grey hover:text-accent rounded-sm hover:bg-steel/10 transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-deck-grey hover:text-red-600 rounded-sm hover:bg-steel/10 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-deck-grey text-sm">
                  No posts found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
