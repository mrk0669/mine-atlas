import { MINES, type Mine, type MineType, type Mineral } from "./mines";

export interface Filters {
  types: MineType[];
  minerals: Mineral[];
}

/** Within a group selections are OR-ed; between the two groups they are AND-ed. */
export function matchesFilters(m: Mine, f: Filters): boolean {
  const typeOk = f.types.length === 0 || f.types.includes(m.type);
  const mineralOk = f.minerals.length === 0 || m.minerals.some((x) => f.minerals.includes(x));
  return typeOk && mineralOk;
}

export function matchesQuery(m: Mine, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [m.name, m.district, m.state, m.operator, m.typeLabel, ...m.minerals].some((v) =>
    v.toLowerCase().includes(q),
  );
}

export function visibleMines(f: Filters, query: string, list: Mine[] = MINES): Mine[] {
  return list.filter((m) => matchesFilters(m, f) && matchesQuery(m, query));
}

export function suggest(query: string, limit = 6): Mine[] {
  if (!query.trim()) return [];
  return MINES.filter((m) => matchesQuery(m, query)).slice(0, limit);
}

export const locationOf = (m: Mine): string => `${m.district}, ${m.state}`;

export const toggleItem = <T>(list: T[], item: T): T[] =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

export const coordsOf = (m: Mine): string =>
  `${m.lat.toFixed(1)}°N, ${m.lng.toFixed(1)}°E`;
