import { describe, expect, it } from "vitest";
import { suggest, visibleMines } from "../lib/filters";
import { filterNews, formatDate, NEWS, sortedNews } from "../lib/news";
import { actions, getState, selectMe } from "../lib/store";

describe("mine filters", () => {
  it("OR-s within a group and AND-s between groups", () => {
    const openCast = visibleMines({ types: ["Open-cast"], minerals: [] }, "");
    expect(openCast.map((m) => m.id).sort()).toEqual(["bailadila", "gevra", "majhgawan", "panchpatmali"]);

    const coalOrDiamond = visibleMines({ types: [], minerals: ["Coal", "Diamond"] }, "");
    expect(coalOrDiamond.map((m) => m.id).sort()).toEqual(["gevra", "majhgawan"]);

    const underUranium = visibleMines({ types: ["Underground"], minerals: ["Uranium"] }, "");
    expect(underUranium.map((m) => m.id)).toEqual(["narwapahar"]);

    expect(visibleMines({ types: ["Mixed"], minerals: [] }, "")).toHaveLength(0);
  });

  it("searches by name, state and operator", () => {
    expect(visibleMines({ types: [], minerals: [] }, "chhattisgarh").map((m) => m.id).sort()).toEqual(["bailadila", "gevra"]);
    expect(suggest("nalco").map((m) => m.id)).toEqual(["panchpatmali"]);
    expect(suggest("   ")).toEqual([]);
  });
});

describe("sign in", () => {
  it("creates an account, signs out, and signs back in", () => {
    expect(actions.signup({ name: "Test User", email: "t@example.com", password: "secret1" })).toBeNull();
    expect(selectMe(getState())?.name).toBe("Test User");
    expect(actions.signup({ name: "Dup", email: "T@example.com", password: "secret1" })).toMatch(/already exists/);

    actions.logout();
    expect(selectMe(getState())).toBeNull();
    expect(actions.login("t@example.com", "wrong")).toMatch(/Incorrect/);
    expect(actions.login("t@example.com", "secret1")).toBeNull();
    expect(selectMe(getState())?.name).toBe("Test User");
  });
});

describe("official news", () => {
  it("filters by category", () => {
    const policy = filterNews(NEWS, "Policy & rules");
    expect(policy.length).toBeGreaterThan(0);
    expect(policy.every((n) => n.category === "Policy & rules")).toBe(true);
    expect(filterNews(NEWS, "All")).toHaveLength(NEWS.length);
  });

  it("lists dated items newest first, undated last", () => {
    const sorted = sortedNews(NEWS);
    const dated = sorted.filter((n) => n.date).map((n) => n.date as string);
    expect([...dated].sort().reverse()).toEqual(dated);
    const firstUndated = sorted.findIndex((n) => !n.date);
    expect(sorted.slice(firstUndated).every((n) => !n.date)).toBe(true);
  });

  it("links every item to an official page and formats dates", () => {
    expect(NEWS.every((n) => /^https:\/\/(www\.)?(dgms\.gov\.in|mines\.gov\.in|pib\.gov\.in)\//.test(n.url))).toBe(true);
    expect(formatDate("2026-05-12")).toBe("12 May 2026");
  });
});
