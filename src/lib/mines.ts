export type MineType = "Open-cast" | "Underground" | "Mixed";
export type Mineral = "Bauxite" | "Iron Ore" | "Coal" | "Uranium" | "Diamond";

export type PanelKey =
  | "Historical"
  | "Operational"
  | "Geological"
  | "Production"
  | "Infrastructure"
  | "Sustainability";

export interface Mine {
  id: string;
  name: string;
  district: string;
  state: string;
  typeLabel: string;
  type: MineType;
  minerals: Mineral[];
  operator: string;
  lat: number;
  lng: number;
  source?: string;
  panels: Record<PanelKey, string>;
}

export const PANEL_ORDER: PanelKey[] = [
  "Historical",
  "Operational",
  "Geological",
  "Production",
  "Infrastructure",
  "Sustainability",
];

export const MINE_TYPES: MineType[] = ["Open-cast", "Underground", "Mixed"];
export const MINERALS: Mineral[] = ["Bauxite", "Iron Ore", "Coal", "Uranium", "Diamond"];

export const MINES: Mine[] = [
  {
    id: "panchpatmali",
    name: "Panchpatmali Bauxite Mine",
    district: "Koraput",
    state: "Odisha",
    typeLabel: "Opencast",
    type: "Open-cast",
    minerals: ["Bauxite"],
    operator: "NALCO",
    lat: 18.8,
    lng: 82.7,
    source: "https://nalcoindia.com/business/operation/bauxite-mines/",
    panels: {
      Historical:
        "Bauxite deposit identified during geological exploration in the 1970s. Mining commenced in 1985 to supply NALCO's alumina refinery at Damanjodi. Developed as India's largest captive bauxite mine. Plays a crucial role in the country's aluminium industry. Government-owned through NALCO.",
      Geological:
        "Lateritic bauxite deposit spread over a plateau. Resource estimated at over 300 million tonnes. Average alumina content around 45%. Low reactive silica content improves refining efficiency. Ore body extends over approximately 18 km. Thick and continuous mineralization zone.",
      Operational:
        "Fully mechanized opencast mining. Uses hydraulic excavators, dumpers, dozers, graders, and drills. Controlled blasting is practiced where required. Ore transported through a long-distance conveyor system. Continuous production planning and mine scheduling are employed.",
      Production:
        "Capacity exceeds 6 million tonnes annually. Supplies ore exclusively to Damanjodi refinery. Consistent high-volume production throughout the year. Ore undergoes alumina extraction through Bayer Process. Major contributor to India's aluminium sector.",
      Infrastructure:
        "Connected to refinery through a 14.6 km conveyor belt. Equipped with workshops, haul roads, crushing facilities, and maintenance centers. Dedicated power and communication systems. Employee facilities available nearby. Integrated with refinery logistics network.",
      Sustainability:
        "Progressive mine reclamation is carried out. Extensive afforestation programs implemented on mined-out areas. Water conservation structures constructed. Environmental monitoring conducted regularly. CSR activities include healthcare, education, and village development projects.",
    },
  },
  {
    id: "bailadila",
    name: "Bailadila Iron Ore Mine",
    district: "Dantewada",
    state: "Chhattisgarh",
    typeLabel: "Mechanized Opencast",
    type: "Open-cast",
    minerals: ["Iron Ore"],
    operator: "NMDC Ltd.",
    lat: 18.7,
    lng: 81.2,
    panels: {
      Historical:
        "Exploration began in the 1950s and mining started in 1964. Developed by NMDC to exploit world-class hematite deposits. Has supplied iron ore to domestic and international markets for decades. Significant contributor to India's steel industry. Government-owned through NMDC.",
      Geological:
        "High-grade hematite iron ore deposit. Fe content generally ranges from 63-66%. Large reserves distributed across the Bailadila range. Ore body occurs in banded iron formations. Low impurity levels make it suitable for steel production. Extensive mineralization across multiple deposits.",
      Operational:
        "Uses large electric shovels, drills, dumpers, and crushing plants. Bench mining method adopted. Controlled blasting used for rock fragmentation. Rail loading systems handle ore transportation. Highly mechanized production system with modern fleet management.",
      Production:
        "Annual production capacity exceeds 14 million tonnes. Supplies ore to steel plants and export markets. Beneficiation and screening facilities improve ore quality. Major source of high-grade iron ore in India. Consistently among NMDC's top-producing mines.",
      Infrastructure:
        "Equipped with beneficiation plants, railway sidings, workshops, and maintenance facilities. Extensive haul road network. Employee townships and social infrastructure developed nearby. Reliable power and water supply systems. Integrated logistics support.",
      Sustainability:
        "Land reclamation programs implemented after mining. Dust suppression and water management systems installed. Biodiversity conservation activities undertaken. Community development programs support nearby villages. Focus on sustainable mining practices and environmental compliance.",
    },
  },
  {
    id: "gevra",
    name: "Gevra Coal Mine",
    district: "Korba",
    state: "Chhattisgarh",
    typeLabel: "Opencast",
    type: "Open-cast",
    minerals: ["Coal"],
    operator: "South Eastern Coalfields Ltd. (SECL)",
    lat: 22.3,
    lng: 82.5,
    panels: {
      Historical:
        "Developed as part of Coal India's expansion program. Became one of Asia's largest opencast coal mines. Critical supplier of thermal coal to power plants. Supports India's energy security objectives. Operated under Coal India through SECL.",
      Geological:
        "Located within the Korba Coalfield. Thick coal seams associated with Gondwana formations. Large extractable reserves extending over extensive areas. Multiple coal seams present. Geological conditions favorable for large-scale opencast extraction.",
      Operational:
        "Uses draglines, shovels, dumpers, drills, and surface miners. Large-scale blasting conducted for overburden removal. High-capacity haulage system employed. Advanced dispatch and monitoring systems utilized. Continuous production scheduling ensures high output.",
      Production:
        "Annual production exceeds 50 million tonnes. Major supplier to thermal power stations. Coal processed through crushing and sizing facilities. One of India's highest-producing coal mines. Strategic energy resource for the country.",
      Infrastructure:
        "Extensive haul roads and railway connectivity. Coal handling plants and workshops available. Dedicated maintenance facilities and equipment yards. Township and employee housing developed nearby. Strong logistical infrastructure supports operations.",
      Sustainability:
        "Overburden dumps are scientifically reclaimed. Plantation drives carried out regularly. Mine water treated and reused. Community welfare programs focus on health and education. Environmental monitoring conducted continuously.",
    },
  },
  {
    id: "narwapahar",
    name: "Narwapahar Uranium Mine",
    district: "East Singhbhum",
    state: "Jharkhand",
    typeLabel: "Underground",
    type: "Underground",
    minerals: ["Uranium"],
    operator: "UCIL",
    lat: 22.6,
    lng: 86.3,
    panels: {
      Historical:
        "Commissioned in 1995 as India's first fully mechanized underground uranium mine. Developed to strengthen domestic nuclear fuel production. Forms part of the Singhbhum Uranium Belt. Significant for India's nuclear energy program. Operated by UCIL.",
      Geological:
        "Uranium mineralization hosted within metamorphic rocks. Part of a major uranium-bearing geological province. Ore occurs in structurally controlled zones. Moderate-grade uranium deposit. Underground reserves support long-term mining operations.",
      Operational:
        "Trackless underground mining system employed. Uses drill jumbos, LHDs, underground trucks, and support vehicles. Long-hole drilling and controlled blasting practiced. Mechanized haulage system ensures efficient ore transport. Advanced ventilation system installed.",
      Production:
        "Produces uranium ore for processing into nuclear fuel. Ore transported to nearby processing facilities. Supports India's nuclear power generation requirements. Continuous underground production maintained. Strategic mineral operation.",
      Infrastructure:
        "Underground ramps, ventilation network, workshops, service facilities, and processing linkages available. Modern safety systems installed. Reliable power supply maintained. Mine connected to regional processing infrastructure.",
      Sustainability:
        "Strict radiation safety measures implemented. Environmental monitoring performed continuously. Water treatment facilities maintained. Community development initiatives support nearby populations. Rehabilitation and ecological management programs undertaken.",
    },
  },
  {
    id: "majhgawan",
    name: "Majhgawan Diamond Mine",
    district: "Panna",
    state: "Madhya Pradesh",
    typeLabel: "Opencast",
    type: "Open-cast",
    minerals: ["Diamond"],
    operator: "NMDC Ltd.",
    lat: 24.7,
    lng: 80.2,
    panels: {
      Historical:
        "India's only organized diamond-producing mine. Developed to exploit kimberlite-hosted diamond deposits. Operated by NMDC for commercial diamond production. Significant contributor to India's gemstone sector. Holds national strategic importance.",
      Geological:
        "Diamonds occur within kimberlite and lamproite formations. Ore body contains economically recoverable diamond concentrations. Geological setting unique within India. Mineralization occurs in volcanic pipe structures. Reserve estimates support continued mining.",
      Operational:
        "Conventional opencast mining method adopted. Uses excavators, drills, dumpers, crushers, and sorting facilities. Controlled blasting practiced where required. Ore transported to processing plant for recovery. Specialized diamond extraction processes employed.",
      Production:
        "Produces industrial and gem-quality diamonds. Ore processed through crushing, screening, and recovery circuits. Supplies diamonds to government auctions. Important domestic source of diamonds. Production varies with ore grade and recovery rates.",
      Infrastructure:
        "Includes processing plant, workshops, haul roads, storage facilities, and administrative buildings. Dedicated sorting and recovery facilities available. Reliable transportation links maintained. Support infrastructure developed around mine area.",
      Sustainability:
        "Mine reclamation and afforestation activities undertaken regularly. Water conservation measures implemented. Environmental impact monitored continuously. CSR programs support local communities. Focus on sustainable resource utilization and biodiversity conservation.",
    },
  },
];

export const getMine = (id: string): Mine | undefined => MINES.find((m) => m.id === id);

/** Splits a panel paragraph into its sentences for bullet display. */
export const sentencesOf = (text: string): string[] => text.split(/(?<=\.)\s+/).filter(Boolean);
