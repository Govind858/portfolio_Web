export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export const experiences: WorkExperience[] = [
  {
    id: 'byteboot',
    role: 'Software Engineer',
    company: 'ByteBoot Techno Solutions',
    location: 'Kerala, India',
    period: 'September 2025 – June 2026',
    type: 'Full-Time (Node.js & Systems)',
    summary: 'Owned end-to-end backend architectures, distributed systems, and cross-platform mobile applications, bridging Kubernetes DevOps with hardware-level IoT/Bluetooth integrations.',
    highlights: [
      'Architected and deployed full-stack Node.js and TypeScript microservices with Kubernetes autoscaling (2-10 replicas at 75% CPU) and Nginx reverse proxy load balancing handling 1,024 concurrent worker connections.',
      'Implemented distributed locking using Redis as a high-speed transient data layer to prevent double-booking of overlapping time slots during concurrent user requests.',
      'Engineered direct Bluetooth Low Energy (BLE) integration in React Native (Expo SDK 54) to drive ESC/POS thermal printers by transmitting raw hexadecimal arrays, paginating outbound data into 20-byte payloads with a 50ms delay to eliminate hardware buffer overflows.',
      'Implemented a stabilized Bluetooth polling mechanism with exponential backoff (5 retries, 200ms interval), ensuring resilient printer connections in high-interference environments.',
      'Engineered custom Axios interceptors with a failed request queue and execution locks for silent JWT token refreshes, seamlessly replaying pending network requests to eliminate timeout errors across 50+ domain services.',
      'Optimized bulk CSV/Excel data uploads using client-side parsing (PapaParse/XLSX), catching malformed inventory data in the browser to significantly reduce server-side validation overhead.',
      'Stabilized client-side PDF generation (jsPDF/html2canvas) and e-signature canvas scaling, ensuring accurate alignment of financial statements across diverse viewport sizes.'
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Express.js',
      'Next.js',
      'React Native (Expo)',
      'React 19',
      'Redux Toolkit',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'Distributed Systems',
      'Backend Architecture',
      'Docker',
      'Kubernetes (K8s)',
      'Nginx',
      'AWS S3',
      'BullMQ',
      'Postman',
      'Swagger (OpenAPI)'
    ],
  },
];

export const education: Education[] = [
  {
    id: 'polytechnic',
    degree: 'Diploma in Computer Engineering',
    institution: 'Govt Polytechnic College Kaduthuruthy',
    location: 'Kerala, India',
    year: '2024',
  },
];
