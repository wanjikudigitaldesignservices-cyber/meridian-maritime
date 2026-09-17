import { Outlet } from 'react-router-dom';
import { RegionHeader } from './RegionHeader';
import { EmergencyBar } from './EmergencyBar';
import { useRegion } from '@/hooks/useRegion';
import { Footer } from './Footer';

export function RegionLayout() {
  const { region } = useRegion();

  if (!region) return null; // This case is handled by RegionGuard

  return (
    <div 
      className="min-h-screen flex flex-col bg-background font-body"
      style={{ '--accent': region.accent } as React.CSSProperties}
    >
      <EmergencyBar region={region} />
      <RegionHeader region={region} />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
