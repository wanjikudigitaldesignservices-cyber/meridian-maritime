import { Outlet } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { AdminLayout } from './AdminLayout';
import { AdminProvider } from '@/contexts/AdminContext';

export function AdminGuard() {
  // Protects the route and redirects if not authorized
  useAdminGuard();
  
  return (
    <AdminProvider>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminProvider>
  );
}
