import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { RegionLayout } from '@/components/layout/RegionLayout';
import { RegionGuard } from '@/components/layout/RegionGuard';
import { GlobalHome } from '@/pages/global/GlobalHome';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { AdminGuard } from '@/components/layout/AdminGuard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { PostList } from '@/pages/admin/PostList';
import { PostEditor } from '@/pages/admin/PostEditor';
import { GlobalInsights } from '@/pages/global/GlobalInsights';
import { RegionInsights } from '@/pages/region/RegionInsights';
import { PostDetail } from '@/pages/region/PostDetail';
import { GlobalServices } from '@/pages/global/GlobalServices';
import { GlobalServiceDetail } from '@/pages/global/GlobalServiceDetail';
import { RegionServices } from '@/pages/region/RegionServices';
import { RegionServiceDetail } from '@/pages/region/RegionServiceDetail';
import { GlobalNetwork } from '@/pages/global/GlobalNetwork';
import { RegionPorts } from '@/pages/region/RegionPorts';
import { PortDetail } from '@/pages/region/PortDetail';
import { GlobalFleet } from '@/pages/global/GlobalFleet';
import { FleetDetail } from '@/pages/global/FleetDetail';
import { RegionTeam } from '@/pages/region/RegionTeam';
import { RegionHome } from '@/pages/region/RegionHome';
import { QuotePage } from '@/pages/shared/QuotePage';
import { AgencyAppointment } from '@/pages/shared/AgencyAppointment';
import { SeafarerApplication } from '@/pages/global/SeafarerApplication';
import { ShoreApplication } from '@/pages/global/ShoreApplication';
import { TrackPage } from '@/pages/global/TrackPage';
import { EmergencyPage } from '@/pages/global/EmergencyPage';
import { SustainabilityPage } from '@/pages/global/SustainabilityPage';
import { DownloadsPage } from '@/pages/global/DownloadsPage';
import { CookieConsent } from '@/components/shared/CookieConsent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Global Routes */}
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<GlobalHome />} />
          <Route path="/about" element={<PlaceholderPage />} />
          <Route path="/about/governance" element={<PlaceholderPage />} />
          <Route path="/about/hsseq" element={<PlaceholderPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/services" element={<GlobalServices />} />
          <Route path="/services/:serviceSlug" element={<GlobalServiceDetail />} />
          <Route path="/network" element={<GlobalNetwork />} />
          <Route path="/fleet" element={<GlobalFleet />} />
          <Route path="/fleet/:imoNumber" element={<FleetDetail />} />
          <Route path="/news" element={<PlaceholderPage />} />
          <Route path="/news/:postSlug" element={<PlaceholderPage />} />
          <Route path="/insights" element={<GlobalInsights />} />
          <Route path="/careers" element={<PlaceholderPage />} />
          <Route path="/careers/seafarer" element={<SeafarerApplication />} />
          <Route path="/careers/shore" element={<ShoreApplication />} />
          <Route path="/careers/:jobId" element={<PlaceholderPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/schedules" element={<PlaceholderPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/legal/:slug" element={<PlaceholderPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/404" element={
            <div className="container mx-auto px-4 py-24 text-center">
              <h1 className="text-3xl font-heading text-hull mb-4">404 - Page Not Found</h1>
            </div>
          } />
        </Route>

        {/* Region Routes */}
        <Route path="/:regionId" element={<RegionGuard />}>
          <Route element={<RegionLayout />}>
            <Route index element={<RegionHome />} />
            <Route path="about" element={<PlaceholderPage />} />
            <Route path="services" element={<RegionServices />} />
            <Route path="services/:serviceSlug" element={<RegionServiceDetail />} />
            <Route path="ports" element={<RegionPorts />} />
            <Route path="ports/:portSlug" element={<PortDetail />} />
            <Route path="team" element={<RegionTeam />} />
            <Route path="insights" element={<RegionInsights />} />
            <Route path="insights/:postSlug" element={<PostDetail />} />
            <Route path="news" element={<PlaceholderPage />} />
            <Route path="careers" element={<PlaceholderPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="contact" element={<AgencyAppointment />} />
            <Route path="compliance" element={<PlaceholderPage />} />
          </Route>
        </Route>

        {/* Portal & Admin Routes */}
        <Route path="/portal/*" element={<PlaceholderPage />} />
        
        <Route path="/admin" element={<AdminGuard />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/:id" element={<PostEditor />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<PlaceholderPage />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
