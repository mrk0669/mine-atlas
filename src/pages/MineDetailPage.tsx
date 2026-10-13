import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cog,
  ExternalLink,
  Gauge,
  History,
  Images,
  Layers,
  Leaf,
  MapPin,
  Mountain,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { coordsOf, locationOf } from "../lib/filters";
import { getMine, PANEL_ORDER, sentencesOf, type PanelKey } from "../lib/mines";

type MediaKind = "mine" | "equipment" | "infrastructure";

interface MediaItem {
  kind: MediaKind;
  caption: string;
}

// No photos are supplied yet, so the gallery uses placeholder tiles.
const MEDIA: MediaItem[] = [
  { kind: "mine", caption: "Mine view" },
  { kind: "equipment", caption: "Equipment" },
  { kind: "infrastructure", caption: "Infrastructure" },
  { kind: "mine", caption: "Mine view 2" },
  { kind: "equipment", caption: "Equipment 2" },
  { kind: "infrastructure", caption: "Infrastructure 2" },
];

const MEDIA_ICON: Record<MediaKind, LucideIcon> = { mine: Mountain, equipment: Truck, infrastructure: Building2 };

const PANEL_ICON: Record<PanelKey, LucideIcon> = {
  Historical: History,
  Operational: Cog,
  Geological: Layers,
  Production: Gauge,
  Infrastructure: Building2,
  Sustainability: Leaf,
};

const PREVIEW_SENTENCES = 3;

export default function MineDetailPage() {
  const { id = "" } = useParams();
  const mine = getMine(id);
  const [expanded, setExpanded] = useState<Partial<Record<PanelKey, boolean>>>({});
  const [preview, setPreview] = useState<number | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Arrow keys step through the enlarged preview.
  useEffect(() => {
    if (preview === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPreview((i) => (i === null ? i : (i + 1) % MEDIA.length));
      if (e.key === "ArrowLeft") setPreview((i) => (i === null ? i : (i - 1 + MEDIA.length) % MEDIA.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  if (!mine) {
    return (
      <div className="detail">
        <div className="empty">
          <h4>Mine not found</h4>
          <p>This mine is not in the atlas.</p>
          <Link className="btn" to="/">
            Back to map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail">
      <Link to="/" className="btn ghost sm" style={{ marginBottom: 14 }}>
        <ArrowLeft size={15} /> Back to map
      </Link>

      <section className="hero">
        <div>
          <div className="row">
            <span className="badge">{mine.typeLabel}</span>
            {mine.minerals.map((m) => (
              <span key={m} className="pill">
                {m}
              </span>
            ))}
          </div>
          <h1>{mine.name}</h1>
          <p className="muted row">
            <MapPin size={14} /> {locationOf(mine)}
          </p>
        </div>
        {mine.source && (
          <div className="row">
            <a className="btn" href={mine.source} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> Official source
            </a>
          </div>
        )}
        <div className="facts" style={{ width: "100%" }}>
          <div className="fact">
            <span>Operator</span>
            {mine.operator}
          </div>
          <div className="fact">
            <span>Coordinates</span>
            {coordsOf(mine)}
          </div>
          <div className="fact">
            <span>Minerals</span>
            {mine.minerals.join(", ")}
          </div>
          <div className="fact">
            <span>Mine type</span>
            {mine.typeLabel}
          </div>
        </div>
      </section>

      <div className="panels">
        {PANEL_ORDER.map((key) => {
          const Icon = PANEL_ICON[key];
          const sentences = sentencesOf(mine.panels[key]);
          const open = Boolean(expanded[key]);
          const long = sentences.length > PREVIEW_SENTENCES;
          const shown = long && !open ? sentences.slice(0, PREVIEW_SENTENCES) : sentences;
          return (
            <article className="panel-card" key={key}>
              <h2>
                <Icon size={18} /> {key}
              </h2>
              <ul>
                {shown.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              {long && (
                <button className="more" onClick={() => setExpanded((e) => ({ ...e, [key]: !open }))}>
                  {open ? "Show less" : `Show more (${sentences.length - PREVIEW_SENTENCES} more)`}
                </button>
              )}
            </article>
          );
        })}
      </div>

      <div className="section-title">
        <h2>Media gallery</h2>
        <button className="btn sm" onClick={() => setShowGallery(true)}>
          <Images size={15} /> More images
        </button>
      </div>
      <div className="gallery">
        {MEDIA.slice(0, 3).map((item, i) => (
          <MediaTile key={i} item={item} onClick={() => setPreview(i)} />
        ))}
      </div>

      {preview !== null && (
        <Modal title={`${MEDIA[preview].caption} · ${mine.name}`} onClose={() => setPreview(null)}>
          <MediaTile item={MEDIA[preview]} big onClick={() => undefined} />
          <div className="modal-nav">
            <button className="btn" onClick={() => setPreview((preview - 1 + MEDIA.length) % MEDIA.length)}>
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="muted">
              {preview + 1} / {MEDIA.length}
            </span>
            <button className="btn" onClick={() => setPreview((preview + 1) % MEDIA.length)}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </Modal>
      )}

      {showGallery && (
        <Modal title={`All images · ${mine.name}`} onClose={() => setShowGallery(false)} wide>
          <div className="gallery">
            {MEDIA.map((item, i) => (
              <MediaTile
                key={i}
                item={item}
                onClick={() => {
                  setShowGallery(false);
                  setPreview(i);
                }}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function MediaTile({ item, big = false, onClick }: { item: MediaItem; big?: boolean; onClick: () => void }) {
  const Icon = MEDIA_ICON[item.kind];
  return (
    <button type="button" className={`tile${big ? " big" : ""}`} onClick={onClick}>
      <Icon size={big ? 28 : 22} />
      <span>{item.caption}</span>
      <small>Photo placeholder</small>
    </button>
  );
}
