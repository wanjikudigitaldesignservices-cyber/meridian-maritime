import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { type RegionSlug } from '@/lib/regions';

// We'll keep using the static REGIONS array from lib/regions.ts for layout config (colors, homeSectionOrder, etc),
// but we will fetch the DB uuid mapping here to query relational data.
export function useRegionMap() {
  return useQuery({
    queryKey: ['region-map'],
    queryFn: async () => {
      const { data, error } = await supabase.from('regions').select('id, slug, is_active');
      if (error) throw error;
      const map: Record<string, string> = {};
      (data as any[]).forEach(r => { map[r.slug] = r.id; });
      return map;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function usePorts(regionSlug?: RegionSlug) {
  const { data: regionMap } = useRegionMap();
  
  return useQuery({
    queryKey: ['ports', regionSlug],
    queryFn: async () => {
      let query = supabase.from('ports').select(`
        id, slug, name, country, unlocode, 
        lat, lng, max_draught_m, max_loa_m, berth_count, 
        cargo_types, is_primary, regions (slug)
      `);
      
      if (regionSlug && regionMap) {
        query = query.eq('region_id', regionMap[regionSlug]);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return (data as any[]).map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        country: p.country,
        unlocode: p.unlocode,
        coordinates: { lat: p.lat, lng: p.lng },
        maxDraught: p.max_draught_m,
        maxLoa: p.max_loa_m,
        berthCount: p.berth_count,
        cargoTypes: p.cargo_types || [],
        region: p.regions?.slug
      }));
    },
    enabled: regionSlug ? !!regionMap : true
  });
}

export function useServices(regionSlug?: RegionSlug) {
  const { data: regionMap } = useRegionMap();

  return useQuery({
    queryKey: ['services', regionSlug],
    queryFn: async () => {
      if (regionSlug && regionMap) {
        const { data, error } = await supabase
          .from('region_services')
          .select(`
            service_id, is_featured,
            services (id, slug, name, division, short_description, long_description, icon_name, hero_image_url)
          `)
          .eq('region_id', regionMap[regionSlug]);
        if (error) throw error;
        
        return (data as any[]).map(rs => ({
          ...rs.services,
          is_featured: rs.is_featured
        }));
      } else {
        const { data, error } = await supabase.from('services').select('*');
        if (error) throw error;
        return (data as any[]).map(s => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          division: s.division,
          short_description: s.short_description,
          long_description: s.long_description,
          icon_name: s.icon_name,
        }));
      }
    },
    enabled: regionSlug ? !!regionMap : true
  });
}

export function useVessels(regionSlug?: RegionSlug) {
  const { data: regionMap } = useRegionMap();

  return useQuery({
    queryKey: ['vessels', regionSlug],
    queryFn: async () => {
      let query = supabase.from('vessels').select(`
        id, imo_number, name, vessel_type, flag_state, class_society, 
        year_built, dwt, loa_m, beam_m, gross_tonnage, is_ice_class, 
        ice_class_notation, cii_rating, image_url, is_active,
        regions (slug)
      `);
      
      if (regionSlug && regionMap) {
        query = query.eq('managed_by_region_id', regionMap[regionSlug]);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return (data as any[]).map(v => ({
        id: v.id,
        imoNumber: v.imo_number,
        name: v.name,
        type: v.vessel_type === 'container' ? 'Container' : 'Bulk Carrier',
        flag: v.flag_state,
        classSociety: v.class_society,
        builtYear: v.year_built,
        dwt: v.dwt,
        ciiRating: v.cii_rating,
        region: v.regions?.slug
      }));
    },
    enabled: regionSlug ? !!regionMap : true
  });
}

export function usePeople(regionSlug?: RegionSlug) {
  const { data: regionMap } = useRegionMap();

  return useQuery({
    queryKey: ['people', regionSlug],
    queryFn: async () => {
      let query = supabase.from('people').select(`
        id, full_name, job_title, bio, photo_url, email, phone, 
        linkedin_url, is_group_leadership, sort_order, regions (slug)
      `);
      
      if (regionSlug && regionMap) {
        query = query.eq('region_id', regionMap[regionSlug]);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return (data as any[]).map(p => ({
        id: p.id,
        name: p.full_name,
        title: p.job_title,
        email: p.email,
        phone: p.phone,
        photoUrl: p.photo_url,
        region: p.regions?.slug
      }));
    },
    enabled: regionSlug ? !!regionMap : true
  });
}

export function usePosts(regionSlug?: RegionSlug) {
  const { data: regionMap } = useRegionMap();

  return useQuery({
    queryKey: ['posts', regionSlug],
    queryFn: async () => {
      let query = supabase.from('posts').select(`
        id, slug, title, excerpt, cover_image_url, status, is_news,
        read_minutes, published_at, regions (slug)
      `).eq('status', 'published').order('published_at', { ascending: false });
      
      if (regionSlug && regionMap) {
        query = query.eq('region_id', regionMap[regionSlug]);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data;
    },
    enabled: regionSlug ? !!regionMap : true
  });
}
