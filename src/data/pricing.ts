export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  timeline: string;
  features: string[];
}

export interface PricingAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'single-asset',
    name: '3D Asset & Landing Capsule',
    tagline: 'Ideal for launching a high-impact hero section or product showcase.',
    price: 2400,
    timeline: '1-2 Weeks',
    features: [
      'Custom Stylized 3D Avatar or Centerpiece Sculpture',
      'Mouse Parallax & Mobile Gyroscope Integration',
      'High-contrast B&W Kinetic Typography',
      'Lenis Inertia Smooth Scrolling',
      '100% Mobile Responsive Optimization',
    ],
  },
  {
    id: 'brand-portfolio',
    name: 'Award-Winning Flagship Portfolio',
    tagline: 'The complete creative package designed for Awwwards / SOTD submission.',
    price: 5800,
    popular: true,
    timeline: '3-4 Weeks',
    features: [
      'Everything in Capsule +',
      'Interactive 3D Avatar with 3 Lighting Modes',
      'Bento Grid with Live Spotify & Status Radars',
      'High-Contrast Inverted Services Section',
      'Interactive Case Study Modal & Filter System',
      'Interactive Scope / Pricing Calculator for Clients',
      'Command Palette (Cmd+K) Navigation',
      'Full SEO & Performance Audit (98+ Lighthouse)',
    ],
  },
  {
    id: 'immersive-world',
    name: 'Custom WebGL Spatial Ecosystem',
    tagline: 'Bespoke, multi-page spatial web experience with custom shaders.',
    price: 11200,
    timeline: '5-8 Weeks',
    features: [
      'Everything in Flagship Portfolio +',
      'Custom Three.js / React Three Fiber Shaders',
      'Audio-Reactive Spectrum & SFX Audio Design',
      'Full Headless CMS / MDX Case Studies Pipeline',
      'Custom Interactive 3D Product Configurator',
      'Priority Awwwards / FWA / Webby Submission Package',
      '60-Day Post-Launch Maintenance & Performance Tuning',
    ],
  },
];

export const pricingAddons: PricingAddon[] = [
  {
    id: 'audio-sfx',
    name: 'Subtle Audio UI & Haptic SFX Rig',
    price: 650,
    description: 'Custom synthesised click and whoosh audio feedback with mute toggle.',
  },
  {
    id: 'cms-integration',
    name: 'Headless CMS (Sanity / Strapi / Notion)',
    price: 1200,
    description: 'Effortless client dashboard to update case studies and stats on the fly.',
  },
  {
    id: 'awwwards-submission',
    name: 'Awwwards / FWA Submission Prep',
    price: 800,
    description: 'Video reels, case study write-up, and jury asset optimization.',
  },
];
