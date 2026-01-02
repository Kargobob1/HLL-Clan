
/**
 * CRCON API SERVICE - TTV CLAN
 * Nutzt den Proxy-Endpoint um Mixed Content und CORS Probleme zu umgehen.
 */

const PROXY_ENDPOINT = '/api/game-stats';

export interface GameState {
  allied_score: number;
  axis_score: number;
  time_remaining: string;
  current_map: {
    pretty_name: string;
    name: string;
  } | string;
  num_allied_players: number;
  num_axis_players: number;
}

export interface PlayerStat {
  player: string;
  steam_id_64?: string;
  team: 'allied' | 'axis' | 'none';
  kills: number;
  deaths: number;
  combat: number;
  offence: number;
  defence: number;
  support: number;
  kills_streak: number;
  death_streak: number;
}

export interface LiveStatsResponse {
  stats: PlayerStat[];
  gamestate: GameState;
}

class CRCON_API_Service {
  /**
   * Abruf der Live-Statistiken über den Proxy.
   */
  async getLiveStats(): Promise<LiveStatsResponse | null> {
    try {
      // Nutze direkten relativen Pfad
      const response = await fetch(PROXY_ENDPOINT, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        // Bei 404 oder anderen Fehlern versuchen wir die Fehlermeldung zu extrahieren
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server-Fehler: ${response.status}`);
        } else {
          if (response.status === 404) {
             throw new Error(`Der API-Proxy unter '${PROXY_ENDPOINT}' konnte nicht erreicht werden. (404 Not Found)`);
          }
          throw new Error(`Netzwerkfehler: ${response.status}`);
        }
      }

      const data = await response.json();
      
      // CRCON hüllt die Daten meist in ein 'result' Objekt
      const payload = data.result || data;

      if (payload.failed) {
        throw new Error(payload.error || "Remote-API Fehler");
      }

      return payload as LiveStatsResponse;
    } catch (err: any) {
      console.error("Dashboard Service Error:", err);
      throw err;
    }
  }
}

export const api = new CRCON_API_Service();
