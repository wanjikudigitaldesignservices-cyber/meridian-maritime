import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { REGION_SLUGS, type RegionSlug } from '@/lib/regions';

export function RegionGuard() {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // If invalid region, redirect to 404 (for simplicity, navigating to a global 404)
    if (regionId && !REGION_SLUGS.includes(regionId as RegionSlug)) {
      navigate('/404', { replace: true });
    } else if (regionId) {
      // Save valid region visit
      localStorage.setItem('mmg_region', regionId);
    }
  }, [regionId, navigate]);

  if (!regionId || !REGION_SLUGS.includes(regionId as RegionSlug)) {
    return null; // Will navigate away
  }

  return <Outlet />;
}
