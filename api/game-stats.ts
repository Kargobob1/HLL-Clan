
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless Proxy für HLL Game Stats (Erweitert)
 * Aggregiert Daten von gamestate, live_stats und team_view.
 * Fix: Verwendet korrekte HTTP-Methoden und API-Key.
 */
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS-Header
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Konfiguration
  const BASE_URL = 'http://85.215.162.180:8010/api';
  // Korrekter UUID-basierter API Key
  const API_KEY = process.env.CRCON_API_KEY || 'ebaf10ce-fa17-4971-8bd5-f22a72fd791c';

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    // Parallel Fetching
    // WICHTIG: get_gamestate benötigt oft POST, während andere Endpoints GET verwenden
    const [gamestateRes, statsRes, teamviewRes] = await Promise.all([
      fetch(`${BASE_URL}/get_gamestate`, { 
        method: 'POST', 
        headers,
        body: JSON.stringify({}) 
      }),
      fetch(`${BASE_URL}/get_live_game_stats`, { 
        method: 'GET', 
        headers 
      }),
      fetch(`${BASE_URL}/get_team_view`, { 
        method: 'GET', 
        headers 
      })
    ]);

    // Detailliertes Error Handling
    if (!gamestateRes.ok || !statsRes.ok || !teamviewRes.ok) {
      const errors = [];
      if(!gamestateRes.ok) errors.push(`Gamestate: ${gamestateRes.status}`);
      if(!statsRes.ok) errors.push(`Stats: ${statsRes.status}`);
      if(!teamviewRes.ok) errors.push(`TeamView: ${teamviewRes.status}`);
      
      throw new Error(`API Failure: ${errors.join(', ')}`);
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

    // Cache-Control: Kurzzeitiges Caching (10s)
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
