
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless Proxy für HLL Game Stats (Erweitert)
 * Aggregiert Daten von gamestate, live_stats und team_view.
 * Fix: Verwendet korrekte HTTP-Methoden und API-Key.
 * Update: Verbessertes Parsing der CRCON result-Wrapper und Error-Handling.
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
  const API_KEY = process.env.CRCON_API_KEY || '***REMOVED***';

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

    // HTTP-Level Error Handling
    if (!gamestateRes.ok || !statsRes.ok || !teamviewRes.ok) {
      const errors = [];
      if(!gamestateRes.ok) errors.push(`Gamestate HTTP: ${gamestateRes.status}`);
      if(!statsRes.ok) errors.push(`Stats HTTP: ${statsRes.status}`);
      if(!teamviewRes.ok) errors.push(`TeamView HTTP: ${teamviewRes.status}`);
      
      throw new Error(`API HTTP Failure: ${errors.join(', ')}`);
    }

    const [gamestateData, statsData, teamviewData] = await Promise.all([
      gamestateRes.json(),
      statsRes.json(),
      teamviewRes.json()
    ]);

    // CRCON-Level Error Handling (failed property)
    if (gamestateData.failed) throw new Error(`Gamestate API Error: ${gamestateData.error}`);
    if (statsData.failed) throw new Error(`Stats API Error: ${statsData.error}`);
    if (teamviewData.failed) throw new Error(`TeamView API Error: ${teamviewData.error}`);

    // Aggregiertes Resultat: Zugriff direkt auf .result
    const aggregatedData = {
      gamestate: gamestateData.result,
      stats: statsData.result?.stats || [],
      team_view: teamviewData.result,
      meta: {
        timestamp: new Date().toISOString(),
        version: gamestateData.version
      }
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
