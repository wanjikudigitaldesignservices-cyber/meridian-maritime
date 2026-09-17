import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Starting DB update...");

  // Update regions
  const regionsPath = path.resolve(__dirname, '../src/data/seed/regions.json');
  const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));

  for (const region of regions) {
    if (region.hero_image_url) {
      const { error } = await supabase
        .from('regions')
        .update({ hero_image_url: region.hero_image_url })
        .eq('slug', region.slug);
      
      if (error) {
        console.error(`Error updating region ${region.slug}:`, error.message);
      } else {
        console.log(`Updated region ${region.slug} with hero_image_url`);
      }
    }
  }

  // Insert Posts
  const { data: europeRegion } = await supabase.from('regions').select('id').eq('slug', 'europe').single();
  const { data: oceaniaRegion } = await supabase.from('regions').select('id').eq('slug', 'oceania').single();
  const { data: globalRegion } = await supabase.from('regions').select('id').limit(1).single();

  const posts = [
    {
      title: "Navigating EU ETS: A Guide for Ship Owners in 2026",
      slug: "eu-ets-guide-2026",
      region_id: europeRegion?.id || null,
      excerpt: "The European Union Emissions Trading System is now fully in effect for the maritime sector. What you need to know about compliance.",
      body_markdown: "## The EU ETS Reality\n\nWith the EU ETS now requiring 100% surrender of allowances for verified emissions, operators are feeling the pinch. At Meridian Maritime, our compliance desk in Rotterdam has handled over 300 EU ETS surrender processes this year alone.\n\n### Key Takeaways\n- Allowance prices are fluctuating. Forward buying is recommended.\n- Port State Control is actively detaining vessels for non-compliance.\n- Pooling strategies can mitigate risk.\n\nContact our Rotterdam office to discuss your pooling strategy.",
      cover_image_url: "/images/posts/post_eu_ets.jpg",
      status: "published",
      is_news: false,
      read_minutes: 4,
      published_at: new Date().toISOString()
    },
    {
      title: "Biofouling Regulations Tighten in Australia and New Zealand",
      slug: "biofouling-regulations-oceania",
      region_id: oceaniaRegion?.id || null,
      excerpt: "Australian and New Zealand authorities are enforcing strict biosecurity measures. Vessels without proper hull management plans are facing severe delays.",
      body_markdown: "## Biosecurity is Not Optional\n\nRecent detentions in Fremantle and Newcastle have highlighted a shift in AMSA's approach to biofouling. A compliant Hull Biofouling Management Plan (HBMP) is no longer sufficient if the physical condition of the hull contradicts the record book.\n\n### The Meridian Approach\nOur Oceania division coordinates proactive in-water surveys and cleaning in Singapore or Indonesia prior to vessel arrival in Australian waters, ensuring zero delays at the load port.",
      cover_image_url: "/images/posts/post_biofouling.jpg",
      status: "published",
      is_news: true,
      read_minutes: 3,
      published_at: new Date().toISOString()
    },
    {
      title: "The Digital Bridge: Telemetry and Real-Time Routing",
      slug: "digital-bridge-telemetry",
      region_id: globalRegion?.id || null,
      excerpt: "How our Global Operations Centre is using AI-driven weather routing and real-time engine telemetry to reduce bunker consumption by 8%.",
      body_markdown: "## Data Over Instinct\n\nThe modern shipmaster relies on data just as much as seamanship. Our newly upgraded Global Operations Centre monitors our managed fleet 24/7.\n\nBy integrating engine telemetry with AI-driven weather routing, we are seeing average bunker savings of 8% on trans-Pacific voyages.\n\n### Case Study\nLast month, the MT Maritime Glory avoided a major low-pressure system in the North Pacific, arriving in Houston 12 hours ahead of schedule and saving 40 MT of fuel.",
      cover_image_url: "/images/posts/post_digitalization.jpg",
      status: "published",
      is_news: false,
      read_minutes: 5,
      published_at: new Date().toISOString()
    }
  ];

  for (const post of posts) {
    const { error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error inserting post ${post.slug}:`, error.message);
    } else {
      console.log(`Inserted/Updated post ${post.slug}`);
    }
  }

  console.log("DB update complete.");
}

main();
