/**
 * Site content as plain data. When the admin dashboard is added, these arrays are the
 * natural candidates to move into MongoDB collections (machines, products, capabilities).
 */

/** Fixed company identity. Contact details are editable in the admin; these are the defaults. */
export const company = {
  name: "Addagudi Exports Pvt. Ltd.",
  short: "AEPL",
  founded: 1997,
};

export type SiteSettings = { address: string; phone: string; mobile: string; email: string };

export const defaultSettings: SiteSettings = {
  address: "Plot #60/C, Phase-I, I.D.A. Jeedimetla, Shapur Nagar, Hyderabad – 500055, India",
  phone: "040-20004225",
  mobile: "09391028099",
  email: "arvind@addagudiengineering.com",
};

export const navItems = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "machinery", label: "Machinery", href: "/machinery" },
  { key: "quality", label: "Quality", href: "/quality" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

export const stripItems = [
  { icon: "i-component", label: "Custom engineered components" },
  { icon: "i-cnc", label: "CNC machining" },
  { icon: "i-assembly", label: "OEM / assembly support" },
  { icon: "i-inspect", label: "Quality inspection" },
];

export const capabilities = [
  {
    num: "01",
    title: "CNC Machining",
    text: "CNC turning and machining for custom components and complex geometries.",
    href: "/machinery",
    image: "/img/cap-cnc-machining.webp",
    tags: ["CNC turning", "Milling"],
    ariaLabel: "Explore CNC machining capability",
  },
  {
    num: "02",
    title: "Component Manufacturing",
    text: "Custom-made engineered components manufactured to customer drawings and specifications.",
    href: "/products",
    image: "/img/cap-component-manufacturing.webp",
    tags: ["Customer drawings", "Specifications"],
    ariaLabel: "Explore component manufacturing capability",
  },
  {
    num: "03",
    title: "Quality & Inspection",
    text: "Inspection and quality checks throughout production using appropriate calibrated equipment and documented procedures.",
    href: "/quality",
    image: "/img/cap-quality-inspection.webp",
    tags: ["First article", "Calibrated", "Third-party"],
    ariaLabel: "Explore quality and inspection capability",
  },
];

export const stats = [
  { value: "CNC", label: "Machining capability" },
  { value: "Quality", label: "Focused production" },
  { value: "Custom", label: "Engineered components" },
  { value: "OEM", label: "Manufacturing support" },
];

export const products = [
  { id: "pd-1", name: "Turned components", desc: "CNC-turned metallic components made to customer drawings." },
  { id: "pd-2", name: "Machined parts", desc: "Milled, drilled and machined parts produced to specification." },
  { id: "pd-3", name: "Assemblies", desc: "Finished assemblies where the customer requirement calls for them." },
  { id: "pd-4", name: "Custom components", desc: "Custom-made engineered components, from single parts upward." },
  { id: "pd-5", name: "OEM supply", desc: "Manufacturing against OEM requirements. Share your drawing with us." },
];

export type MachineItem = {
  id: string;
  name: string;
  model: string;
  /** "/api/media/<id>" (uploaded) or "/img/..." (bundled); empty when there is no photo */
  image: string;
  alt: string;
  pos?: string;
};

/**
 * Built-in machinery, from AEPL's earlier equipment list (spellings preserved pending confirmation).
 * The first five have representative stock photos. The admin dashboard can import these into the
 * database and from then on edit, add, reorder or remove machines.
 */
export const defaultMachines: MachineItem[] = [
  { id: "default-1", name: "CNC Lathe Machine", model: "YCM TC-15", image: "/img/machine-cnc-lathe-a.webp", alt: "A CNC turning center with a front-loading enclosure. Representative image of a CNC lathe." },
  { id: "default-2", name: "CNC Lathe Machine", model: "YCM GT 200 A", image: "/img/machine-cnc-lathe-b.webp", alt: "A CNC lathe with a control panel and sliding guard door. Representative image of a CNC lathe." },
  { id: "default-3", name: "Milling Machine", model: "CINCINATTI", image: "/img/machine-milling-a.webp", pos: "50% 38%", alt: "A vertical knee-type milling machine on a workshop floor. Representative image of a milling machine." },
  { id: "default-4", name: "Drilling Machine", model: "MEW 25/250", image: "/img/machine-drilling.webp", alt: "A radial arm drilling machine in a machine shop. Representative image of a drilling machine." },
  { id: "default-5", name: "Milling Machine", model: "MANFORD", image: "/img/machine-milling-b.webp", pos: "50% 35%", alt: "A vertical milling machine with digital readout. Representative image of a milling machine." },
  { id: "default-6", name: "CNC Lathe Machine", model: "Milltronics", image: "", alt: "" },
  { id: "default-7", name: "CNC Milling Machine", model: "Milltronics", image: "", alt: "" },
  { id: "default-8", name: "Drilling Machine", model: "HMP", image: "", alt: "" },
  { id: "default-9", name: "Band Saw Cutting Machine", model: "DMSons", image: "", alt: "" },
  { id: "default-10", name: "Surface Grinding Machine", model: "HMT", image: "", alt: "" },
  { id: "default-12", name: "Tapping Machine", model: "Tapax", image: "", alt: "" },
  { id: "default-13", name: "Centrifugal Finishing Machine", model: "Gala Precision", image: "", alt: "" },
  { id: "default-14", name: "Lathe Machine", model: "SAMRAT", image: "", alt: "" },
];

export const steps = [
  { num: "01", title: "Raw material", desc: "Incoming check" },
  { num: "02", title: "Machining", desc: "CNC turning / milling" },
  { num: "03", title: "Quality inspection", desc: "In-process checks" },
  { num: "04", title: "Finishing", desc: "As per requirement" },
  { num: "05", title: "Final inspection", desc: "Review and dispatch" },
];

export const qualityChecks = [
  "Checks at the manufacturing stages",
  "First-article reports",
  "Calibrated inspection equipment",
  "Documented procedures",
  "Third-party inspection when required",
];

export const heroCallouts = [
  { dir: "left", x: "36%", y: "70%", len: "70px", label: "CNC precision machining" },
  { dir: "right", x: "42%", y: "30%", len: "90px", label: "Custom components" },
  { dir: "up", x: "70%", y: "56%", len: "56px", label: "High quality finish" },
] as const;
