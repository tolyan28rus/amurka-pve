const https = require('https');
https.get('https://live.vkvideo.ru/gatu', { 
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const re = /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]+)"/gi;
    let m;
    while ((m = re.exec(d)) !== null) {
      if (m[1].startsWith('og:') || m[1].startsWith('video:')) console.log(m[1], '=', m[2]);
    }
    const canon = d.match(/<link rel="canonical" href="([^"]+)"/);
    if (canon) console.log('canonical:', canon[1]);
    const title = d.match(/<title>([^<]*)<\/title>/);
    if (title) console.log('title:', title[1]);
  });
});
