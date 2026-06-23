import https from 'https';

// Try VK Video Live API endpoints
const endpoints = [
  'https://live.vkvideo.ru/api/v1/channel/gatu',
  'https://live.vkvideo.ru/api/v1/stream/gatu',
  'https://live.vkvideo.ru/api/v1/public/channel/gatu',
  'https://live.vkvideo.ru/api/v1/public/stream/gatu',
];

for (const url of endpoints) {
  try {
    const data = await new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve({ status: res.statusCode, data: d.substring(0, 300) }));
      }).on('error', reject);
    });
    console.log(url, '→', data.status);
    console.log('  ', data.data);
  } catch (e) {
    console.log(url, '→ error:', e.message);
  }
}
