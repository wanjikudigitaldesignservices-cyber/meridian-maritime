import { useLocation } from 'react-router-dom';

export function PlaceholderPage() {
  const location = useLocation();
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-heading text-hull mb-4">Page Under Construction</h1>
      <p className="font-mono text-deck-grey">{location.pathname}</p>
    </div>
  );
}
