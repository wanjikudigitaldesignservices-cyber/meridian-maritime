export const REGION_SLUGS = [
  'africa', 'europe', 'asia',
  'north-america', 'south-america',
  'oceania', 'antarctica'
] as const;

export type RegionSlug = typeof REGION_SLUGS[number];

export const SERVICE_TAXONOMY = [
  { division: 'Agency', slug: 'ship-agency', name: 'Ship Agency & Husbandry' },
  { division: 'Agency', slug: 'crew-change', name: 'Crew Change Services' },
  { division: 'Agency', slug: 'ship-chandling', name: 'Ship Chandling & Supply' },
  { division: 'Logistics', slug: 'customs-brokerage', name: 'Customs Brokerage & Clearance' },
  { division: 'Logistics', slug: 'inland-logistics', name: 'Inland & Corridor Logistics' },
  { division: 'Logistics', slug: 'warehousing-cfs', name: 'Warehousing & Container Freight Stations' },
  { division: 'Logistics', slug: 'project-cargo', name: 'Project Cargo & Breakbulk' },
  { division: 'Cargo', slug: 'bulk-cargo-handling', name: 'Bulk Cargo Handling' },
  { division: 'Cargo', slug: 'dry-bulk-export', name: 'Dry Bulk Export Coordination' },
  { division: 'Cargo', slug: 'reefer-logistics', name: 'Reefer & Cold Chain Logistics' },
  { division: 'Cargo', slug: 'liquid-bulk-storage', name: 'Liquid Bulk & Tank Storage' },
  { division: 'Marine', slug: 'bunkering', name: 'Marine Fuels & Bunkering' },
  { division: 'Marine', slug: 'tanker-lightering', name: 'Tanker Lightering' },
  { division: 'Marine', slug: 'offshore-support', name: 'Offshore & Subsea Vessel Support' },
  { division: 'Management', slug: 'ship-management', name: 'Technical Ship Management' },
  { division: 'Management', slug: 'crew-management', name: 'Crew Management & Manning' },
  { division: 'Management', slug: 'newbuild-supervision', name: 'Newbuild & Drydock Supervision' },
  { division: 'Commercial', slug: 'chartering-brokerage', name: 'Chartering & S&P Brokerage' },
  { division: 'Commercial', slug: 'marine-insurance', name: 'Marine Insurance & P&I Correspondence' },
  { division: 'Compliance', slug: 'emissions-advisory', name: 'Emissions & Decarbonisation Advisory' },
  { division: 'Compliance', slug: 'biosecurity-compliance', name: 'Biosecurity & Quarantine Compliance' },
  { division: 'Compliance', slug: 'marine-surveying', name: 'Marine Surveying & Inspection' },
  { division: 'Polar', slug: 'polar-logistics', name: 'Polar Logistics' },
  { division: 'Polar', slug: 'research-station-resupply', name: 'Research Station Resupply' },
  { division: 'Polar', slug: 'expedition-support', name: 'Expedition Vessel Support' },
  { division: 'Polar', slug: 'polar-crew-training', name: 'Polar Code Crew Training' },
  { division: 'Polar', slug: 'environmental-compliance', name: 'Environmental Protocol Compliance' },
  { division: 'Cargo', slug: 'cabotage-support', name: 'Coastal Cabotage Support' },
] as const;

export type ServiceSlug = typeof SERVICE_TAXONOMY[number]['slug'];

export interface Region {
  slug: RegionSlug;
  entityName: string;
  continent: string;
  country: string;
  primaryPort: string;
  unlocode: string;
  coordinates: { lat: string; lng: string };
  timezone: string;
  loadLineZone: 'TF'|'F'|'T'|'S'|'W'|'WNA';
  accent: string;
  currency: string;
  languages: string[];
  emergencyPhone: string;
  officePhone: string;
  email: string;
  address: string;
  serviceSlugs: ServiceSlug[];
  regulators: string[];
  licences: string[];
  heroImageUrl?: string;
  heroHeadline: string;
  heroSubline: string;
  positioning: string;
  homeSectionOrder: string[];
}

