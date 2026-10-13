import { LogOut, Pickaxe } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { actions } from "../lib/store";

const TABS = [
  { to: "/", label: "MAP" },
  { to: "/news", label: "NEWS & REPORTS" },
];

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="brand" aria-label="Mine Atlas home">
        <Pickaxe size={20} />
        <span>MINE ATLAS</span>
      </Link>
      <div className="header-right">
        <nav className="tabs" aria-label="Sections">
          {TABS.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.to === "/"} className={({ isActive }) => `tab${isActive ? " active" : ""}`}>
              {t.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="icon-btn"
          title="Sign out"
          aria-label="Sign out"
          onClick={() => {
            actions.logout();
            toast("Signed out");
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
