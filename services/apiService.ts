
/**
 * CRCON API SERVICE - TTV CLAN
 * Greift auf die lokale Vercel API-Route zu, die als Proxy fungiert.
 */

// Pfad zur lokalen API-Route (relativ zum Frontend)
const API_ENDPOINT = '/api/game-stats';

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
  gamestate: {
    allied_score: number;
    axis_score: number;
    time_remaining: string;
    current_map: {
      pretty_name: string;
      name: string;
    } | string;
    num_allied_players: number;
    num_axis_players: number;
  };
}

class CRCON_API_Service {
  /**
   * Holt die Live-Statistiken über den internen API-Proxy.
   */
  async getLiveStats(): Promise<LiveStatsResponse | null> {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        // Versuche Fehlernachricht aus dem JSON zu extrahieren
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP-Fehler: ${response.status}`);
      }

      const data = await response.json();
      
      // Falls die API ein "failed" Flag im Body sendet (wie CRCON oft tut)
      if (data.failed) {
        throw new Error(data.error || "Die Spiele-API meldete einen Fehler.");
      }

      // CRCON hüllt die eigentlichen Daten meist in ein 'result' Objekt
      // Wir geben direkt das zurück, was das Dashboard erwartet
      return data.result || data;
    } catch (err: any) {
      console.error("Dashboard Fetch Error:", err);
      throw err;
    }
  }
}

export const api = new CRCON_API_Service();
