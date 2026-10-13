/**
 * Official news and reports from the governing bodies of mining in India.
 * Every item links to the official page it came from. Titles and summaries follow
 * the official listings as of 10 Oct 2026; open the link for the full document.
 * To add an item, add an entry to NEWS below.
 */

export type NewsSource = "DGMS" | "Ministry of Mines";

export type NewsCategory = "Safety & regulation" | "Policy & rules" | "Auctions & industry" | "Reports & notices";

export const CATEGORIES: NewsCategory[] = [
  "Safety & regulation",
  "Policy & rules",
  "Auctions & industry",
  "Reports & notices",
];

export interface NewsItem {
  id: string;
  source: NewsSource;
  category: NewsCategory;
  title: string;
  summary: string;
  /** YYYY-MM-DD, only when the official source gives an exact date. */
  date?: string;
  url: string;
}

export interface OfficialSource {
  name: string;
  fullName: string;
  about: string;
  url: string;
}

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    name: "DGMS",
    fullName: "Directorate General of Mines Safety",
    about: "Mine safety regulation: circulars, rules, bulletins and safety alerts.",
    url: "https://www.dgms.gov.in/",
  },
  {
    name: "Ministry of Mines",
    fullName: "Government of India",
    about: "Mineral policy, auctions, concession rules and ministry announcements.",
    url: "https://mines.gov.in/",
  },
  {
    name: "PIB",
    fullName: "Press Information Bureau",
    about: "Official press releases from the Ministry of Mines.",
    url: "https://www.pib.gov.in/allrelease.aspx?reg=3&lang=1",
  },
];

const PIB_LIST = "https://www.pib.gov.in/allrelease.aspx?reg=3&lang=1";

export const NEWS: NewsItem[] = [
  {
    id: "dgms-osh-central-rules",
    source: "DGMS",
    category: "Safety & regulation",
    title: "OSH & WC (Central) Rules, 2026: Gazette notification",
    summary: "Gazette notification of the Occupational Safety, Health and Working Conditions (Central) Rules, 2026.",
    date: "2026-05-12",
    url: "https://www.dgms.gov.in/",
  },
  {
    id: "dgms-draft-coal",
    source: "DGMS",
    category: "Safety & regulation",
    title: "Draft OSH & WC (Coal Mines) Regulations, 2026",
    summary: "Draft under section 136 of the OSH & WC Code, 2020, published for comment.",
    date: "2026-01-31",
    url: "https://www.dgms.gov.in/",
  },
  {
    id: "dgms-draft-metalliferous",
    source: "DGMS",
    category: "Safety & regulation",
    title: "Draft Metalliferous Mines Regulations, 2026",
    summary: "Draft under section 136 of the OSH & WC Code, 2020, published for comment.",
    date: "2026-02-11",
    url: "https://www.dgms.gov.in/",
  },
  {
    id: "dgms-circulars-2026",
    source: "DGMS",
    category: "Safety & regulation",
    title: "DGMS (Tech) Circulars 01 and 02 of 2026",
    summary: "Technical circulars issued by DGMS in 2026. The circulars page has the full text.",
    url: "https://www.dgms.gov.in/UserView/index?mid=1648",
  },
  {
    id: "dgms-alert-2026-01",
    source: "DGMS",
    category: "Safety & regulation",
    title: "Safety Alert 01/2026: fatal tipper accident",
    summary:
      "Fatal accident involving a tipper at the surface miner face of East Cut Turra Coal Bench, Jayant Opencast Project, Northern Coalfields Ltd.",
    url: "https://www.dgms.gov.in/UserView/index?mid=1362",
  },
  {
    id: "dgms-bulletin-q1-2026",
    source: "DGMS",
    category: "Reports & notices",
    title: "DGMS Bulletin, January to March 2026",
    summary: "DGMS Bulletin covering January to March 2026.",
    url: "https://www.dgms.gov.in/UserView/index?mid=1649",
  },
  {
    id: "mom-auction-rules-2026",
    source: "Ministry of Mines",
    category: "Policy & rules",
    title: "Mineral (Auction) Second Amendment Rules, 2026",
    summary:
      "Notified on 30 March 2026. Blocks can exclude areas where mining is not feasible if they hold under 25% of the resources. Lease extensions beyond 3 years apply only to blocks with forest land.",
    date: "2026-04-07",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2249750&reg=3&lang=2",
  },
  {
    id: "mom-contiguous-area-2026",
    source: "Ministry of Mines",
    category: "Policy & rules",
    title: "Mineral Concession Rules: contiguous area amendment",
    summary:
      "Leases can add contiguous land: up to 10% of the area for mining leases and 30% for composite licences.",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2249459&reg=3&lang=1",
  },
  {
    id: "mom-secretary-2026-07",
    source: "Ministry of Mines",
    category: "Policy & rules",
    title: "Shri Keshav Chandra, IAS, assumes charge as Secretary, Ministry of Mines",
    summary: "Change of Secretary at the Ministry of Mines.",
    date: "2026-07-27",
    url: PIB_LIST,
  },
  {
    id: "mom-jk-blocks-2026-10",
    source: "Ministry of Mines",
    category: "Auctions & industry",
    title: "Jammu & Kashmir: two mineral blocks auctioned",
    summary: "Mining development begins in the UT after the auction of two mineral blocks.",
    date: "2026-10-02",
    url: PIB_LIST,
  },
  {
    id: "mom-offshore-auction-2026-10",
    source: "Ministry of Mines",
    category: "Auctions & industry",
    title: "Auction of two offshore mineral blocks launched",
    summary: "The Secretary launched the auction virtually and urged industry to take part.",
    date: "2026-10-01",
    url: PIB_LIST,
  },
  {
    id: "mom-101-blocks-2026-05",
    source: "Ministry of Mines",
    category: "Auctions & industry",
    title: "101 auctioned mineral blocks operationalised",
    summary: "The ministry announced on 7 May 2026 that 101 auctioned mineral blocks are now operational.",
    date: "2026-05-07",
    url: PIB_LIST,
  },
  {
    id: "mom-critical-minerals-2026-06",
    source: "Ministry of Mines",
    category: "Auctions & industry",
    title: "Critical minerals: 56 blocks and 11 exploration licence blocks auctioned",
    summary: "Status of critical mineral auctions as of 23 June 2026.",
    date: "2026-06-23",
    url: PIB_LIST,
  },
  {
    id: "mom-mining-week-2026",
    source: "Ministry of Mines",
    category: "Reports & notices",
    title: "India Mining Week 2026, 15 to 17 November",
    summary:
      "Summit at Yashobhoomi Convention Centre, New Delhi. Theme: Stronger Resources, Smarter Mining, Sustainable Tomorrow.",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2285100&reg=3&lang=1",
  },
  {
    id: "mom-annual-report-2025-26",
    source: "Ministry of Mines",
    category: "Reports & notices",
    title: "Annual Report 2025-26: overview",
    summary: "Overview of the Ministry of Mines annual report, posted on the ministry website.",
    url: "https://mines.gov.in/",
  },
];

/** Newest first. Items without an exact date go last, in their listed order. */
export function sortedNews(items: NewsItem[] = NEWS): NewsItem[] {
  return [...items].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

export function filterNews(items: NewsItem[], category: NewsCategory | "All"): NewsItem[] {
  return category === "All" ? items : items.filter((n) => n.category === category);
}

/** "12 May 2026" from "2026-05-12". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
