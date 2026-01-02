
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS Header setzen
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS Request (Preflight)
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const TARGET_URL = 'http://85.215.162.180:8010/api/get_live_game_stats';

  try {
    const apiResponse = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`Externer Server antwortete mit Status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // Sende die Daten an das Frontend zurück
    return response.status(200).json(data);
  } catch (error: any) {
    console.error('Proxy Error:', error);
    return response.status(500).json({
      failed: true,
      error: error.message || 'Interner Serverfehler beim Abrufen der Daten',
    });
  }
}
