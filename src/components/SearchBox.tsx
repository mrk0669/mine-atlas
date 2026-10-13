import { useState, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { locationOf, suggest } from "../lib/filters";
import type { Mine } from "../lib/mines";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onPick: (mine: Mine) => void;
}

export default function SearchBox({ value, onChange, onPick }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const items = suggest(value);
  const highlighted = Math.min(active, Math.max(items.length - 1, 0));

  const pick = (m: Mine) => {
    onPick(m);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(items[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="search" role="combobox" aria-expanded={open && items.length > 0} aria-haspopup="listbox">
      <Search size={16} />
      <input
        value={value}
        placeholder="Search mine, mineral or state"
        aria-label="Search mines"
        aria-autocomplete="list"
        onChange={(e) => {
          onChange(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      {open && items.length > 0 && (
        <ul className="suggest" role="listbox">
          {items.map((m, i) => (
            <li
              key={m.id}
              role="option"
              aria-selected={i === highlighted}
              className={i === highlighted ? "on" : ""}
              // mousedown keeps focus in the input so the blur handler does not close the list first
              onMouseDown={(e) => {
                e.preventDefault();
                pick(m);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <strong>{m.name}</strong>
              <small>
                {locationOf(m)} · {m.minerals.join(", ")}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
