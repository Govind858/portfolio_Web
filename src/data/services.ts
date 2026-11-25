export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

export const services: ServiceItem[] = [
  {
    id: 'creative-engineering',
    number: '01',
    title: 'Creative Engineering',
    category: 'Spatial & WebGL',
    tagline: 'Bridging high-concept visual art with bleeding-edge web code.',
    description: 'Transforming static UI into living, breathing spatial experiences. Implementing buttery smooth physics, custom WebGL/Three.js shaders, and GPU-optimized micro-interactions that never stutter.',
    deliverables: [
      'Interactive 3D / WebGL Development',
      'Physics-based Animation (Lenis & Framer Motion)',
      'Custom Shader Programming (GLSL)',
      'Micro-interactions & Spatial Depth'
    ],
    techStack: ['Three.js', 'React Three Fiber', 'GLSL', 'Framer Motion', 'TypeScript'],
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'Modern UI/UX & Design Systems',
    category: 'Product Architecture',
    tagline: 'Clean, high-contrast, timeless digital luxury.',
    description: 'Architecting scalable design systems with tactile skeuomorphic glass, crisp editorial typography, and obsessive attention to spacing, hierarchy, and keyboard accessibility.',
    deliverables: [
      'Comprehensive Design Systems & Tokens',
      'High-Fidelity Wireframes & Prototypes',
      'Spatial UI / Bento-Grid Layouts',
      'Accessibility (WCAG AAA) & Dark Mode'
    ],
    techStack: ['Figma', 'Tailwind CSS', 'Design Tokens', 'Radix UI', 'CSS Architecture'],
  },
  {
    id: '3d-art-direction',
    number: '03',
    title: '3D Art & Spatial Renders',
    category: 'Visual & Kinetic',
    tagline: 'Ray-traced digital doubles, sculptures, and brand artifacts.',
    description: 'Creating hyper-stylized 3D character avatars, sculptural brand assets, and kinetic product models with studio-grade lighting that look stunning across all viewports.',
    deliverables: [
      'Stylized 3D Avatars & Bust Sculptures',
      'Realistic PBR Material Crafting',
      'Cinematic Studio Lighting Rigs',
      'Optimized Lightweight 2.5D Parallax Assets'
    ],
    techStack: ['Blender', 'Cinema 4D', 'Octane Render', 'Spline 3D', 'Substance Painter'],
  },
  {
    id: 'mobile-performance',
    number: '04',
    title: 'Zero-Compromise Mobile UX',
    category: 'Optimization & Speed',
    tagline: '120 FPS buttery transitions engineered for the thumb zone.',
    description: 'Ensuring your award-winning experience never drops a frame on smartphones. Incorporating native touch gestures, gyroscope device tilt, and dynamic viewport calculations.',
    deliverables: [
      'Mobile Gyroscope / Device Tilt Integration',
      'Native Touch Gestures & Snap Physics',
      'Lighthouse Performance 98+ Guarantee',
      'Dynamic Viewport (100dvh) Polish'
    ],
    techStack: ['DeviceOrientation API', 'Touch Events', 'Vite', 'Tree Shaking', 'Service Workers'],
  },
];
