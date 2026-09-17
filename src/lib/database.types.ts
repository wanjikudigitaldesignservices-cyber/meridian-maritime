export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      regions: {
        Row: {
          id: string
          slug: string
          entity_name: string
          continent: string
          country: string | null
          primary_port: string
          unlocode: string
          lat: string
          lng: string
          timezone: string
          load_line_zone: string
          accent_hex: string
          currency: string
          languages: string[]
          emergency_phone: string
          office_phone: string | null
          email: string | null
          address: string | null
          hero_headline: string | null
          hero_subline: string | null
          hero_image_url: string | null
          positioning: string | null
          regulators: string[] | null
          licences: string[] | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['regions']['Row']>
        Update: Partial<Database['public']['Tables']['regions']['Row']>
      }
      services: {
        Row: {
          id: string
          slug: string
          name: string
          division: string
          short_description: string
          long_description: string | null
          icon_name: string | null
          hero_image_url: string | null
          sort_order: number
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['services']['Row']>
        Update: Partial<Database['public']['Tables']['services']['Row']>
      }
      region_services: {
        Row: {
          id: string
          region_id: string
          service_id: string
          local_headline: string | null
          local_description: string | null
          indicative_rate_note: string | null
          is_featured: boolean
          sort_order: number
        }
        Insert: Partial<Database['public']['Tables']['region_services']['Row']>
        Update: Partial<Database['public']['Tables']['region_services']['Row']>
      }
      ports: {
        Row: {
          id: string
          region_id: string
          slug: string
          name: string
          country: string
          unlocode: string
          lat: number
          lng: number
          max_draught_m: number | null
          max_loa_m: number | null
          berth_count: number | null
          cargo_types: string[] | null
          restrictions: string | null
          agent_contact_name: string | null
          agent_contact_phone: string | null
          agent_contact_email: string | null
          is_primary: boolean
        }
        Insert: Partial<Database['public']['Tables']['ports']['Row']>
        Update: Partial<Database['public']['Tables']['ports']['Row']>
      }
      vessels: {
        Row: {
          id: string
          imo_number: string
          name: string
          vessel_type: Database['public']['Enums']['vessel_type']
          flag_state: string | null
          class_society: string | null
          year_built: number | null
          dwt: number | null
          loa_m: number | null
          beam_m: number | null
          gross_tonnage: number | null
          is_ice_class: boolean
          ice_class_notation: string | null
          managed_by_region_id: string | null
          cii_rating: string | null
          image_url: string | null
          is_active: boolean
        }
        Insert: Partial<Database['public']['Tables']['vessels']['Row']>
        Update: Partial<Database['public']['Tables']['vessels']['Row']>
      }
      people: {
        Row: {
          id: string
          region_id: string | null
          full_name: string
          job_title: string
          bio: string | null
          photo_url: string | null
          email: string | null
          phone: string | null
          linkedin_url: string | null
          is_group_leadership: boolean
          sort_order: number
        }
        Insert: Partial<Database['public']['Tables']['people']['Row']>
        Update: Partial<Database['public']['Tables']['people']['Row']>
      }
      post_categories: {
        Row: {
          id: string
          slug: string
          name: string
        }
        Insert: Partial<Database['public']['Tables']['post_categories']['Row']>
        Update: Partial<Database['public']['Tables']['post_categories']['Row']>
      }
      posts: {
        Row: {
          id: string
          region_id: string | null
          category_id: string | null
          author_id: string | null
          slug: string
          title: string
          excerpt: string | null
          body_markdown: string
          cover_image_url: string | null
          status: Database['public']['Enums']['post_status']
          is_news: boolean
          tags: string[] | null
          read_minutes: number | null
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['posts']['Row']>
        Update: Partial<Database['public']['Tables']['posts']['Row']>
      }
      jobs_board: {
        Row: {
          id: string
          region_id: string | null
          title: string
          slug: string
          track: 'seafarer' | 'shore'
          rank_or_level: string | null
          department: string | null
          location: string | null
          contract_type: string | null
          contract_months: number | null
          description_markdown: string
          requirements: string[] | null
          is_open: boolean
          closes_at: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['jobs_board']['Row']>
        Update: Partial<Database['public']['Tables']['jobs_board']['Row']>
      }
      applications: {
        Row: {
          id: string
          job_id: string | null
          region_id: string | null
          track: string
          full_name: string
          email: string
          phone: string
          nationality: string | null
          rank_applied: string | null
          coc_number: string | null
          coc_issuing_country: string | null
          stcw_certs: string[] | null
          sea_service_months: number | null
          last_vessel_type: Database['public']['Enums']['vessel_type'] | null
          medical_expiry: string | null
          years_experience: number | null
          cover_note: string | null
          cv_url: string | null
          status: Database['public']['Enums']['application_status']
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['applications']['Row']>
        Update: Partial<Database['public']['Tables']['applications']['Row']>
      }
      leads: {
        Row: {
          id: string
          region_id: string | null
          service_id: string | null
          lead_type: 'quote' | 'agency_appointment' | 'general' | 'emergency' | 'newsletter'
          company_name: string | null
          contact_name: string
          email: string
          phone: string | null
          country: string | null
          vessel_name: string | null
          imo_number: string | null
          eta: string | null
          port_of_call: string | null
          cargo_description: string | null
          message: string | null
          status: Database['public']['Enums']['lead_status']
          internal_notes: string | null
          assigned_to: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['leads']['Row']>
        Update: Partial<Database['public']['Tables']['leads']['Row']>
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company_name: string | null
          role: Database['public']['Enums']['user_role']
          region_id: string | null
          avatar_url: string | null
          phone: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']>
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      jobs: {
        Row: {
          id: string
          job_reference: string
          client_id: string | null
          region_id: string
          port_id: string | null
          vessel_id: string | null
          service_id: string | null
          status: Database['public']['Enums']['job_status']
          eta: string | null
          etd: string | null
          cargo_description: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['jobs']['Row']>
        Update: Partial<Database['public']['Tables']['jobs']['Row']>
      }
      job_milestones: {
        Row: {
          id: string
          job_id: string
          label: string
          occurred_at: string | null
          is_complete: boolean
          notes: string | null
          sort_order: number
        }
        Insert: Partial<Database['public']['Tables']['job_milestones']['Row']>
        Update: Partial<Database['public']['Tables']['job_milestones']['Row']>
      }
      documents: {
        Row: {
          id: string
          job_id: string | null
          client_id: string | null
          doc_type: string
          file_name: string
          file_url: string
          file_size_kb: number | null
          uploaded_at: string
        }
        Insert: Partial<Database['public']['Tables']['documents']['Row']>
        Update: Partial<Database['public']['Tables']['documents']['Row']>
      }
      downloads: {
        Row: {
          id: string
          region_id: string | null
          title: string
          description: string | null
          category: string
          file_url: string
          file_size_kb: number | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['downloads']['Row']>
        Update: Partial<Database['public']['Tables']['downloads']['Row']>
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']>
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_role: {
        Args: Record<PropertyKey, never>
        Returns: Database['public']['Enums']['user_role']
      }
      auth_region: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: 'admin' | 'regional_editor' | 'ops' | 'client'
      post_status: 'draft' | 'review' | 'published' | 'archived'
      lead_status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
      job_status: 'booked' | 'in_transit' | 'at_berth' | 'discharging' | 'cleared' | 'completed' | 'on_hold'
      application_status: 'received' | 'screening' | 'interview' | 'offered' | 'rejected' | 'pooled'
      vessel_type: 'container' | 'bulk_carrier' | 'tanker' | 'chemical' | 'lng' | 'osv' | 'icebreaker' | 'ropax' | 'general_cargo'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
