
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless Proxy für HLL Game Stats (Erweitert)
 * Aggregiert Daten von gamestate, live_stats und team_view.
 */
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS-Header
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

  // Konfiguration
  const BASE_URL = 'http://85.215.162.180:8010/api';
  const API_KEY = 'ebaf10ce-fa17-4971-8bd5-f22a72fd791c'; // In Production: process.env.HLL_API_KEY

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };

  try {
    // Parallel Fetching für maximale Performance
    const [gamestateRes, statsRes, teamviewRes] = await Promise.all([
      fetch(`${BASE_URL}/get_gamestate`, { headers }),
      fetch(`${BASE_URL}/get_live_game_stats`, { headers }),
      fetch(`${BASE_URL}/get_team_view`, { headers })
    ]);

    // Error Handling für einzelne Requests
    if (!gamestateRes.ok || !statsRes.ok || !teamviewRes.ok) {
      throw new Error(`Partial API Failure: GS:${gamestateRes.status} Stats:${statsRes.status} TV:${teamviewRes.status}`);
    }

    const [gamestateData, statsData, teamviewData] = await Promise.all([
      gamestateRes.json(),
      statsRes.json(),
      teamviewRes.json()
    ]);

    // Aggregiertes Resultat
    const aggregatedData = {
      gamestate: gamestateData.result || gamestateData,
      stats: statsData.result?.stats || statsData.stats || [],
      team_view: teamviewData.result || teamviewData
    };

    // Cache-Control: Kurzzeitiges Caching (10s) um den RCON nicht zu überlasten
    response.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=5');
    
    return response.status(200).json(aggregatedData);

  } catch (error: any) {
    console.error('Proxy Fetch Error:', error);
    return response.status(500).json({
      failed: true,
      error: 'Verbindung zum HLL-Server fehlgeschlagen.',
      details: error.message
    });
  }
}
