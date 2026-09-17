import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these with your actual Supabase local/remote URL and Service Role Key
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const dataDir = path.join(__dirname, '../src/data/seed');

async function seedTable(tableName, fileName) {
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${tableName} - file ${fileName} not found.`);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`Seeding ${data.length} rows into ${tableName}...`);
  
  // Upsert data to avoid duplicates on re-run
  const { error } = await supabase.from(tableName).upsert(data);
  if (error) {
    console.error(`Error seeding ${tableName}:`, error);
  } else {
    console.log(`Successfully seeded ${tableName}.`);
  }
}

async function main() {
  console.log('Starting seed process...');
  
  // NOTE: In a real database, we must ensure foreign keys are seeded in the correct order.
  // The regions are currently hardcoded in src/lib/regions.ts, but if they were in the DB:
  // await seedTable('regions', 'regions.json'); 
  
  await seedTable('services', 'services.json');
  await seedTable('ports', 'ports.json');
  await seedTable('vessels', 'vessels.json');
  await seedTable('people', 'people.json');
  await seedTable('categories', 'categories.json');
  await seedTable('posts', 'posts.json');
  await seedTable('vacancies', 'vacancies.json');
  await seedTable('leads', 'leads.json');
  await seedTable('applications', 'applications.json');
  await seedTable('jobs', 'jobs.json');
  await seedTable('downloads', 'downloads.json');

  console.log('Seed process completed.');
}

main().catch(console.error);
