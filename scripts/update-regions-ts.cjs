const fs = require('fs');
let code = fs.readFileSync('src/lib/regions.ts', 'utf8');

if (!code.includes('heroImageUrl?: string;')) {
  code = code.replace('heroHeadline: string;', 'heroImageUrl?: string;\n  heroHeadline: string;');
}

const slugs = ['africa', 'europe', 'asia', 'north-america', 'south-america', 'oceania', 'antarctica'];
for (const slug of slugs) {
  const imageUrl = '/images/regions/hero_' + slug.replace('-', '_') + '.jpg';
  const regex = new RegExp(`(slug: '${slug}',[\\s\\S]*?)(heroHeadline:)`);
  code = code.replace(regex, `$1heroImageUrl: '${imageUrl}',\n    $2`);
}

fs.writeFileSync('src/lib/regions.ts', code);
