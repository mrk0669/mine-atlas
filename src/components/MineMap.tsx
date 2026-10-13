import { useEffect } from "react";
import * as L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Mine } from "../lib/mines";

const pinIcon = L.divIcon({ className: "mine-pin", html: "<span></span>", iconSize: [22, 22], iconAnchor: [11, 11] });
const activeIcon = L.divIcon({ className: "mine-pin active", html: "<span></span>", iconSize: [22, 22], iconAnchor: [11, 11] });

/** Pans and zooms the map to the focused mine. */
function FlyTo({ target }: { target: Mine | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 7, { duration: 0.9 });
  }, [target, map]);
  return null;
}

interface Props {
  mines: Mine[];
  focus: Mine | null;
  onOpen: (id: string) => void;
}

export default function MineMap({ mines, focus, onOpen }: Props) {
  return (
    <MapContainer center={[22.5, 82.5]} zoom={5} scrollWheelZoom className="mine-map" aria-label="Map of Indian mines">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FlyTo target={focus} />
      {mines.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={focus?.id === m.id ? activeIcon : pinIcon}
          eventHandlers={{ click: () => onOpen(m.id) }}
        >
          <Tooltip direction="top" offset={[0, -12]}>
            {m.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
