import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'src/data/seed');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function generateIMO() {
  while (true) {
    const base = Math.floor(Math.random() * (999999 - 900000 + 1) + 900000).toString();
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      sum += parseInt(base[i]) * (7 - i);
    }
    const checkDigit = sum % 10;
    const imo = base + checkDigit;
    if (imo !== '1234567') return imo;
  }
}

const regions = ['africa', 'europe', 'asia', 'north-america', 'south-america', 'oceania', 'antarctica'];

// Vessels
const vessels = [];
const types = ['container', 'bulk_carrier', 'tanker', 'chemical', 'lng', 'osv', 'icebreaker', 'ropax', 'general_cargo'];
const flags = ['LR', 'PA', 'MH', 'BS', 'MT', 'SG'];
const classes = ['DNV', 'Lloyds Register', 'ABS', 'Bureau Veritas', 'ClassNK'];
const names = ['Meridian Pioneer', 'Meridian Explorer', 'Meridian Star', 'Meridian Navigator', 'Meridian Voyager', 'Meridian Trader', 'Meridian Mariner', 'Meridian Seafarer', 'Meridian Enterprise', 'Meridian Horizon', 'Meridian Spirit', 'Meridian Vision', 'Meridian Courage', 'Meridian Triumph', 'Meridian Pride', 'Meridian Quest', 'Meridian Venture', 'Meridian Resolve', 'Meridian Guardian', 'Meridian Sentinel', 'Meridian Valiant', 'Meridian Vanguard', 'Meridian Ice', 'Meridian Polar'];

for (let i = 0; i < 24; i++) {
  const isIceClass = i >= 22;
  vessels.push({
    id: `vessel-${i + 1}`,
    name: names[i],
    imoNumber: generateIMO(),
    type: isIceClass ? 'icebreaker' : types[i % (types.length - 1)],
    flag: flags[i % flags.length],
    classSociety: classes[i % classes.length],
    builtYear: 2010 + (i % 15),
    dwt: 10000 + (i * 5000),
    ciiRating: ['A', 'B', 'C', 'D', 'E'][i % 5],
    region: isIceClass ? 'antarctica' : regions[i % (regions.length - 1)]
  });
}
fs.writeFileSync(path.join(outDir, 'vessels.json'), JSON.stringify(vessels, null, 2));

// People
const people = [];
const roles = ['Country Manager', 'Operations Manager', 'Head of Agency', 'Commercial Manager', 'Fleet Superintendent', 'Crewing Manager', 'HSSEQ Manager', 'Customs Manager'];
const firstNames = ['James', 'Maria', 'Chen', 'John', 'Sarah', 'Ahmed', 'Elena', 'Michael', 'David', 'Emma', 'Daniel', 'Sophie', 'William', 'Olivia'];
const lastNames = ['Smith', 'Garcia', 'Wang', 'Doe', 'Connor', 'Ali', 'Ivanova', 'Brown', 'Taylor', 'Davis', 'Wilson', 'Evans', 'Thomas', 'Roberts'];

let personId = 1;
regions.forEach(region => {
  for (let i = 0; i < 4; i++) {
    people.push({
      id: `person-${personId}`,
      name: `${firstNames[personId % firstNames.length]} ${lastNames[personId % lastNames.length]}`,
      title: roles[i % roles.length],
      email: `contact${personId}@meridianmaritime.com`,
      phone: `+123456789${personId}`,
      region: region,
      photoUrl: `https://i.pravatar.cc/150?u=${personId}`
    });
    personId++;
  }
});
fs.writeFileSync(path.join(outDir, 'people.json'), JSON.stringify(people, null, 2));

// Categories
const categories = [
  { id: 'cat-1', slug: 'regulation-compliance', name: 'Regulation & Compliance' },
  { id: 'cat-2', slug: 'port-operations', name: 'Port Operations' },
  { id: 'cat-3', slug: 'decarbonisation', name: 'Decarbonisation' },
  { id: 'cat-4', slug: 'crewing-welfare', name: 'Crewing & Welfare' },
  { id: 'cat-5', slug: 'market-insight', name: 'Market Insight' },
  { id: 'cat-6', slug: 'safety', name: 'Safety' },
  { id: 'cat-7', slug: 'technology', name: 'Technology' },
  { id: 'cat-8', slug: 'company-news', name: 'Company News' }
];
fs.writeFileSync(path.join(outDir, 'categories.json'), JSON.stringify(categories, null, 2));

// Posts
const posts = [];
const postTitles = {
  'africa': ['What the SGR does to Mombasa dwell times', 'East African port congestion update', 'New customs rules in Dar es Salaam'],
  'europe': ['EU ETS surrender: what owners get wrong in year three', 'Rotterdam bunkering trends', 'Rhine barge logistics optimization'],
  'asia': ['Mass flow metering and the end of the bunker dispute', 'Singapore crew change protocols', 'Asian ship management landscape'],
  'north-america': ['Jones Act exposure in offshore wind support', 'Houston Ship Channel draft restrictions', 'Gulf of Mexico lightering safety'],
  'south-america': ['Reading the Santos line-up before the soybean peak', 'Brazil cabotage rules explained', 'Reefer logistics for agri-bulk'],
  'oceania': ['Biofouling: the inspection that costs you a tide', 'Australian dry bulk export surge', 'Offshore support in Western Australia'],
  'antarctica': ['Back-loading waste under the Environmental Protocol', 'Ice-class vessel husbandry in the Drake Passage', 'Polar Code STCW training requirements']
};