export const REGIONS: Region[] = [
  {
    slug: 'africa',
    entityName: 'Meridian East Africa Ltd',
    continent: 'Africa',
    country: 'Kenya',
    primaryPort: 'Port of Mombasa (Kilindini Harbour)',
    unlocode: 'KEMBA',
    coordinates: { lat: '04°03′S', lng: '039°40′E' },
    timezone: 'Africa/Nairobi',
    loadLineZone: 'T',
    accent: '#E0A526',
    currency: 'KES',
    languages: ['en', 'sw'],
    emergencyPhone: '+254 700 000 001',
    officePhone: '+254 41 200 0000',
    email: 'mombasa@meridianmaritime.com',
    address: 'Kilindini Road, Mombasa, Kenya',
    serviceSlugs: [
      'ship-agency', 'customs-brokerage', 'inland-logistics', 
      'bulk-cargo-handling', 'ship-chandling', 'crew-change', 'warehousing-cfs'
    ],
    regulators: ['Kenya Maritime Authority (KMA)', 'Kenya Ports Authority (KPA)', 'Kenya Revenue Authority (KRA Customs)', 'Kenya Data Protection Act 2019'],
    licences: ['Licensed Clearing & Forwarding Agent'],
    heroImageUrl: '/images/regions/hero_africa.jpg',
    heroHeadline: "The ship berths in Mombasa. The cargo doesn't stop there.",
    heroSubline: "Ship agency, customs clearance and Northern Corridor haulage to Kampala, Kigali, Juba and Goma — under one job number.",
    positioning: "Mombasa is the gateway to the Northern Corridor. Cargo landed here moves inland to Uganda, Rwanda, South Sudan, Burundi and eastern DRC. We specialise in inland corridor logistics and customs clearance.",
    homeSectionOrder: ['regionHero', 'featuredServices', 'whyThisRegion', 'portCoverage', 'localTeam', 'regionalInsights', 'complianceStrip', 'regionCTA']
  },
  {
    slug: 'europe',
    entityName: 'Meridian Maritime Europe B.V.',
    continent: 'Europe',
    country: 'Netherlands',
    primaryPort: 'Port of Rotterdam',
    unlocode: 'NLRTM',
    coordinates: { lat: '51°55′N', lng: '004°28′E' },
    timezone: 'Europe/Amsterdam',
    loadLineZone: 'S',
    accent: '#1B6CA8',
    currency: 'EUR',
    languages: ['en', 'nl'],
    emergencyPhone: '+31 10 000 0001',
    officePhone: '+31 10 200 0000',
    email: 'rotterdam@meridianmaritime.com',
    address: 'Wilhelminakade, 3072 AP Rotterdam, Netherlands',
    serviceSlugs: [
      'ship-agency', 'bunkering', 'liquid-bulk-storage', 
      'project-cargo', 'inland-logistics', 'customs-brokerage', 'emissions-advisory'
    ],
    regulators: ['Port of Rotterdam Authority', 'Dutch Human Environment and Transport Inspectorate (ILT)', 'EU ETS', 'FuelEU Maritime', 'GDPR'],
    licences: ['AEO-certified customs', 'EU excise warehousing'],
    heroImageUrl: '/images/regions/hero_europe.jpg',
    heroHeadline: "Compliance is now part of the bunker price.",
    heroSubline: "EU ETS surrender, FuelEU pooling, LNG and bio-blend bunkering, and Rhine barge logistics from the largest port in Europe.",
    positioning: "Rotterdam is Europe's largest port and the world's largest bunkering hub. We guide operators through EU ETS and FuelEU Maritime compliance, alongside conventional and alternative fuels bunkering and Rhine logistics.",
    homeSectionOrder: ['regionHero', 'featuredServices', 'complianceStrip', 'whyThisRegion', 'portCoverage', 'localTeam', 'regionalInsights', 'regionCTA']
  },
  {
    slug: 'asia',
    entityName: 'Meridian Maritime Group Pte Ltd',
    continent: 'Asia',
    country: 'Singapore',
    primaryPort: 'Port of Singapore',
    unlocode: 'SGSIN',
    coordinates: { lat: '01°16′N', lng: '103°50′E' },
    timezone: 'Asia/Singapore',
    loadLineZone: 'TF',
    accent: '#C8102E',
    currency: 'SGD',
    languages: ['en', 'zh'],
    emergencyPhone: '+65 6000 0001',
    officePhone: '+65 6200 0000',
    email: 'singapore@meridianmaritime.com',
    address: '1 Maritime Square, Singapore',
    serviceSlugs: [
      'ship-management', 'crew-management', 'bunkering', 
      'chartering-brokerage', 'newbuild-supervision', 'marine-insurance', 'ship-agency'
    ],
    regulators: ['Maritime and Port Authority of Singapore (MPA)', 'Singapore Registry of Ships', 'Personal Data Protection Act (PDPA)'],
    licences: ['MPA-licensed bunkering'],
    heroImageUrl: '/images/regions/hero_asia.jpg',
    heroHeadline: "Twenty-four vessels under management. One accountable operator.",
    heroSubline: "Technical management, crewing, chartering and mass-flow-metered bunkering from the group's Singapore headquarters.",
    positioning: "As Group HQ, Singapore is our commercial and technical core. We provide full technical ship management, crew management, chartering brokerage, and mass-flow-metered bunkering.",
    homeSectionOrder: ['regionHero', 'featuredServices', 'localTeam', 'whyThisRegion', 'portCoverage', 'regionalInsights', 'complianceStrip', 'regionCTA']
  },
  {
    slug: 'north-america',
    entityName: 'Meridian Marine Services LLC',
    continent: 'North America',
    country: 'United States',
    primaryPort: 'Port of Houston (Houston Ship Channel)',
    unlocode: 'USHOU',
    coordinates: { lat: '29°45′N', lng: '095°16′W' },
    timezone: 'America/Chicago',
    loadLineZone: 'S',
    accent: '#B4531F',
    currency: 'USD',
    languages: ['en', 'es'],
    emergencyPhone: '+1 713 000 0001',
    officePhone: '+1 713 200 0000',
    email: 'houston@meridianmaritime.com',
    address: '1 Clinton Drive, Houston, TX 77029, USA',
    serviceSlugs: [
      'ship-agency', 'offshore-support', 'tanker-lightering', 
      'customs-brokerage', 'project-cargo', 'warehousing-cfs'
    ],
    regulators: ['US Coast Guard (USCG)', 'Customs and Border Protection (CBP)', 'MTSA/TWIC', 'EPA Vessel Incidental Discharge Act', 'Jones Act'],
    licences: ['CBP-licensed customs brokerage'],
    heroImageUrl: '/images/regions/hero_north_america.jpg',
    heroHeadline: "The Ship Channel does not forgive a late filing.",
    heroSubline: "Tanker agency, lightering coordination, offshore support and CBP-licensed customs brokerage across the US Gulf.",
    positioning: "Operating in the US Gulf energy sector requires flawless regulatory compliance. We handle tanker agency, offshore vessel support, lightering, and stringent CBP/Jones Act compliance.",
    homeSectionOrder: ['regionHero', 'complianceStrip', 'featuredServices', 'portCoverage', 'whyThisRegion', 'localTeam', 'regionalInsights', 'regionCTA']
  },
  {
    slug: 'south-america',
    entityName: 'Meridian Marítima Brasil Ltda',
    continent: 'South America',
    country: 'Brazil',
    primaryPort: 'Port of Santos',
    unlocode: 'BRSSZ',
    coordinates: { lat: '23°57′S', lng: '046°18′W' },
    timezone: 'America/Sao_Paulo',
    loadLineZone: 'S',
    accent: '#1E7A5F',
    currency: 'BRL',
    languages: ['pt', 'en'],
    emergencyPhone: '+55 13 0000 0001',
    officePhone: '+55 13 2000 0000',
    email: 'santos@meridianmaritime.com',
    address: 'Av. Conselheiro Rodrigues Alves, Santos, SP, Brazil',
    serviceSlugs: [
      'ship-agency', 'bulk-cargo-handling', 'reefer-logistics', 
      'customs-brokerage', 'inland-logistics', 'cabotage-support'
    ],
    regulators: ['ANTAQ (National Waterway Transport Agency)', 'Marinha do Brasil (Port Captaincy)', 'Receita Federal', 'LGPD (Lei Geral de Proteção de Dados)'],
    licences: [],
    heroImageUrl: '/images/regions/hero_south_america.jpg',
    heroHeadline: "The harvest has a sailing date.",
    heroSubline: "Agri-bulk line-up, reefer cold chain, Siscomex clearance and cabotage agency at the largest port in Latin America.",
    positioning: "Santos is the export gate for Brazilian agriculture. We manage agri-bulk berth coordination, cold chain reefer logistics, Siscomex customs clearance, and cabotage support.",
    homeSectionOrder: ['regionHero', 'featuredServices', 'whyThisRegion', 'portCoverage', 'localTeam', 'regionalInsights', 'complianceStrip', 'regionCTA']
  },
  {
    slug: 'oceania',
    entityName: 'Meridian Maritime Australia Pty Ltd',
    continent: 'Oceania',
    country: 'Australia',
    primaryPort: 'Port of Fremantle, Western Australia',
    unlocode: 'AUFRE',
    coordinates: { lat: '32°03′S', lng: '115°44′E' },
    timezone: 'Australia/Perth',
    loadLineZone: 'S',
    accent: '#A8471F',
    currency: 'AUD',
    languages: ['en'],
    emergencyPhone: '+61 8 0000 0001',
    officePhone: '+61 8 9200 0000',
    email: 'fremantle@meridianmaritime.com',
    address: 'Queen Victoria Street, Fremantle WA 6160, Australia',
    serviceSlugs: [
      'ship-agency', 'dry-bulk-export', 'offshore-support', 
      'biosecurity-compliance', 'marine-surveying', 'crew-change'
    ],
    regulators: ['Australian Maritime Safety Authority (AMSA)', 'Department of Agriculture Fisheries and Forestry (biosecurity)', 'Modern Slavery Act 2018', 'Privacy Act 1988'],
    licences: [],
    heroImageUrl: '/images/regions/hero_oceania.jpg',
    heroHeadline: "A biofouling hold-up costs more than the survey.",
    heroSubline: "Bulk berth agency, draught surveys, offshore support and biosecurity readiness across Fremantle, Port Hedland and Dampier.",
    positioning: "Western Australia is a dry bulk export powerhouse. We combine bulk berth agency with rigorous biosecurity readiness and offshore subsea support across the North West Shelf.",
    homeSectionOrder: ['regionHero', 'featuredServices', 'complianceStrip', 'whyThisRegion', 'portCoverage', 'localTeam', 'regionalInsights', 'regionCTA']
  },
  {
    slug: 'antarctica',
    entityName: 'Meridian Polar Operations',
    continent: 'Antarctica',
    country: 'None',
    primaryPort: 'Punta Arenas, Chile (staging)',
    unlocode: 'CLPUQ',
    coordinates: { lat: '53°10′S', lng: '070°54′W' },
    timezone: 'America/Punta_Arenas',
    loadLineZone: 'W',
    accent: '#5FA8C7',
    currency: 'USD',
    languages: ['en'],
    emergencyPhone: '+56 61 000 0001',
    officePhone: '+56 61 200 0000',
    email: 'polar@meridianmaritime.com',
    address: 'Gateway Office, Punta Arenas, Magallanes, Chile',
    serviceSlugs: [
      'polar-logistics', 'research-station-resupply', 'expedition-support', 
      'polar-crew-training', 'environmental-compliance'
    ],
    regulators: ['Antarctic Treaty System', 'IMO Polar Code', 'Environmental Protocol', 'IAATO'],
    licences: [],
    heroImageUrl: '/images/regions/hero_antarctica.jpg',
    heroHeadline: "Nothing is left behind. That includes the paperwork.",
    heroSubline: "Polar Code compliance, station resupply, ice-class vessel support and waste back-load across the Drake Passage.",
    positioning: "Operating under the Antarctic Treaty System and IMO Polar Code, we provide seasonal support for research station resupply, ice-class vessel husbandry, and strict environmental compliance.",
    homeSectionOrder: ['regionHero', 'seasonBanner', 'featuredServices', 'complianceStrip', 'whyThisRegion', 'localTeam', 'regionalInsights', 'regionCTA']
  }
];
