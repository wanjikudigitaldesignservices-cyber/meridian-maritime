import { Globe, ShieldCheck, Ship, Users } from 'lucide-react';

export function GlobalAbout() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-hull overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hull/70 mix-blend-multiply z-10" />
          <img 
            src="/images/about/hero_about.jpg" 
            alt="Corporate Operations" 
            className="w-full h-full object-cover saturate-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1920';
            }}
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
              Global reach, <span className="text-accent">local reality</span>.
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl font-light">
              Since 1985, Meridian Maritime Group has provided highly specialized marine and logistics services to the world's most demanding fleet operators.
            </p>
          </div>
        </div>
      </section>

      {/* Asset-Light Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading text-hull mb-6">Asset-Light. Knowledge-Heavy.</h2>
              <p className="text-deck-grey mb-4">
                We do not own the ships. We do not own the cargo. We own the responsibility.
              </p>
              <p className="text-deck-grey mb-6">
                Our asset-light model allows us to remain entirely objective in our operations, focusing 100% of our resources on regulatory compliance, operational efficiency, and local execution across 7 distinct global regions.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-heading text-accent mb-2">40+</span>
                  <span className="text-sm font-medium text-hull">Years of Excellence</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-heading text-accent mb-2">7</span>
                  <span className="text-sm font-medium text-hull">Global Regions</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img 
                src="/images/about/office_culture.jpg" 
                alt="Meridian Operations Center" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1000';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-plimsoll">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-heading text-hull mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mmg-card p-8">
              <ShieldCheck className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-heading text-xl text-hull mb-3">Absolute Compliance</h3>
              <p className="text-sm text-deck-grey">
                In a highly regulated industry, we treat compliance as our product. We do not cut corners, and we do not compromise on safety.
              </p>
            </div>
            <div className="mmg-card p-8">
              <Globe className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-heading text-xl text-hull mb-3">Local Mastery</h3>
              <p className="text-sm text-deck-grey">
                Global standards mean nothing without local execution. We employ local experts who understand the realities of their specific ports.
              </p>
            </div>
            <div className="mmg-card p-8">
              <Users className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-heading text-xl text-hull mb-3">Seafarer Welfare</h3>
              <p className="text-sm text-deck-grey">
                The crew is the lifeblood of the industry. We prioritize the physical and mental well-being of every mariner under our care.
              </p>
            </div>
            <div className="mmg-card p-8">
              <Ship className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-heading text-xl text-hull mb-3">Operational Readiness</h3>
              <p className="text-sm text-deck-grey">
                We operate 24/7/365. When a vessel arrives, our teams are already prepared to execute the turnaround efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
