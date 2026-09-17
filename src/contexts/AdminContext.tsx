import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AdminContextType {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AdminContext.Provider value={{ selectedRegion, setSelectedRegion, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
