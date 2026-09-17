import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/lib/database.types';

type UserRole = Database['public']['Enums']['user_role'];

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  region_id: string | null;
  full_name: string;
}

// MOCK: In production, this would use Supabase auth & profiles table.
export const MOCK_ADMIN_USER: AdminUser = {
  id: 'usr-admin-001',
  email: 'admin@meridianmaritime.com',
  role: 'admin',
  region_id: null,
  full_name: 'System Admin'
};

export function useAdminGuard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this checks supabase.auth.getSession() and fetches the profile
    const user = MOCK_ADMIN_USER;
    
    if (!user) {
      navigate('/admin/login', { replace: true });
    } else if (user.role === 'client') {
      navigate('/404', { replace: true });
    }
  }, [navigate]);

  return { user: MOCK_ADMIN_USER };
}
