import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PROJECT_REF = 'gipgnivjtclueyucpkzi';
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const REGIONS = [
  'aws-0-us-east-1',
  'aws-0-us-west-1',
  'aws-0-eu-central-1',
  'aws-0-eu-west-1',
  'aws-0-eu-west-2',
  'aws-0-ap-southeast-1',
  'aws-0-ap-southeast-2',
  'aws-0-ap-northeast-1',
  'aws-0-sa-east-1',
  'aws-0-ca-central-1',
  'aws-0-ap-south-1'
];


async function migrateData() {
  console.log('Migrating seed data via Supabase JS...');
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const seedDir = path.join(process.cwd(), 'src', 'data', 'seed');
  
  const regions = JSON.parse(fs.readFileSync(path.join(seedDir, 'regions.json'), 'utf8'));
  const services = JSON.parse(fs.readFileSync(path.join(seedDir, 'services.json'), 'utf8'));
  const regionServices = JSON.parse(fs.readFileSync(path.join(seedDir, 'region_services.json'), 'utf8'));
  const ports = JSON.parse(fs.readFileSync(path.join(seedDir, 'ports.json'), 'utf8'));
  const vessels = JSON.parse(fs.readFileSync(path.join(seedDir, 'vessels.json'), 'utf8'));
  const people = JSON.parse(fs.readFileSync(path.join(seedDir, 'people.json'), 'utf8'));
  const categories = JSON.parse(fs.readFileSync(path.join(seedDir, 'categories.json'), 'utf8'));
  const posts = JSON.parse(fs.readFileSync(path.join(seedDir, 'posts.json'), 'utf8'));
  const vacancies = JSON.parse(fs.readFileSync(path.join(seedDir, 'vacancies.json'), 'utf8'));
  const applications = JSON.parse(fs.readFileSync(path.join(seedDir, 'applications.json'), 'utf8'));
  const leads = JSON.parse(fs.readFileSync(path.join(seedDir, 'leads.json'), 'utf8'));
  const jobs = JSON.parse(fs.readFileSync(path.join(seedDir, 'jobs.json'), 'utf8'));

  async function insertTable(tableName, data) {
    console.log(`Inserting ${data.length} records into ${tableName}...`);
    const { error } = await supabase.from(tableName).insert(data);
    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
    } else {
      console.log(`Successfully inserted into ${tableName}.`);
    }
  }

  // Skip regions/services since they are already successfully inserted
  // await insertTable('regions', regions);
  // await insertTable('services', services);
  // await insertTable('region_services', regionServices);
  const { data: existingRegions, error: regionErr } = await supabase.from('regions').select('id, slug');
  if (regionErr) throw regionErr;
  
  const regionMap = {};
  existingRegions.forEach(r => { regionMap[r.slug] = r.id; });

  await insertTable('ports', ports.map(p => ({
    id: crypto.randomUUID(),
    region_id: regionMap[p.region],
    slug: p.slug,
    name: p.name,
    country: p.country,
    unlocode: p.unlocode,
    lat: p.coordinates.lat,
    lng: p.coordinates.lng,
    max_draught_m: p.maxDraught,
    max_loa_m: p.maxLoa,
    berth_count: p.berthCount,
    cargo_types: p.cargoTypes
  })));
  
  await insertTable('vessels', vessels.map(v => ({
    id: crypto.randomUUID(),
    imo_number: v.imoNumber,
    name: v.name,
    vessel_type: v.type === 'Container' ? 'container' : 'bulk_carrier',
    flag_state: v.flag,
    class_society: v.classSociety,
    year_built: v.builtYear,
    dwt: v.dwt,
    cii_rating: v.ciiRating,
    managed_by_region_id: regionMap[v.region]
  })));
  
  await insertTable('people', people.map(p => ({
    id: crypto.randomUUID(),
    region_id: regionMap[p.region],
    full_name: p.name,
    job_title: p.title,
    email: p.email,
    phone: p.phone,
    photo_url: p.photoUrl
  })));
  await insertTable('post_categories', categories.map(c => ({
    id: c.id === 'cat-1' ? '11111111-1111-1111-1111-111111111111' : 
        c.id === 'cat-2' ? '22222222-2222-2222-2222-222222222222' : crypto.randomUUID(),
    slug: c.slug,
    name: c.name
  })));
  
  await insertTable('posts', posts.map(p => ({
    id: crypto.randomUUID(),
    region_id: regionMap[p.region],
    category_id: p.category === 'cat-1' ? '11111111-1111-1111-1111-111111111111' :
                 p.category === 'cat-2' ? '22222222-2222-2222-2222-222222222222' : null,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body_markdown: p.body,
    status: p.status || 'published',
    published_at: p.publishedAt,
    cover_image_url: p.coverImage
  })));
  
  await insertTable('jobs_board', vacancies.map(v => ({
    id: crypto.randomUUID(),
    region_id: regionMap[v.region],
    title: v.title,
    slug: v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    track: v.department === 'Marine' ? 'seafarer' : 'shore',
    department: v.department,
    contract_months: v.contractLength ? parseInt(v.contractLength) : null,
    description_markdown: 'Description here',
    is_open: v.status === 'open'
  })));
  
  await insertTable('applications', applications.map(a => ({
    id: crypto.randomUUID(),
    region_id: regionMap[a.region],
    track: 'shore',
    full_name: a.fullName,
    email: a.email,
    status: a.status || 'received',
    created_at: a.createdAt
  })));
  
  await insertTable('leads', leads.map(l => ({
    id: crypto.randomUUID(),
    region_id: regionMap[l.region],
    lead_type: 'general',
    company_name: l.companyName,
    contact_name: l.contactName || l.companyName,
    email: l.email,
    status: l.status || 'new',
    created_at: l.createdAt
  })));
  
  // Skip jobs for now because it requires complex profile/client mappings
  // await insertTable('jobs', jobs);
  
  console.log('Data migration complete.');
}

async function main() {
  try {
    await migrateData();
    console.log('All backend setup complete!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main();
