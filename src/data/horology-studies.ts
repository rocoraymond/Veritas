export interface HorologyStudy {
  id: string;
  category: 'chronograph' | 'complication' | 'architectural' | 'instrument' | 'material';
  title: string;
  subtitle: string;
  dialDescription: string;
  caseProfile: string;
  image: string;
  tag: string;
  narrative: string;
}

export interface MacroCraftDetail {
  id: string;
  title: string;
  focusArea: string;
  description: string;
  image: string;
}

export interface MaterialStudy {
  id: string;
  materialName: string;
  surfaceFinish: string;
  description: string;
  image: string;
}

export type GalleryCategoryId = 'all' | 'chronograph' | 'architectural' | 'complication' | 'instrument' | 'material';

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  count: number;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'all', label: 'All References', count: 8 },
  { id: 'chronograph', label: 'Chronograph Precision', count: 1 },
  { id: 'architectural', label: 'Architectural Form', count: 2 },
  { id: 'complication', label: 'High Complications', count: 1 },
  { id: 'instrument', label: 'Aviation & Marine', count: 2 },
  { id: 'material', label: 'Materiality & Proportions', count: 2 },
];

export function filterStudiesByCategory(categoryId: GalleryCategoryId): HorologyStudy[] {
  if (categoryId === 'all') {
    return CURATED_HOROLOGY_STUDIES;
  }
  return CURATED_HOROLOGY_STUDIES.filter((study) => study.category === categoryId);
}

/**
 * Curated Reference Studies for the Editorial Collection Index
 * Note: These reference studies explore classic horological architectures and proportions.
 * No third-party brand names or invented proprietary calibres are claimed.
 */
export const CURATED_HOROLOGY_STUDIES: HorologyStudy[] = [
  {
    id: 'chronograph-study',
    category: 'chronograph',
    title: 'Chronograph Architecture Study',
    subtitle: 'High-Contrast Dial Geometry',
    dialDescription: 'Obsidian black gloss with tri-compax gold snailed sub-registers',
    caseProfile: '40mm sculpted case with engraved tachymetric bezel',
    image: '/watches/Daytona_Black.webp',
    tag: 'Reference I',
    narrative: 'An investigation of chronometric readability, balanced counterweights, and tripartite register layout.',
  },
  {
    id: 'geometric-study',
    category: 'architectural',
    title: 'Geometric Case & Dial Study',
    subtitle: 'Integrated Steel & Relief Texture',
    dialDescription: 'Anthracite guilloché grid pattern with luminescent indices',
    caseProfile: '41mm geometric case with satin-brushed chamfers and visible fasteners',
    image: '/watches/Royal_Oak_Selfwinding_Royal_Oak_15510.webp',
    tag: 'Reference II',
    narrative: 'Exploration of monolithic case integration where structural geometry and hand-finished bevels replace superficial ornament.',
  },
  {
    id: 'complication-study',
    category: 'complication',
    title: 'Dual-Time Complication Study',
    subtitle: 'Off-Center Register Architecture',
    dialDescription: 'Mint green sunray finish with 24-hour inverted disc indicator',
    caseProfile: '42mm architectural case with fluted bezel mechanics',
    image: '/watches/Sky-Dweller_Mint_Green.webp',
    tag: 'Reference III',
    narrative: 'A study in complex dial hierarchy, balancing primary local indices against an eccentric reference disc.',
  },
  {
    id: 'instrument-study',
    category: 'instrument',
    title: 'Aviation Instrument Dial Study',
    subtitle: 'Typographic Contrast & Scale',
    dialDescription: 'Matte black instrument dial with distinctive minute-numeral hierarchy',
    caseProfile: '40mm smooth bezel case with anti-reflective sapphire optics',
    image: '/watches/Air-King_Black.webp',
    tag: 'Reference IV',
    narrative: 'Instrument ergonomics prioritizing immediate visual acquisition under low-light operating conditions.',
  },
  {
    id: 'contemporary-study',
    category: 'architectural',
    title: 'Contemporary Embossed Dial Study',
    subtitle: 'Radial Geometry & Composite Integration',
    dialDescription: 'Gradated sunburst embossed with soft rounded-square relief',
    caseProfile: '42mm satin-brushed bezel with polished flank bevels',
    image: '/watches/Aquanaut_5168G.webp',
    tag: 'Reference V',
    narrative: 'A modern sport-luxury case study balancing tactile composite textures with refined metallic curvature.',
  },
  {
    id: 'marine-study',
    category: 'instrument',
    title: 'Ceramic Marine Bezel Study',
    subtitle: 'Unidirectional Calibration',
    dialDescription: 'High-contrast black dial with oversized luminous geometric plots',
    caseProfile: '41mm professional case with green ceramic elapsed-time ring',
    image: '/watches/Submariner_Date_Starbucks.webp',
    tag: 'Reference VI',
    narrative: 'A functional examination of tactile bezel knurling, ratcheted tolerances, and luminescent plot legibility.',
  },
  {
    id: 'roman-study',
    category: 'material',
    title: 'Roman Index Proportions Study',
    subtitle: 'Dual-Tone Architectural Dial',
    dialDescription: 'Slate sunray dial with forest green edged Roman numeral appliques',
    caseProfile: '41mm fluted bezel case with integrated multi-link bracelet',
    image: '/watches/Datejust_41_Wimbledon.webp',
    tag: 'Reference VII',
    narrative: 'Investigating asymmetrical index accents, pairing a single high-legibility baton at 9 with classical Roman figures.',
  },
  {
    id: 'sector-study',
    category: 'material',
    title: 'Classic Sector Dial Study',
    subtitle: 'Mid-Century Architectural Linearity',
    dialDescription: 'Monochromatic silver sector dial with segmented chapter rings',
    caseProfile: '40mm classic lugs with stepped polished bezel',
    image: '/watches/Fiftysix_Selfwinding_Silver.webp',
    tag: 'Reference VIII',
    narrative: 'Mid-century graphic discipline where concentric sector lines delineate hours, minutes, and seconds into harmonious zones.',
  },
];

