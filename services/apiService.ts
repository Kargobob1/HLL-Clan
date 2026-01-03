
/**
 * CRCON API SERVICE - TTV CLAN
 * Handles connection to the HLL server proxy with advanced scoreboard support.
 */

const PROXY_ENDPOINT = '/api/game-stats';

// --- Interfaces for HLL Structures ---

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
  next_map?: string;
}

export interface PlayerCombatStats {
  player: string;
  player_id: string; // steam64 usually
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
  longest_life_secs?: number; // Added for highlights
  weapons: Record<string, number>;
  death_by: Record<string, number>;
  most_killed: Record<string, number>;
}

// Player Info inside a Squad (from get_team_view)
export interface SquadMember {
  player_id: string;
  name: string;
  role: string; // e.g., "officer", "rifleman", "medic"
  steam_profile_url?: string;
  is_vip?: boolean;
  unit_id?: number;
  loadout?: string;
  level?: number;
}

// Squad Structure
export interface Squad {
  type: 'infantry' | 'armor' | 'recon';
  squad_name: string;
  has_leader: boolean;
  members: SquadMember[];
}

// Commander Structure
export interface Commander {
  player_id: string;
  name: string;
  role: 'armycommander';
  level?: number;
}

// Team Structure (Allies/Axis)
export interface TeamData {
  commander: Commander | null;
  squads: Record<string, Squad>; // Key is squad index or name
  unassigned: SquadMember[];
}

// The Combined Response from our Proxy
export interface FullScoreboardData {
  gamestate: GameState;
  stats: PlayerCombatStats[]; // Flat list for lookup
  team_view: {
    allies: TeamData;
    axis: TeamData;
  };
}

class CRCON_API_Service {
  async getLiveStats(): Promise<FullScoreboardData | null> {
    try {
      // CACHE BUSTING: Add timestamp to URL to prevent browser caching
      const url = `${PROXY_ENDPOINT}?t=${new Date().getTime()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`Server-Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.failed) {
        throw new Error(data.error || "Remote-API Fehler");
      }

      return data as FullScoreboardData;
    } catch (err: any) {
      console.error("Dashboard Service Error:", err);
      throw err;
    }
  }
}

export const api = new CRCON_API_Service();
