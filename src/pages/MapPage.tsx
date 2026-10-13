import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Filter, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";
import MineMap from "../components/MineMap";
import SearchBox from "../components/SearchBox";
import { locationOf, visibleMines, type Filters } from "../lib/filters";
import { MINES, type Mine } from "../lib/mines";

/** Map page: filters (left), India map (centre), search and mine list (right). */
export default function MapPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({ types: [], minerals: [] });
  const [query, setQuery] = useState("");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const visible = useMemo(() => visibleMines(filters, query), [filters, query]);
  const focus = useMemo<Mine | null>(() => MINES.find((m) => m.id === focusId) ?? null, [focusId]);

  useEffect(() => {
    if (focusId) cardRefs.current[focusId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [focusId]);

  return (
    <div className="map-page">
      <aside className={`panel filters${filtersOpen ? " open" : ""}`} aria-label="Filters">
        <FilterPanel
          types={filters.types}
          minerals={filters.minerals}
          onTypes={(types) => setFilters((f) => ({ ...f, types }))}
          onMinerals={(minerals) => setFilters((f) => ({ ...f, minerals }))}
          shown={visible.length}
        />
      </aside>

      <section className="map-wrap">
        <div className="map-toolbar">
          <button className="btn sm" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
            <Filter size={15} /> {filtersOpen ? "Hide filters" : "Filters"}
          </button>
        </div>
        <MineMap mines={visible} focus={focus} onOpen={(id) => navigate(`/mine/${id}`)} />
      </section>

      <aside className="panel library" aria-label="Mine list">
        <SearchBox
          value={query}
          onChange={setQuery}
          onPick={(m) => {
            setQuery("");
            setFocusId(m.id);
          }}
        />
        <div className="library-head">
          {visible.length} {visible.length === 1 ? "mine" : "mines"} shown
        </div>
        {visible.length === 0 && (
          <div className="empty">
            <h4>No mines match</h4>
            <p>Clear some filters or try another mineral or state.</p>
          </div>
        )}
        {visible.map((m) => (
          <MineCard
            key={m.id}
            mine={m}
            active={focusId === m.id}
            cardRef={(el) => {
              cardRefs.current[m.id] = el;
            }}
            onFocus={() => setFocusId(m.id)}
          />
        ))}
      </aside>
    </div>
  );
}

interface CardProps {
  mine: Mine;
  active: boolean;
  cardRef: (el: HTMLElement | null) => void;
  onFocus: () => void;
}

function MineCard({ mine, active, cardRef, onFocus }: CardProps) {
  return (
    <article ref={cardRef} className={`mine-card${active ? " active" : ""}`} onClick={onFocus}>
      <h3>{mine.name}</h3>
      <p className="muted">
        <MapPin size={14} /> {locationOf(mine)}
      </p>
      <div className="row">
        <span className="badge">{mine.typeLabel}</span>
        {mine.minerals.map((m) => (
          <span key={m} className="pill">
            {m}
          </span>
        ))}
      </div>
      <Link to={`/mine/${mine.id}`} className="btn primary sm" style={{ alignSelf: "flex-start" }} onClick={(e) => e.stopPropagation()}>
        More Details <ArrowRight size={14} />
      </Link>
    </article>
  );
}
