
/**
 * CRCON API SERVICE - TTV CLAN
 * Handles connection to the HLL server proxy.
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
  player_id: string;
  team: 'allied' | 'axis' | 'none';
  kills: number;
  deaths: number;
  combat: number;
  offense: number;
  defense: number;
  support: number;
  kills_streak: number;
  death_streak: number;
  kill_death_ratio: number;
  kills_per_minute: number;
  time_seconds: number;
  weapons: Record<string, number>;
  death_by: Record<string, number>;
  death_by_weapons: Record<string, number>;
  most_killed: Record<string, number>;
  steaminfo?: {
    profile?: string | null;
    country?: string | null;
    has_bans: boolean;
  };
}

export interface LiveStatsResponse {
  stats: PlayerStat[];
  gamestate: GameState;
}

class CRCON_API_Service {
  async getLiveStats(): Promise<LiveStatsResponse | null> {
    try {
      const response = await fetch(PROXY_ENDPOINT, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server-Fehler: ${response.status}`);
        } else {
          if (response.status === 404) {
             throw new Error(`Der API-Proxy unter '${PROXY_ENDPOINT}' konnte nicht erreicht werden.`);
          }
          throw new Error(`Netzwerkfehler: ${response.status}`);
        }
      }

      const data = await response.json();
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