let postId = 1;
regions.forEach(region => {
  const titles = postTitles[region];
  titles.forEach(title => {
    posts.push({
      id: `post-${postId}`,
      title: title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: `An in-depth look at ${title.toLowerCase()} and its implications for operators in the region.`,
      body: `## Overview\n\nThis is a detailed analysis of ${title.toLowerCase()}.\n\n### Implications\n\nOperators need to ensure they are fully prepared.`,
      region: region,
      category: categories[postId % categories.length].slug,
      status: 'published',
      author: people.find(p => p.region === region).name,
      publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      coverImage: `https://images.unsplash.com/photo-1517783999520-f068d374bdc9?q=80&w=2070&auto=format&fit=crop`
    });
    postId++;
  });
});
fs.writeFileSync(path.join(outDir, 'posts.json'), JSON.stringify(posts, null, 2));

// Vacancies
const vacancies = [];
let vacId = 1;
regions.forEach(region => {
  // 1 seafarer, 1 shore
  vacancies.push({
    id: `vac-${vacId++}`,
    title: 'Chief Engineer',
    department: 'seafarer',
    region: region,
    vesselType: 'tanker',
    contractLength: '4 months',
    joiningPort: 'Singapore',
    status: 'open',
    postedAt: new Date().toISOString()
  });
  vacancies.push({
    id: `vac-${vacId++}`,
    title: 'Operations Manager',
    department: 'shore',
    region: region,
    location: 'Regional Office',
    type: 'Full-time',
    status: 'open',
    postedAt: new Date().toISOString()
  });
});
fs.writeFileSync(path.join(outDir, 'vacancies.json'), JSON.stringify(vacancies, null, 2));

// Jobs (for tracking)
const jobs = [];
for(let i=1; i<=10; i++) {
  const unlocode = ['SGSIN', 'USHOU', 'NLRTM', 'BRSSZ', 'KEMBA'][i % 5];
  const year = new Date().getFullYear();
  const sequence = String(i).padStart(4, '0');
  
  jobs.push({
    id: `job-${i}`,
    reference: `MMG-${unlocode}-${year}-${sequence}`,
    vesselImo: vessels[i].imoNumber,
    portSlug: 'singapore', // Simplified for seed
    status: ['booked', 'in_transit', 'at_berth', 'discharging', 'cleared', 'completed'][i % 6],
    clientId: 'client-1',
    region: regions[i % regions.length],
    eta: new Date(Date.now() + 86400000 * i).toISOString(),
    etd: new Date(Date.now() + 86400000 * (i+2)).toISOString()
  });
}
fs.writeFileSync(path.join(outDir, 'jobs.json'), JSON.stringify(jobs, null, 2));

// Leads and Applications
const leads = [];
for (let i = 1; i <= 20; i++) {
  leads.push({
    id: `lead-${i}`,
    type: i % 3 === 0 ? 'quote' : 'agency_appointment',
    status: ['new', 'contacted', 'quoted', 'won', 'lost'][i % 5],
    companyName: `Company ${i} Ltd`,
    contactName: `Contact ${i}`,
    email: `contact${i}@example.com`,
    region: regions[i % regions.length],
    createdAt: new Date().toISOString()
  });
}
fs.writeFileSync(path.join(outDir, 'leads.json'), JSON.stringify(leads, null, 2));

const applications = [];
for (let i = 1; i <= 12; i++) {
  applications.push({
    id: `app-${i}`,
    type: i % 2 === 0 ? 'seafarer' : 'shore',
    status: ['received', 'screening', 'interview', 'offered', 'rejected', 'pooled'][i % 6],
    fullName: `Applicant ${i}`,
    email: `applicant${i}@example.com`,
    region: regions[i % regions.length],
    createdAt: new Date().toISOString()
  });
}
fs.writeFileSync(path.join(outDir, 'applications.json'), JSON.stringify(applications, null, 2));

// Downloads
const downloads = [];
for (let i = 1; i <= 12; i++) {
  downloads.push({
    id: `doc-${i}`,
    title: i % 2 === 0 ? `Corporate Brochure ${i}` : `Port Info Sheet ${i}`,
    type: i % 2 === 0 ? 'brochure' : 'port_info',
    fileUrl: `/downloads/doc-${i}.pdf`,
    sizeBytes: 1024 * 1024 * (i % 5 + 1)
  });
}
fs.writeFileSync(path.join(outDir, 'downloads.json'), JSON.stringify(downloads, null, 2));

console.log('All Seed files generated successfully.');
