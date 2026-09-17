import { Client } from 'pg';

const PROJECT_REF = 'gipgnivjtclueyucpkzi';
const DB_PASSWORD = 'Y$/xjX2G+4GMs4b';
const url = `postgresql://postgres:${encodeURIComponent(DB_PASSWORD)}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`;

async function testConnection() {
  console.log(`Trying URL: ${url}`);
  const client = new Client({ connectionString: url });
  
  try {
    await client.connect();
    console.log('Successfully connected to Postgres pooler!');
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
