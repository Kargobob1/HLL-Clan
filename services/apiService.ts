
const BASE_URL = 'http://85.215.162.180:8010/api';

export interface PlayerStats {
  name: string;
  player_id: string;
  team: 'allied' | 'axis' | 'none';
  unit_name: string;
  role: string;
  level: number;
  kills: number;
  deaths: number;
  combat: number;
  offence: number;
  defence: number;
  support: number;
  last_seen?: string;
}

export interface GameState {
  allied_score: number;
  axis_score: number;
  time_remaining: string;
  current_map: {
    name: string;
    pretty_name: string;
  } | string;
  next_map: {
    name: string;
    pretty_name: string;
  } | string;
  num_allied_players: number;
  num_axis_players: number;
  player_count?: number;
}

class CRCON_API_Service {
  /**
   * Zentraler API-Call an den CRCON Server
   */
  private async call(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Falls ein API-Token benötigt wird, müsste er hier als Bearer gesetzt werden.
          // Viele CRCON Instanzen erlauben Read-Only Stats ohne Token, wenn so konfiguriert.
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) throw new Error(`HTTP Status ${response.status}`);
      const data = await response.json();
      
      // CRCON API Standard: { result: ..., failed: boolean, error: string }
      if (data.failed) {
        console.error(`API Fehler (${endpoint}):`, data.error);
        return null;
      }
      
      return data.result;
    } catch (err) {
      console.warn(`Verbindungsfehler zu ${endpoint}:`, err);
      return null;
    }
  }

  async getGameState(): Promise<GameState | null> {
    const data = await this.call('get_gamestate');
    if (!data) return null;
    
    return {
      allied_score: data.allied_score ?? data.allied ?? 0,
      axis_score: data.axis_score ?? data.axis ?? 0,
      time_remaining: data.time_remaining || "00:00:00",
      current_map: data.current_map || "Unbekannt",
      next_map: data.next_map || "Unbekannt",
      num_allied_players: data.num_allied_players || 0,
      num_axis_players: data.num_axis_players || 0,
      player_count: (data.num_allied_players || 0) + (data.num_axis_players || 0)
    };
  }

  async getDetailedPlayers(): Promise<PlayerStats[]> {
    const data = await this.call('get_detailed_players');
    if (!data) return [];
    
    // Konvertierung von Dictionary (SteamID as Key) zu Array
    const playerList = typeof data === 'object' && !Array.isArray(data) 
      ? Object.values(data) 
      : (Array.isArray(data) ? data : []);

    return playerList.map((p: any) => ({
      name: p.name || "Unbekannt",
      player_id: p.steam_id_64 || p.player_id || "N/A",
      team: p.team?.toLowerCase() || 'none',
      unit_name: p.unit_name || 'Kein Trupp',
      role: p.role || 'Infanterie',
      level: p.level || 0,
      kills: p.kills || 0,
      deaths: p.deaths || 0,
      combat: p.combat || 0,
      offence: p.offence || 0,
      defence: p.defence || 0,
      support: p.support || 0
    }));
  }

  async getPlayersHistory(query: string = ""): Promise<PlayerStats[]> {
    if (!query) return [];
    const data = await this.call('get_players_history', 'POST', { player_name: query });
    if (!data || !data.players) return [];
    
    return data.players.map((p: any) => ({
      name: p.name,
      player_id: p.player_id,
      team: 'none',
      unit_name: 'Historie',
      role: 'Soldat',
      level: p.level || 0,
      kills: 0,
      deaths: 0,
      combat: 0,
      offence: 0,
      defence: 0,
      support: 0,
      last_seen: p.last_seen
    }));
  }

  async getTopStats() {
    const players = await this.getDetailedPlayers();
    if (players.length === 0) return null;
    
    return {
      sortedByCombat: [...players].sort((a, b) => b.combat - a.combat).slice(0, 5),
      sortedByKills: [...players].sort((a, b) => b.kills - a.kills).slice(0, 5),
      sortedBySupport: [...players].sort((a, b) => b.support - a.support).slice(0, 5)
    };
  }
}

export const api = new CRCON_API_Service();
