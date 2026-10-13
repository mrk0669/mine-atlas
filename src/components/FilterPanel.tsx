import { toggleItem } from "../lib/filters";
import { MINERALS, MINE_TYPES, MINES, type Mineral, type MineType } from "../lib/mines";

interface Props {
  types: MineType[];
  minerals: Mineral[];
  onTypes: (types: MineType[]) => void;
  onMinerals: (minerals: Mineral[]) => void;
  shown: number;
}

export default function FilterPanel({ types, minerals, onTypes, onMinerals, shown }: Props) {
  const activeCount = types.length + minerals.length;

  return (
    <div>
      <div className="filter-group">
        <h4>Mine type</h4>
        {MINE_TYPES.map((t) => {
          const id = `type-${t}`;
          return (
            <div className="check" key={t}>
              <label htmlFor={id}>
                <input id={id} type="checkbox" checked={types.includes(t)} onChange={() => onTypes(toggleItem(types, t))} />
                {t}
              </label>
              <span className="count">{MINES.filter((m) => m.type === t).length}</span>
            </div>
          );
        })}
      </div>

      <div className="filter-group">
        <h4>Mineral / ore</h4>
        {MINERALS.map((mn) => {
          const id = `mineral-${mn}`;
          return (
            <div className="check" key={mn}>
              <label htmlFor={id}>
                <input id={id} type="checkbox" checked={minerals.includes(mn)} onChange={() => onMinerals(toggleItem(minerals, mn))} />
                {mn}
              </label>
              <span className="count">{MINES.filter((m) => m.minerals.includes(mn)).length}</span>
            </div>
          );
        })}
      </div>

      <button
        className="btn sm block"
        disabled={activeCount === 0}
        onClick={() => {
          onTypes([]);
          onMinerals([]);
        }}
      >
        Clear filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>
      <p className="result-line">
        Showing {shown} of {MINES.length} mines
      </p>
    </div>
  );
}
