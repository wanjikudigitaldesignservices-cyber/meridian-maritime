import type { Region } from '@/lib/regions';
import { REGIONS } from '@/lib/regions';

export function EmergencyBar({ region }: { region?: Region }) {
  const hotline = region?.emergencyPhone || REGIONS.find(r => r.slug === 'asia')?.emergencyPhone;
  
  return (
    <div className="w-full bg-[var(--loadline)] text-white text-xs sm:text-sm font-medium py-1.5 px-4 sm:px-6 flex items-center justify-center tracking-wide z-50 relative">
      24/7 Emergency Response — {hotline}
    </div>
  );
}
