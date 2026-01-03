
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless Proxy für HLL Game Stats (Erweitert)
 * Aggregiert Daten von gamestate, live_stats und team_view.
 * Fix: Verwendet korrekte HTTP-Methoden und API-Key.
 * Update: Verbessertes Parsing der CRCON result-Wrapper und Error-Handling.
 * Update: Aggressives Cache-Busting für Upstream-Requests.
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
    // CACHE BUSTING: Timestamp generieren
    const t = Date.now();

    // Parallel Fetching mit Cache-Busting Parametern
    const [gamestateRes, statsRes, teamviewRes] = await Promise.all([
      fetch(`${BASE_URL}/get_gamestate?_=${t}`, { 
        method: 'GET', 
        headers,
        cache: 'no-store'
      }),
      fetch(`${BASE_URL}/get_live_game_stats?_=${t}`, { 
        method: 'GET', 
        headers,
        cache: 'no-store' 
      }),
      fetch(`${BASE_URL}/get_team_view?_=${t}`, { 
        method: 'GET', 
        headers,
        cache: 'no-store' 
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

    // NO CACHE: Wir wollen Echtzeit-Daten vom Game-Server
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');
    
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
