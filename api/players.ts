
// Dieser Endpoint ist veraltet. Bitte nutzen Sie /api/game-stats.
import type { VercelRequest, VercelResponse } from '@vercel/node';
export default (_: VercelRequest, res: VercelResponse) => res.status(410).json({ error: "Endpoint deprecated. Use /api/game-stats" });
