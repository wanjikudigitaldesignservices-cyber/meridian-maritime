import fs from 'fs';
import path from 'path';
import { REGIONS, SERVICE_TAXONOMY } from '../src/lib/regions';

import crypto from 'crypto';

const seedDir = path.join(process.cwd(), 'src', 'data', 'seed');

if (!fs.existsSync(seedDir)) {
  fs.mkdirSync(seedDir, { recursive: true });
}

const regionMap = new Map();
const serviceMap = new Map();

// 1. Generate regions.json
const regionsData = REGIONS.map(r => {
  const id = crypto.randomUUID();
  regionMap.set(r.slug, id);
  return {
    id,
    slug: r.slug,
    entity_name: r.entityName,
    continent: r.continent,
    country: r.country,
    primary_port: r.primaryPort,
    unlocode: r.unlocode,
    lat: r.coordinates.lat,
    lng: r.coordinates.lng,
    timezone: r.timezone,
    load_line_zone: r.loadLineZone,
    accent_hex: r.accent,
    currency: r.currency,
    languages: r.languages,
    emergency_phone: r.emergencyPhone,
    office_phone: r.officePhone,
    email: r.email,
    address: r.address,
    hero_headline: r.heroHeadline,
    hero_subline: r.heroSubline,
    positioning: r.positioning,
    regulators: r.regulators,
    licences: r.licences
  };
});
fs.writeFileSync(path.join(seedDir, 'regions.json'), JSON.stringify(regionsData, null, 2));

// 2. Generate services.json
const servicesData = SERVICE_TAXONOMY.map(s => {
  const id = crypto.randomUUID();
  serviceMap.set(s.slug, id);
  return {
    id,
    slug: s.slug,
    name: s.name,
    division: s.division,
    short_description: s.name,
    long_description: s.name + ' description',
    icon_name: 'anchor'
  };
});
fs.writeFileSync(path.join(seedDir, 'services.json'), JSON.stringify(servicesData, null, 2));

// 3. Generate region_services.json
const regionServicesData = REGIONS.flatMap(r => 
  r.serviceSlugs.map(slug => ({
    region_id: regionMap.get(r.slug),
    service_id: serviceMap.get(slug),
    is_featured: r.homeSectionOrder.includes('featuredServices'),
  }))
);
fs.writeFileSync(path.join(seedDir, 'region_services.json'), JSON.stringify(regionServicesData, null, 2));

// 4. Update foreign keys in all other JSON files
function updateFKs(fileName, fkName) {
  const filePath = path.join(seedDir, fileName);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updated = data.map(item => {
      if (item[fkName]) {
        item[fkName] = regionMap.get(item[fkName]) || item[fkName];
      }
      return item;
    });
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  }
}

updateFKs('ports.json', 'region_id');
updateFKs('vessels.json', 'managed_by_region_id');
updateFKs('people.json', 'region_id');
updateFKs('posts.json', 'region_id');
updateFKs('leads.json', 'region_id');
updateFKs('vacancies.json', 'region_id');
updateFKs('applications.json', 'region_id');
updateFKs('jobs.json', 'region_id');

console.log('Successfully generated JSON files and mapped UUID foreign keys.');
