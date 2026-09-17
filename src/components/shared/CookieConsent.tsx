import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mmg-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('mmg-cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleEssential = () => {
    localStorage.setItem('mmg-cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-hull border-t-4 border-accent text-white shadow-2xl animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="font-heading text-xl">We value your privacy</h3>
          <p className="text-sm text-plimsoll/80">
            Meridian Maritime Group uses cookies to ensure our website functions correctly, to analyse traffic, and to provide a secure client portal experience. You can choose to accept all cookies or strictly essential ones.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button 
            variant="outline" 
            className="bg-transparent border-steel/40 text-white hover:bg-steel/10"
            onClick={handleEssential}
          >
            Essential Only
          </Button>
          <Button 
            className="bg-accent text-white hover:bg-accent/90"
            onClick={handleAcceptAll}
          >
            Accept All Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
