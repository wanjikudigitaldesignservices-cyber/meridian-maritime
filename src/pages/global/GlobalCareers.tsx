import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Anchor, Briefcase, ChevronRight, GraduationCap } from 'lucide-react';

export function GlobalCareers() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-hull overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hull/70 mix-blend-multiply z-10" />
          <img 
            src="/images/careers/hero_careers.jpg" 
            alt="Maritime Careers" 
            className="w-full h-full object-cover saturate-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581454558237-7756e7e4a3b7?auto=format&fit=crop&q=80&w=1920';
            }}
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
              Build your career <span className="text-accent">at sea and ashore</span>.
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl font-light">
              We are a meritocracy built on knowledge. Whether you are navigating the high seas or managing complex logistics from our regional offices, Meridian offers unparalleled career progression.
            </p>
          </div>
        </div>
      </section>

      {/* Two Tracks Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Seafarer Track */}
            <div className="group relative flex flex-col justify-end overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-hull via-hull/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1600812166345-2db93ec0de29?auto=format&fit=crop&q=80&w=1000" 
                  alt="Seafarer Careers" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-20 p-8">
                <Anchor className="w-10 h-10 text-accent mb-4" />
                <h2 className="text-3xl font-heading text-white mb-3">Careers At Sea</h2>
                <p className="text-white/80 mb-6">
                  Join our pool of elite mariners. We manage a diverse fleet and offer continuous training, competitive remuneration, and a rigid commitment to crew welfare and safety.
                </p>
                <Button asChild variant="default" className="w-fit">
                  <Link to="/careers/seafarer">
                    Apply as Seafarer <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Ashore Track */}
            <div className="group relative flex flex-col justify-end overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-hull via-hull/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Ashore Careers" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-20 p-8">
                <Briefcase className="w-10 h-10 text-accent mb-4" />
                <h2 className="text-3xl font-heading text-white mb-3">Careers Ashore</h2>
                <p className="text-white/80 mb-6">
                  From port agents and logistics coordinators to technical superintendents and commercial brokers. Build a corporate career driving global trade.
                </p>
                <Button asChild variant="default" className="w-fit">
                  <Link to="/careers/shore">
                    Apply Ashore <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cadets Program */}
      <section className="py-24 bg-plimsoll border-t border-steel/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 md:p-12 border border-steel/20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-accent mb-4">
                <GraduationCap className="w-6 h-6" />
                <span className="font-mono text-sm tracking-wider font-bold">MERIDIAN ACADEMY</span>
              </div>
              <h2 className="text-3xl font-heading text-hull mb-4">Cadetship & Graduate Programs</h2>
              <p className="text-deck-grey mb-6">
                We invest heavily in the future of the maritime industry. Our cadetship programs offer deck and engine trainees world-class sea time on modern vessels, supported by dedicated training officers. For graduates ashore, our rotational management trainee program builds the leaders of tomorrow.
              </p>
              <Link to="/contact" className="inline-flex items-center text-accent font-medium hover:text-hull transition-colors">
                Inquire about cadetships <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex-1 w-full relative h-[300px]">
               <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cadet Training" 
                  className="w-full h-full object-cover border border-steel/20"
                />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
