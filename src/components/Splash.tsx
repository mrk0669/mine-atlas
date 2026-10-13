import { Pickaxe } from "lucide-react";

export default function Splash() {
  return (
    <div className="splash" role="status" aria-label="Launching application">
      <div className="splash-logo">
        <Pickaxe size={40} />
        <span>MINE ATLAS</span>
      </div>
      <div className="splash-bar">
        <span />
      </div>
      <p>Launching application…</p>
    </div>
  );
}
