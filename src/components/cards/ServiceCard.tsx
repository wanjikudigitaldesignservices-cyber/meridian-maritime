import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, Anchor, Ship, Globe, FileText, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  anchor: Anchor,
  ship: Ship,
  globe: Globe,
  'file-text': FileText,
  activity: Activity,
};

export interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    name: string;
    short_description: string;
    icon_name?: string;
  };
  regionSlug?: string;
  localHeadline?: string;
  localDescription?: string;
  accentColor?: string;
}

export function ServiceCard({ service, regionSlug, localHeadline, localDescription, accentColor }: ServiceCardProps) {
  const Icon = service.icon_name ? iconMap[service.icon_name] || Anchor : Anchor;
  const linkPath = regionSlug ? `/${regionSlug}/services/${service.slug}` : `/services/${service.slug}`;

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-r-2" style={{ borderRightColor: accentColor || 'var(--steel)' }}>
      <Link to={linkPath} className="absolute inset-0 z-10" />
      <CardHeader>
        <div className="mb-4 text-deck-grey" style={{ color: accentColor }}>
          <Icon className="w-8 h-8 stroke-1" />
        </div>
        <CardTitle className="font-heading text-xl text-hull group-hover:text-chart-cyan transition-colors">
          {localHeadline || service.name}
        </CardTitle>
        <CardDescription className="font-sans text-deck-grey text-base">
          {localDescription || service.short_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm font-medium text-chart-cyan group-hover:translate-x-1 transition-transform">
          View details <ArrowRight className="ml-1 w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}