/**
 * Macro craftsmanship studies highlighting physical finishing, tolerances, and ceramics
 */
export const MACRO_CRAFTSMANSHIP_STUDIES: MacroCraftDetail[] = [
  {
    id: 'macro-bezel-brushing',
    title: 'Satin-Brushing & Bezel Chamfering',
    focusArea: 'Surface Finishing Geometry',
    description: 'Precision vertical satin-brushing across the flat bezel face, directly juxtaposed against razor-sharp mirror-polished edge bevels to create optical tension.',
    image: '/watches/Patek-philippe-aquanaut-5167r-brown-40mm_image_5.webp',
  },
  {
    id: 'macro-ceramic-metallurgy',
    title: 'Bi-Color Ceramic & Inlaid Graduations',
    focusArea: 'High-Density Ceramic Sintering',
    description: 'Sintered zirconium oxide ceramic formed into a split-color 24-hour ring with recessed graduations coated in microscopic physical vapor deposition.',
    image: '/watches/Rolex_gmt-master-ii-rootbeer-black-40mm_image_5.webp',
  },
  {
    id: 'macro-case-tolerances',
    title: 'Extreme-Pressure Case Architecture',
    focusArea: 'Structural Metallurgy & Crystal Sealing',
    description: 'Heavy-gauge case walls with engineered crystal seating tolerances designed to distribute atmospheric loads uniformly across the perimeter.',
    image: '/watches/Rolex_sea_dweller_black_43mm_image_4.webp',
  },
];

/**
 * Materiality and dial texture studies
 */
export const MATERIALITY_STUDIES: MaterialStudy[] = [
  {
    id: 'honeycomb-guilloche',
    materialName: 'Architectural Honeycomb Guilloché',
    surfaceFinish: 'Engine-turned geometric relief',
    description: 'Three-dimensional micro-faceting that manipulates incident light across crystalline angles, eliminating dial glare while creating depth.',
    image: '/watches/Land-Dweller_40_White_Honeycomb.webp',
  },
  {
    id: 'black-mother-of-pearl',
    materialName: 'Natural Black Mother-of-Pearl',
    surfaceFinish: 'Organic crystalline iridescence',
    description: 'Harvested nacre disc selected for deep midnight violet and emerald chromatic refractions, paired with minimalist index plots.',
    image: '/watches/Datejust_36_Black_MOP.webp',
  },
  {
    id: 'monochrome-platinum-synergy',
    materialName: 'Rhodium Dial & Precious Metal Bezel',
    surfaceFinish: 'Dual-texture sandblasted & polished relief',
    description: 'Sunray slate rhodium dial anchored by a sandblasted platinum bezel with raised mirror-polished numerals, highlighted by a stark cyan second hand.',
    image: '/watches/Yacht-Master_40_Slate.webp',
  },
];

/**
 * Philosophy & Editorial Imagery Studies
 */
export const PHILOSOPHY_STUDY = {
  title: 'Guilloché Basketweave & World-Time Ring Study',
  subtitle: 'The Geometry of Measured Continuity',
  image: '/watches/Patek-philippe-world-time-salmon-41mm_image_4.webp',
  description: 'Concentric disc choreography translating global meridians into a synchronized, mechanical dial plane without electronic intervention.',
};

export const CHRONICLE_STUDY = {
  title: 'Dual-Time Complication in Warm Alloy',
  image: '/watches/Patek-philippe-aquanaut-5164r_brown-40mm_image_1.webp',
  caption: 'Architectural balance: skeletonized dual-time indicators engineered directly into the gear train for instantaneous local time adjustment.',
};
