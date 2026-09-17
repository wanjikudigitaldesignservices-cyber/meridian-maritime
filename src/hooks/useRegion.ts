import { useParams } from 'react-router-dom';
import { REGIONS } from '@/lib/regions';

export function useRegion() {
  const { regionId } = useParams<{ regionId: string }>();
  const region = REGIONS.find(r => r.slug === regionId);
  return {
    region,
    isRegionValid: !!region,
  };
}
