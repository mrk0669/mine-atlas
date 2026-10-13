import { useMemo, useState } from "react";
import { CalendarDays, ExternalLink } from "lucide-react";
import { CATEGORIES, NEWS, OFFICIAL_SOURCES, filterNews, formatDate, sortedNews, type NewsCategory } from "../lib/news";

type Filter = NewsCategory | "All";

/** Official news and reports from DGMS and the Ministry of Mines. */
export default function NewsPage() {
  const [category, setCategory] = useState<Filter>("All");
  const items = useMemo(() => sortedNews(filterNews(NEWS, category)), [category]);

  return (
    <div className="detail">
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: "1.6rem" }}>Official news &amp; reports</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Circulars, rules, safety alerts and press releases from the governing bodies of mining in India.
        </p>
      </header>

      <div className="source-grid">
        {OFFICIAL_SOURCES.map((s) => (
          <a key={s.name} className="card source-card" href={s.url} target="_blank" rel="noreferrer">
            <strong>
              {s.name} <ExternalLink size={13} />
            </strong>
            <small className="muted">{s.fullName}</small>
            <p className="muted" style={{ fontSize: "0.88rem", marginTop: 6 }}>
              {s.about}
            </p>
          </a>
        ))}
      </div>

      <div className="news-filter" role="tablist" aria-label="News category">
        {(["All", ...CATEGORIES] as Filter[]).map((c) => (
          <button key={c} role="tab" aria-selected={category === c} className={`chip-btn${category === c ? " on" : ""}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="news-list">
        {items.length === 0 && (
          <div className="empty">
            <h4>No items in this category</h4>
          </div>
        )}
        {items.map((n) => (
          <article key={n.id} className="card news-item">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <span className={`source-tag ${n.source === "DGMS" ? "dgms" : "mom"}`}>{n.source}</span>
              <span className="muted news-date">
                <CalendarDays size={14} /> {n.date ? formatDate(n.date) : "Date on source"}
              </span>
            </div>
            <h3>{n.title}</h3>
            <p className="muted">{n.summary}</p>
            <div className="row" style={{ justifyContent: "space-between", marginTop: 4 }}>
              <span className="pill">{n.category}</span>
              <a className="btn sm" href={n.url} target="_blank" rel="noreferrer">
                Open official page <ExternalLink size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
