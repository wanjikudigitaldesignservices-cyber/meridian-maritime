import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { REGIONS } from '@/lib/regions';
import { parseMarkdown } from '@/lib/markdown';
import { EditorToolbar } from '@/components/admin/EditorToolbar';
import { Save, Eye, Send, UploadCloud, X, AlertCircle, ChevronLeft } from 'lucide-react';

export function PostEditor() {
  const { user } = useAdminGuard();
  const { id } = useParams();
  const isNew = id === 'new' || !id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('draft');
  const [region, setRegion] = useState(user.role === 'regional_editor' && user.region_id ? user.region_id : '');
  const [type, setType] = useState('insight');
  const [category, setCategory] = useState('');
  
  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // SEO
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  
  // Cover Image
  const [coverImage, setCoverImage] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isNew]);

  // Mock Autosave
  useEffect(() => {
    if (!title && !body) return;
    
    const timer = setTimeout(() => {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        setLastSaved(new Date());
        setIsSaving(false);
      }, 500);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [title, body, excerpt, tags, category, region, status]);

  const handleInsert = (prefix: string, suffix = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    let insertion = defaultText;
    if (start !== end) {
      insertion = currentVal.substring(start, end);
    }

    const newVal = currentVal.substring(0, start) + prefix + insertion + suffix + currentVal.substring(end);
    setBody(newVal);

    // Reset selection focus inside the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + insertion.length);
    }, 0);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,/, '').replace(/,$/, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const calculateReadTime = () => {
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 220));
  };

  const handlePublish = () => {
    const newErrors = [];
    if (!title) newErrors.push('Title is required');
    if (!slug) newErrors.push('URL slug is required');
    if (!excerpt) newErrors.push('Excerpt is required');
    if (!body) newErrors.push('Post body is required');
    if (!coverImage) newErrors.push('Cover image is required');
    if (!region && type !== 'news') newErrors.push('Region is required for insights');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setStatus('published');
    // Simulate save
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      alert('Post published successfully!');
    }, 800);
  };

  const handleSaveDraft = () => {
    setStatus('draft');
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <Link to="/admin/posts" className="text-sm text-deck-grey hover:text-hull inline-flex items-center mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to posts
          </Link>
          <h1 className="text-2xl font-heading text-hull">
            {isNew ? 'Create New Post' : 'Edit Post'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-xs text-deck-grey mr-2">
              {isSaving ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
            </span>
          )}
          <button 
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-plimsoll border border-steel/30 text-hull text-sm font-medium rounded-sm hover:bg-steel/10 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save draft
          </button>
          <button 
            className="px-4 py-2 bg-plimsoll border border-steel/30 text-hull text-sm font-medium rounded-sm hover:bg-steel/10 transition-colors flex items-center gap-2"
            title="Preview in new tab"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button 
            onClick={handlePublish}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-sm">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Cannot publish post</h3>
              <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                {errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (70%) */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* Title & Slug */}
          <div className="bg-white border border-steel/20 rounded-sm p-6 shadow-sm">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Post Title..."
              className="w-full text-3xl font-heading text-hull border-none focus:ring-0 p-0 mb-2 placeholder:text-steel"
            />
            <div className="flex items-center text-sm text-deck-grey group">
              <span className="shrink-0 mr-1">meridianmaritime.com/{region || 'global'}/insights/</span>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="your-slug"
                className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-sm text-hull font-mono hover:bg-plimsoll focus:bg-plimsoll transition-colors rounded-sm px-1"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-steel/20 rounded-sm p-6 shadow-sm">
            <label className="block text-sm font-medium text-hull mb-2">
              Excerpt <span className="text-deck-grey font-normal">(Shown in post cards)</span>
            </label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              maxLength={200}
              rows={3}
              className="w-full bg-plimsoll border border-steel/20 rounded-sm p-3 text-sm focus:outline-none focus:border-accent text-hull resize-none"
              placeholder="Brief summary of the post..."
            />
            <div className="text-right text-xs text-deck-grey mt-1">
              {excerpt.length}/200 characters
            </div>
          </div>

          {/* Body Editor */}
          <div className="bg-white border border-steel/20 rounded-sm shadow-sm flex flex-col min-h-[600px]">
            <div className="flex items-center border-b border-steel/20 px-4">
              <button
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'write' ? 'border-accent text-hull' : 'border-transparent text-deck-grey hover:text-hull'
                }`}
                onClick={() => setActiveTab('write')}
              >
                Write
              </button>
              <button
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'preview' ? 'border-accent text-hull' : 'border-transparent text-deck-grey hover:text-hull'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>

            {activeTab === 'write' ? (
              <div className="flex flex-col flex-1 p-4">
                <EditorToolbar onInsert={handleInsert} />
                <textarea
                  ref={textareaRef}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className="flex-1 w-full bg-plimsoll border border-steel/20 rounded-b-sm p-4 text-sm focus:outline-none focus:border-accent text-hull font-mono resize-y min-h-[500px]"
                  placeholder="Write your post content in Markdown..."
                />
                <div className="flex justify-between items-center mt-3 text-xs text-deck-grey px-1">
                  <span>{body.length} characters · {body.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <span>~{calculateReadTime()} min read</span>
                </div>
              </div>
            ) : (
              <div className="p-6 flex-1 bg-white">
                {body ? (
                  <div 
                    className="prose prose-sm md:prose-base max-w-none prose-headings:font-heading prose-headings:text-hull prose-a:text-accent prose-blockquote:border-l-accent prose-blockquote:bg-plimsoll prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-hull"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(body) }}
                  />
                ) : (
                  <div className="text-center text-deck-grey py-20">Nothing to preview yet.</div>
                )}
              </div>
            )}
          </div>
          
          {/* SEO Details */}
          <div className="bg-white border border-steel/20 rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-heading text-hull mb-4">Search Engine Optimization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hull mb-1">SEO Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                  placeholder={title || 'Leave blank to use post title'}
                  className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2.5 text-sm focus:outline-none focus:border-accent"
                />
                <div className="text-right text-xs text-deck-grey mt-1">{seoTitle.length}/60</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-hull mb-1">SEO Description</label>
                <textarea
                  value={seoDesc}
                  onChange={e => setSeoDesc(e.target.value)}
                  placeholder={excerpt || 'Leave blank to use post excerpt'}
                  rows={2}
                  className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2.5 text-sm focus:outline-none focus:border-accent resize-none"
                />
                <div className="text-right text-xs text-deck-grey mt-1">{seoDesc.length}/155</div>
              </div>
              
              {/* Google Preview */}
              <div className="mt-4 p-4 border border-steel/20 rounded-sm bg-white font-sans">
                <div className="text-[12px] text-[#202124] mb-1">
                  meridianmaritime.com › {region || 'global'} › insights › {slug || 'your-slug'}
                </div>
                <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer mb-1 truncate leading-tight">
                  {seoTitle || title || 'Post Title Preview'} - Meridian Maritime Group
                </div>
                <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-snug">
                  {seoDesc || excerpt || 'This is how your page description will appear in search results. Ensure it is compelling and accurately describes the content.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (30%) - Sticky Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="sticky top-6 space-y-6">
            
            {/* Publishing Settings */}
            <div className="bg-white border border-steel/20 rounded-sm p-5 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2 text-sm focus:outline-none focus:border-accent"
                >
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Region</label>
                {user.role === 'regional_editor' ? (
                  <div className="w-full bg-plimsoll/50 border border-steel/10 rounded-sm p-2 text-sm text-deck-grey cursor-not-allowed flex items-center justify-between">
                    <span>{REGIONS.find(r => r.slug === user.region_id)?.entityName || user.region_id}</span>
                    <span className="text-xs bg-steel/20 px-1.5 py-0.5 rounded-[2px]">Locked</span>
                  </div>
                ) : (
                  <select
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2 text-sm focus:outline-none focus:border-accent"
                  >
                    <option value="">Group-level (No region)</option>
                    {REGIONS.map(r => (
                      <option key={r.slug} value={r.slug}>{r.entityName}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Post Type</label>
                <div className="flex bg-plimsoll border border-steel/20 rounded-sm p-1">
                  <button
                    onClick={() => setType('insight')}
                    className={`flex-1 text-sm py-1 rounded-[2px] transition-colors ${type === 'insight' ? 'bg-white shadow-sm text-hull font-medium' : 'text-deck-grey hover:text-hull'}`}
                  >
                    Insight
                  </button>
                  <button
                    onClick={() => setType('news')}
                    className={`flex-1 text-sm py-1 rounded-[2px] transition-colors ${type === 'news' ? 'bg-white shadow-sm text-hull font-medium' : 'text-deck-grey hover:text-hull'}`}
                  >
                    News
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2 text-sm focus:outline-none focus:border-accent"
                >
                  <option value="">Select category...</option>
                  <option value="market-analysis">Market Analysis</option>
                  <option value="operations">Operations</option>
                  <option value="sustainability">Sustainability</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Tags</label>
                <div className="border border-steel/20 rounded-sm bg-plimsoll p-1.5 flex flex-wrap gap-1.5 focus-within:border-accent transition-colors">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-white border border-steel/20 text-xs px-2 py-1 rounded-[2px] text-hull">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="text-deck-grey hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={tags.length === 0 ? "Add tags (comma to save)..." : ""}
                    className="flex-1 min-w-[120px] bg-transparent border-none p-1 text-sm focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-hull mb-1.5">Publish Date</label>
                <input
                  type="datetime-local"
                  className="w-full bg-plimsoll border border-steel/20 rounded-sm p-2 text-sm focus:outline-none focus:border-accent text-hull"
                />
                <p className="text-xs text-deck-grey mt-1">If set in the future, post will remain hidden until then.</p>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white border border-steel/20 rounded-sm p-5 shadow-sm">
              <label className="block text-sm font-medium text-hull mb-2">Cover Image (16:9)</label>
              
              {coverImage ? (
                <div className="relative group rounded-sm overflow-hidden border border-steel/20">
                  <img src={coverImage} alt="Cover preview" className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-hull/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setCoverImage('')}
                      className="px-3 py-1.5 bg-white text-red-600 text-xs font-medium rounded-sm hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-steel/30 rounded-sm p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-plimsoll/50 hover:border-accent transition-colors aspect-video group"
                  onClick={() => setCoverImage('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop')}
                >
                  <UploadCloud className="w-8 h-8 text-steel mb-2 group-hover:text-accent transition-colors" />
                  <div className="text-sm font-medium text-hull mb-1">Click to upload</div>
                  <div className="text-xs text-deck-grey">SVG, PNG, JPG or GIF (max. 5MB)</div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
