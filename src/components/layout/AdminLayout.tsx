import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { REGIONS } from '@/lib/regions';
import { 
  LayoutDashboard, FileText, Newspaper, Tags, Image as ImageIcon, 
  Inbox, Briefcase, FileSignature, Map, Layers, Anchor, 
  MapPin, Ship, Users, Settings, LogOut, ChevronLeft,
  Menu
} from 'lucide-react';

const SIDEBAR_NAV = [
  {
    section: 'Dashboard',
    items: [
      { name: 'Overview', to: '/admin', icon: LayoutDashboard, exact: true }
    ]
  },
  {
    section: 'Content',
    items: [
      { name: 'Posts & Insights', to: '/admin/posts', icon: FileText },
      { name: 'News & Press', to: '/admin/news', icon: Newspaper },
      { name: 'Categories', to: '/admin/categories', icon: Tags },
      { name: 'Media Library', to: '/admin/media', icon: ImageIcon }
    ]
  },
  {
    section: 'Operations',
    items: [
      { name: 'Leads & Enquiries', to: '/admin/leads', icon: Inbox },
      { name: 'Jobs', to: '/admin/jobs', icon: Briefcase },
      { name: 'Applications', to: '/admin/applications', icon: FileSignature }
    ]
  },
  {
    section: 'Directory',
    items: [
      { name: 'Regions', to: '/admin/regions', icon: Map },
      { name: 'Services', to: '/admin/services', icon: Layers },
      { name: 'Region Services', to: '/admin/region-services', icon: Anchor },
      { name: 'Ports', to: '/admin/ports', icon: MapPin },
      { name: 'Vessels', to: '/admin/vessels', icon: Ship },
      { name: 'People', to: '/admin/people', icon: Users }
    ]
  },
  {
    section: 'System',
    items: [
      { name: 'Users & Roles', to: '/admin/users', icon: Users },
      { name: 'Settings', to: '/admin/settings', icon: Settings }
    ]
  }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAdminGuard();
  const { isSidebarOpen, setIsSidebarOpen, selectedRegion, setSelectedRegion } = useAdmin();

  return (
    <div className="flex h-screen bg-plimsoll overflow-hidden font-body">
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-hull text-plimsoll flex flex-col transition-all duration-300 border-r border-steel/20 relative z-20`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-steel/20 shrink-0">
          {isSidebarOpen ? (
            <div className="font-heading font-medium text-white truncate">MMG Admin</div>
          ) : (
            <div className="font-heading font-bold text-white text-center w-full">M</div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-steel hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5 absolute right-0 left-0 mx-auto" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-steel/30">
          {SIDEBAR_NAV.map((group) => (
            <div key={group.section} className="mb-6">
              {isSidebarOpen && (
                <div className="px-4 text-xs font-mono text-steel uppercase tracking-wider mb-2">
                  {group.section}
                </div>
              )}
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={'exact' in item ? item.exact : false}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive 
                          ? 'bg-steel/20 text-accent border-r-2 border-accent' 
                          : 'text-plimsoll/80 hover:bg-steel/10 hover:text-white'
                      }`
                    }
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-steel/20 text-xs">
          {isSidebarOpen ? (
            <button className="flex items-center text-plimsoll/60 hover:text-white transition-colors w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          ) : (
            <button className="flex justify-center text-plimsoll/60 hover:text-white transition-colors w-full" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-steel/10 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Region Filter */}
            <div className="flex items-center text-sm">
              <span className="text-deck-grey mr-2 hidden sm:inline">Region Filter:</span>
              <select 
                value={selectedRegion || 'all'}
                onChange={(e) => setSelectedRegion(e.target.value === 'all' ? null : e.target.value)}
                className="bg-plimsoll border border-steel/20 rounded-sm px-2 py-1 text-sm focus:outline-none focus:border-accent text-hull"
                disabled={user.role === 'regional_editor'} // Locked if regional editor
              >
                <option value="all">Global (All Regions)</option>
                {REGIONS.map(r => (
                  <option key={r.slug} value={r.slug}>{r.entityName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-hull leading-tight">{user.full_name}</div>
              <div className="text-xs text-deck-grey mt-0.5 flex items-center justify-end gap-2">
                <span className="bg-hull text-white px-1.5 py-0.5 rounded-[2px] uppercase text-[10px] tracking-wider">
                  {user.role.replace('_', ' ')}
                </span>
                {user.role === 'regional_editor' && user.region_id && (
                  <span className="text-accent">{REGIONS.find(r => r.slug === user.region_id)?.continent}</span>
                )}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-medium text-sm">
              {user.full_name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
