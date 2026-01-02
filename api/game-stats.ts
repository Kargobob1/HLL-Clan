
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless Proxy für HLL Game Stats
 * Ziel: Umgehung von Mixed Content (HTTPS -> HTTP) und CORS.
 */
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS-Header Konfiguration
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Die vom Nutzer bestätigte URL des HLL-RCON-Servers
  const TARGET_URL = 'http://85.215.162.180:8010/api/get_live_game_stats';

  try {
    const apiResponse = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await apiResponse.json().catch(() => null);

    if (!apiResponse.ok) {
      return response.status(apiResponse.status).json({
        failed: true,
        error: `Der HLL-Server (Remote) antwortete mit Status ${apiResponse.status}.`,
        details: apiResponse.statusText,
        remote_data: data
      });
    }

    // Cache-Control setzen um veraltete Dashboard-Daten zu vermeiden
    response.setHeader('Cache-Control', 'no-store, max-age=0');
    return response.status(200).json(data);
  } catch (error: any) {
    console.error('Proxy Fetch Error:', error);
    return response.status(500).json({
      failed: true,
      error: 'Verbindung zum HLL-Server fehlgeschlagen.',
      details: error.message
    });
  }
}
