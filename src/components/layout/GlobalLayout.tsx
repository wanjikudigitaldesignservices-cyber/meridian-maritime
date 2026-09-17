import { Outlet } from 'react-router-dom';
import { GlobalHeader } from './GlobalHeader';
import { EmergencyBar } from './EmergencyBar';
import { Footer } from './Footer';

export function GlobalLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <EmergencyBar />
      <GlobalHeader />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
