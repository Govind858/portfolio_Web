export interface ProjectMetric {
  label: string;
  value: string;
}

export interface BusinessLogicData {
  headline: string;
  problem: string;
  solution: string;
  userFlow: { step: string; title: string; desc: string }[];
  partnerFlow: { step: string; title: string; desc: string }[];
  financialModel: string;
}

export interface ArchitectureComponent {
  title: string;
  subtitle: string;
  details: string;
  spec: string;
  codeSnippet?: string;
}

export interface TechStackItem {
  category: string;
  name: string;
  spec: string;
  rationale: string;
}

export interface ProductionChallenge {
  issue: string;
  rootCause: string;
  engineeringSolution: string;
  outcome: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: 'Backend & K8s' | 'Mobile & BLE' | 'Enterprise Web';
  year: string;
  description: string;
  longDescription: string;
  role: string;
  techStack: string[];
  deliverables: string[];
  metrics: ProjectMetric[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  playstoreUrl?: string;
  
  // Exhaustive Case Study Documentation
  businessLogic: BusinessLogicData;
  technicalDeepDive: {
    overview: string;
    components: ArchitectureComponent[];
  };
  techStackDetailed: TechStackItem[];
  productionChallenges: ProductionChallenge[];
}

export const projects: Project[] = [
  {
    id: 'bookmycuts',
    number: '01',
    title: 'BookMyCuts Platform',
    client: 'Full-Stack Salon Platform | Play Store',
    category: 'Backend & K8s',
    year: '2025–2026',
    description: 'High-concurrency salon appointment booking platform with Kubernetes autoscaling, Redis distributed locking, and decoupled payout workers.',
    longDescription: 'Architected and built a high-concurrency marketplace connecting users to nearby salons for zero-queue booking while automating shop owner operations. Engineered the RESTful Node.js and TypeScript backend and React Native mobile application from scratch. Scaled backend infrastructure using Kubernetes deployments (HPA 2-10 replicas at 75% CPU) with Nginx load balancing handling 1,024 worker connections. Implemented distributed locking using Redis as a high-speed transient data layer to prevent double-booking of overlapping time slots during concurrent user requests, and engineered custom Axios interceptors with a failed request queue for silent JWT token refreshes.',
    role: 'Full-Stack & Backend Engineer',
    techStack: ['TypeScript', 'Node.js', 'Express.js', 'React Native (Expo)', 'MongoDB', 'Redis Distributed Locks', 'Kubernetes (K8s)', 'Nginx', 'Docker', 'BullMQ', 'RazorpayX'],
    deliverables: [
      'RESTful Node.js/TypeScript Backend & React Native App from Scratch',
      'Kubernetes Deployment with HPA (2-10 Replicas on 75% CPU)',
      'Nginx Reverse Proxy & 1024 Worker Connections Load Balancer',
      'Redis Distributed Locking to Prevent Overlapping Double-Bookings',
      'Custom Axios Interceptors with Failed Request Queue for Silent JWT Refreshes',
      'Decoupled BullMQ Payout Worker for RazorpayX NEFT Transfers'
    ],
    metrics: [
      { label: 'K8s Pod Scaling', value: '2–10 Pods' },
      { label: 'Nginx Workers', value: '1,024 Conns' },
      { label: 'Double-Booking', value: '0.00% Conflicts' },
      { label: 'Request Success', value: '100% Retried' },
    ],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com/Govind858',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.anazk.bookmycuts&hl=en_IN',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.anazk.bookmycuts&hl=en_IN',

    businessLogic: {
      headline: 'Eliminating Salon Queues and Automating Partner Payouts',
      problem: 'Traditional barbershop and salon visits in urban clusters suffer from erratic customer waiting times, chaotic walk-in scheduling, and high customer bounce rates. Meanwhile, salon owners lose recurring revenue due to lack of chair visibility, stylist idle time, and cumbersome manual daily payout calculations.',
      solution: 'BookMyCuts operates as a synchronized two-sided marketplace. Customers browse nearby verified salons, view dynamic service menus, check real-time stylist chair schedules, and reserve guaranteed time slots. Salon managers receive automated schedule optimization, customer check-ins, automated daily earnings aggregation, and direct bank transfers.',
      userFlow: [
        { step: '01', title: 'Location & Discovery', desc: 'Geolocated salon listing filtered by rating, distance, price range, and service category.' },
        { step: '02', title: 'Stylist & Slot Selection', desc: 'Real-time calendar displaying dynamic available time windows mapped to individual stylists.' },
        { step: '03', title: 'Transient Slot Reservation', desc: 'App acquires a 5-minute atomic lock on the desired slot to prevent concurrent double-booking during checkout.' },
        { step: '04', title: 'Zero-Queue Check-In', desc: 'Customer arrives at the salon at the scheduled time; stylist confirms check-in via PIN/QR verification.' },
      ],
      partnerFlow: [
        { step: '01', title: 'Shop & Chair Setup', desc: 'Define active operating hours, stylist profiles, individual chair capacity, and custom service pricing.' },
        { step: '02', title: 'Real-Time Booking Board', desc: 'Live Kanban/Timeline board displaying booked, in-service, and completed appointments.' },
        { step: '03', title: 'Automated Revenue Calculation', desc: 'Platform automatically calculates gross revenue, deducts platform fee, and prepares payout ledger.' },
        { step: '04', title: 'Direct NEFT Payout', desc: 'Automated settlement engine dispatches earnings directly to salon bank accounts via RazorpayX.' },
      ],
      financialModel: 'Dynamic commission split model: 85-90% disbursed to merchant partners on a verified 24-hour settlement schedule, with 10-15% retained as platform transaction fees. All transactions are cryptographically logged with signature verification.',
    },

    technicalDeepDive: {
      overview: 'Engineered as an enterprise-grade microservice architecture composed of a high-throughput Node.js/TypeScript REST API gateway, containerized with multi-stage Docker builds, orchestrated across an autoscaling Kubernetes cluster, and fronted by an Nginx reverse proxy load balancer.',
      components: [
        {
          title: 'Kubernetes (K8s) Horizontal Pod Autoscaler (HPA)',
          subtitle: 'Zero Dropped Packets During Peak Rush Hours',
          details: 'Configured Kubernetes deployments scaling dynamically from 2 baseline pods up to 10 pods when CPU utilization exceeds 75%. Enforced strict resource requests (cpu: 250m, memory: 512Mi) and limits (cpu: 1000m, memory: 1Gi) with readiness and liveness health probe checks bound to port 5000.',
          spec: 'HPA Min: 2, Max: 10, Target: 75% CPU | Port: 5000',
          codeSnippet: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: bookmycuts-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: bookmycuts-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75`,
        },
        {
          title: 'Redis Distributed Mutex Locking',
          subtitle: 'Preventing Overlapping Slot Collisions Under High Concurrency',
          details: 'Implemented atomic distributed locking using Redis (`SET slot:{salonId}:{stylistId}:{time} {userId} NX PX 300000`). If another concurrent user attempts to book the identical slot, the atomic check fails immediately with 409 Conflict. Once payment succeeds, the slot is committed to MongoDB; if abandoned, an automated 5-minute cleanup releases the lock.',
          spec: 'Atomic SETNX with TTL: 300,000ms | 0.00% Double-Booking',
          codeSnippet: `// Distributed lock acquisition on salon chair
const lockKey = \`lock:slot:\${salonId}:\${stylistId}:\${timestamp}\`;
const acquired = await redis.set(lockKey, userId, 'NX', 'PX', 300000); // 5 min TTL
if (!acquired) {
  throw new AppError('Time slot is currently reserved by another customer.', 409);
}`,
        },
        {
          title: 'Nginx Reverse Proxy & 1,024 Worker Load Balancing',
          subtitle: 'Upstream Traffic Distribution & TLS Termination',
          details: 'Configured Nginx with an upstream pool routing client requests across active container instances. Optimized with worker_connections 1024, keepalive connections, proxy buffering, gzip compression, and rate limiting against brute-force endpoint attacks.',
          spec: 'worker_connections: 1024 | Upstream Pool Load Balancing',
          codeSnippet: `upstream backend_nodes {
  least_conn;
  server app-pod-1:5000 max_fails=3 fail_timeout=10s;
  server app-pod-2:5000 max_fails=3 fail_timeout=10s;
  keepalive 32;
}`,
        },
        {
          title: 'Decoupled BullMQ Background Payout Workers',
          subtitle: 'Asynchronous NEFT Transfers & Webhook Verification',
          details: 'Financial payouts are separated from HTTP request lifecycles. When a settlement batch is triggered, BullMQ workers aggregate earnings, calculate deductions, and execute automated NEFT transfers through RazorpayX APIs. Webhooks verify cryptographic SHA256 HMAC signatures before settling payout states.',
          spec: 'BullMQ + Redis Store | 1,420+ Settled Payouts',
        },
        {
          title: 'Silent Axios JWT Refresh Queue (Client Architecture)',
          subtitle: '100% Request Success Rate Under Weak Network Conditions',
          details: 'Custom Axios interceptors with a failedQueue execution lock. When access tokens expire mid-booking, 401 errors are intercepted, subsequent requests are placed into a pending memory queue, the token is refreshed silently using HttpOnly refresh tokens, and all queued requests replay automatically without interrupting the customer.',
          spec: 'FailedQueue Interceptor | Zero Session Timeout Interruptions',
        },
      ],
    },

    techStackDetailed: [
      { category: 'Backend Runtime', name: 'Node.js (v20-slim)', spec: 'Cluster Mode / ES Modules', rationale: 'Non-blocking I/O ideal for high-concurrency reservation systems and real-time socket connections.' },
      { category: 'Web Framework', name: 'Express.js & TypeScript', spec: 'Strict Type Safety / DTOs', rationale: 'Strict interface contracts prevent schema mismatch across mobile client and database layers.' },
      { category: 'Containerization', name: 'Docker', spec: 'Multi-Stage Layer Caching', rationale: 'Minimized container image footprint and guaranteed reproducible deployment across staging & production.' },
      { category: 'Orchestration', name: 'Kubernetes (K8s)', spec: 'Deployments, Services & HPA', rationale: 'Automated self-healing, rolling updates, and dynamic horizontal autoscaling during peak demand.' },
      { category: 'Reverse Proxy', name: 'Nginx (v1.24)', spec: '1024 Worker Connections', rationale: 'High-speed SSL termination, static asset delivery, and upstream least-connection load balancing.' },
      { category: 'Transient Caching', name: 'Redis', spec: 'Atomic SETNX / Distributed Locks', rationale: 'Sub-millisecond latency for slot reservations, session states, and BullMQ worker queues.' },
      { category: 'Database', name: 'MongoDB Atlas', spec: 'Mongoose Schemas & Indexes', rationale: 'Document model naturally accommodates flexible salon catalog hierarchies, geo-spatial coordinates, and user reviews.' },
      { category: 'Job Queues', name: 'BullMQ', spec: 'Redis Backing Store', rationale: 'Reliable asynchronous processing for heavy financial calculations, notifications, and scheduled payouts.' },
      { category: 'Mobile Client', name: 'React Native & Expo', spec: 'Expo SDK 54 / Android & iOS', rationale: 'Cross-platform native performance with single codebase deployed directly to Google Play Store.' },
      { category: 'Banking Gateway', name: 'RazorpayX', spec: 'Automated NEFT Transfers', rationale: 'Direct merchant payout automation with verified cryptographic webhook signatures.' },
    ],

    productionChallenges: [
      {
        issue: 'Saturday Peak Hour Booking Collisions',
        rootCause: 'Multiple users selecting the identical 11:00 AM haircut slot simultaneously caused database race conditions and overlapping bookings.',
        engineeringSolution: 'Introduced Redis distributed mutex locks with atomic SETNX and a 5-minute TTL. The first requester receives the reservation lock, while concurrent requests receive instant 409 status with suggested alternative time slots.',
        outcome: 'Achieved 0.00% double-booking conflicts and 100% reservation accuracy across thousands of active bookings.',
      },
      {
        issue: 'Payment Gateway Webhook Dropped Receipts',
        rootCause: 'Synchronous payment processing during high-volume periods caused client timeout errors when bank networks experienced latency.',
        engineeringSolution: 'Decoupled payment acknowledgment from payout settlement using BullMQ. Webhooks respond with 200 OK immediately and push payment verification payloads into background worker queues for asynchronous processing.',
        outcome: 'Eliminated HTTP request timeouts and successfully settled over 1,420+ automated shop payouts with zero dropped transactions.',
      },
      {
        issue: 'Client JWT Expiration During Multi-Step Booking',
        rootCause: 'Short-lived access tokens expired while users were choosing salon add-ons, causing subsequent booking requests to fail abruptly.',
        engineeringSolution: 'Engineered custom Axios response interceptors that maintain an in-memory execution lock (isRefreshing) and failedQueue. Intercepts 401 responses, silently refreshes the JWT, and replays all pending network calls without user friction.',
        outcome: 'Reduced client checkout abandonment to zero and achieved 100% seamless token auto-replay under poor mobile network conditions.',
      },
    ],
  },
  {
    id: 'coffy-byte',
    number: '02',
    title: 'Coffy Byte POS',
    client: 'Point-of-Sale Mobile Application',
    category: 'Mobile & BLE',
    year: '2025–2026',
    description: 'React Native point-of-sale mobile app driving local Bluetooth ESC/POS thermal receipt printers via raw hexadecimal arrays.',
    longDescription: 'Engineered a high-speed cross-platform mobile Point-of-Sale (POS) application in React Native for fast-paced restaurant environments to instantly process orders and manage local inventory caching. Engineered direct Bluetooth Low Energy (BLE) integration to drive ESC/POS thermal printers by transmitting raw hexadecimal arrays, bypassing bulky high-level print libraries. Prevented hardware buffer overflows by paginating outbound Bluetooth data into 20-byte payloads with a 50ms delay, and implemented a stabilized Bluetooth polling mechanism with exponential backoff (5 retries, 200ms interval) to achieve zero dropped receipts during peak cafe hours.',
    role: 'Mobile & Hardware Systems Developer',
    techStack: ['React Native (Expo SDK 54)', 'React 19', 'TypeScript', 'BLE Direct Hex Control', 'ESC/POS Hex Arrays', 'Redux Toolkit', 'Axios'],
    deliverables: [
      'Cross-Platform React Native POS System with Local Inventory Caching',
      'Direct Bluetooth Low Energy (BLE) Integration Transmitting Raw Hex Arrays',
      '20-Byte Outbound Data Packet Pagination Protocol with 50ms Delay',
      'Stabilized Bluetooth Polling with Exponential Backoff (5 Retries, 200ms Interval)',
      'Zero Dropped Thermal Print Receipts Under Peak Restaurant Rush',
      'Global 10s Axios Network Timeout Protection for Restaurant WiFi'
    ],
    metrics: [
      { label: 'Bluetooth Chunking', value: '20-Byte / 50ms' },
      { label: 'Receipt Drop Rate', value: '0.00%' },
      { label: 'Polling Mechanism', value: '5-Step Backoff' },
      { label: 'Hardware Driver', value: 'Direct Hex' },
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com/Govind858',

    businessLogic: {
      headline: 'Sub-Second Order Taking and Fail-Safe Kitchen Thermal Printing',
      problem: 'High-volume coffee shops, cafes, and quick-service diners experience intense ordering rushes where every second matters. Traditional cloud-dependent tablet POS systems freeze when kitchen Wi-Fi stutters, and off-the-shelf printing plugins frequently drop customer bills and kitchen tickets due to hardware buffer overloads.',
      solution: 'Coffy Byte is a streamlined, resilient point-of-sale tablet/mobile solution built with React Native. It enables waitstaff to compile complex nested orders (sizes, milk substitutes, syrups, dine-in vs. takeaway) in under three taps, caches orders locally, and transmits raw ESC/POS commands directly to physical thermal printers over Bluetooth Low Energy.',
      userFlow: [
        { step: '01', title: 'Speed Order Grid', desc: 'Category-indexed visual grid allowing cashiers to select items and nested modifiers in sub-second speeds.' },
        { step: '02', title: 'Dynamic Tax & Bill Compilation', desc: 'Instant local calculation of multi-tier sales tax, service charges, discounts, and split billing in Redux state.' },
        { step: '03', title: 'Dual Dispatch Execution', desc: 'Order ticket simultaneously dispatches to kitchen receipt printer and cash register drawer.' },
        { step: '04', title: 'Offline-First Local Sync', desc: 'Transactions are committed to local AsyncStorage immediately and synced to the cloud when internet is detected.' },
      ],
      partnerFlow: [
        { step: '01', title: 'Menu Hierarchy Management', desc: 'Define nested modifier trees (e.g. Latte -> Oat Milk -> Extra Hot -> Vanilla Syrup).' },
        { step: '02', title: 'Printer Hardware Pairing', desc: 'Scan and bind kitchen and billing Bluetooth printers with custom baud rates and paper widths (58mm/80mm).' },
        { step: '03', title: 'Live Inventory Depletion', desc: 'Real-time deduction of raw ingredients and stock alerts when milk or espresso bean thresholds are reached.' },
        { step: '04', title: 'Shift End Reconciliation', desc: 'One-click generation of X and Z shift reports summarizing cash, card, and digital payment totals.' },
      ],
      financialModel: 'Commercial subscription SaaS for hospitality venues, charging zero per-transaction commissions to protect cafe profit margins.',
    },

    technicalDeepDive: {
      overview: 'Built using React Native on Expo SDK 54 with Redux Toolkit for sub-millisecond client state mutations, paired with a custom low-level Bluetooth Low Energy (BLE) byte stream driver authoring direct ESC/POS hexadecimal arrays.',
      components: [
        {
          title: 'Direct BLE Low-Level Hexadecimal Driver',
          subtitle: 'Bypassing High-Level Printer Libraries for Deterministic Control',
          details: 'Generic open-source printing libraries introduce heavy overhead, unpredictable character encoding, and unhandled disconnection states. Coffy Byte constructs raw binary buffer arrays conforming to the Epson ESC/POS specification, ensuring complete control over hardware initialization, text magnification, line spacing, barcode rendering, and partial cut execution.',
          spec: 'Raw Hex Arrays ([0x1b, 0x40], [0x1d, 0x56]) | Zero Dependency Overhead',
          codeSnippet: `// Low-level ESC/POS initialization & formatting commands
const INIT_PRINTER = [0x1b, 0x40];
const ALIGN_CENTER = [0x1b, 0x61, 0x01];
const BOLD_ON = [0x1b, 0x45, 0x01];
const PAPER_CUT = [0x1d, 0x56, 0x41, 0x00];

const payload = [...INIT_PRINTER, ...ALIGN_CENTER, ...BOLD_ON, ...encodeText('COFFY BYTE POS\\n'), ...PAPER_CUT];`,
        },
        {
          title: '20-Byte Outbound Data Packet Pagination Protocol',
          subtitle: 'Eliminating Hardware Microcontroller Buffer Overruns',
          details: 'Thermal printer Bluetooth controllers have a hardware buffer constraint (MTU 20 bytes). Attempting to send a complete 2KB receipt in a single write causes microcontrollers to overflow, producing truncated receipts and missing tickets. Designed an asynchronous chunker that slices long byte buffers into discrete 20-byte chunks throttled with a 50ms interval delay.',
          spec: 'Packet Size: Exactly 20 Bytes | Inter-packet Delay: 50ms',
          codeSnippet: `async function streamToPrinter(characteristic, dataBuffer) {
  const CHUNK_SIZE = 20;
  for (let i = 0; i < dataBuffer.length; i += CHUNK_SIZE) {
    const chunk = dataBuffer.slice(i, i + CHUNK_SIZE);
    await characteristic.writeWithoutResponse(chunk);
    await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms hardware breathe interval
  }
}`,
        },
        {
          title: 'Stabilized Bluetooth Polling with Exponential Backoff',
          subtitle: 'Resilient Re-Pairing in High-Interference Restaurant Environments',
          details: 'Commercial kitchens are harsh RF environments filled with microwaves, metal surfaces, and electrical equipment that disrupt BLE signals. Engineered an automated 5-step exponential backoff polling mechanism (200ms, 400ms, 800ms, 1600ms, 3200ms) that transparently recovers dropped printer connections without cashier intervention.',
          spec: '5-Step Exponential Backoff | 200ms Initial Interval',
        },
        {
          title: 'Global 10s Axios Network Timeout Protection',
          subtitle: 'Guaranteed POS Responsiveness on Flaky Guest Wi-Fi',
          details: 'Restaurant Wi-Fi is notoriously unstable. Configured strict 10,000ms network timeouts across all Axios network calls paired with offline AsyncStorage queues, ensuring the application UI never blocks waiting for slow external responses.',
          spec: '10s Timeout | Automated AsyncStorage Offline Fallback',
        },
      ],
    },

    techStackDetailed: [
      { category: 'Mobile Framework', name: 'React Native', spec: 'Expo SDK 54 / React 19', rationale: 'Native performance, instant touch response, and seamless cross-platform deployment to Android and iOS tablets.' },
      { category: 'Hardware Wireless', name: 'react-native-ble-plx', spec: 'BLE Peripheral & Central', rationale: 'Direct low-level Bluetooth Low Energy characteristic read/write control without intermediary layers.' },
      { category: 'Printer Protocol', name: 'Epson ESC/POS Hex', spec: 'Binary Hexadecimal Arrays', rationale: 'Deterministic hardware printer control bypassing slow HTML-to-image rasterization plugins.' },
      { category: 'State Management', name: 'Redux Toolkit', spec: 'Normalized Slices & Selectors', rationale: 'Sub-millisecond cart item addition, modifier hierarchy computation, and real-time ledger updates.' },
      { category: 'Offline Storage', name: 'AsyncStorage', spec: 'Local Persistent Key-Value', rationale: 'Instant local persistence of pending order tickets and inventory adjustments when offline.' },
      { category: 'Network Client', name: 'Axios', spec: 'Custom Interceptors / 10s Timeout', rationale: 'Controlled network timeouts and background synchronization when connectivity is re-established.' },
    ],

    productionChallenges: [
      {
        issue: 'Thermal Printers Choking During Morning Rush',
        rootCause: 'Transmitting full receipt payloads at once exceeded the 20-byte MTU buffer of the BLE printer microcontroller, dropping the bottom half of tickets.',
        engineeringSolution: 'Built a byte pagination engine that slices outgoing buffers into 20-byte arrays and introduces a deterministic 50ms delay between packets.',
        outcome: 'Achieved 0.00% dropped receipts and eliminated print truncation across thousands of customer orders.',
      },
      {
        issue: 'Frequent BLE Disconnections Around Kitchen Microwaves',
        rootCause: '2.4 GHz interference in cafe kitchens caused transient socket drops, forcing staff to manually restart Bluetooth pairing.',
        engineeringSolution: 'Created an automated retry manager utilizing exponential backoff (5 attempts starting at 200ms), maintaining an active keep-alive heartbeat.',
        outcome: 'Reduced manual printer reconnections by 95% and preserved uninterrupted billing throughout busy dining shifts.',
      },
      {
        issue: 'UI Freezes Under Spotty Restaurant Internet',
        rootCause: 'Standard HTTP requests blocked the main UI thread when restaurant Wi-Fi experienced packet loss.',
        engineeringSolution: 'Implemented offline-first Redux persistence with 10s strict network timeouts, queuing cloud synchronizations in the background.',
        outcome: 'Guaranteed immediate cashier feedback with zero screen lockups regardless of external network quality.',
      },
    ],
  },
  {
    id: 'olacars-portal',
    number: '03',
    title: 'OlaCars Fleet Portal',
    client: 'Enterprise Fleet Management Portal',
    category: 'Enterprise Web',
    year: '2025–2026',
    description: 'Enterprise fleet management platform interfacing with 50+ domain microservices, 8-tier RBAC, and client-side data validation.',
    longDescription: 'Engineered and stabilized an enterprise-grade administrative portal used by staff to manage vehicle rentals, driver onboarding, and complex financial ledgers. Resolved critical state management and rendering bugs across an enterprise React 19 frontend interacting with over 50 domain services and thousands of API endpoints. Debugged and secured a complex Axios JWT token queueing system utilizing execution locks to seamlessly replay pending network requests and prevent data loss under heavy load. Optimized bulk CSV/Excel data uploads using client-side parsing (PapaParse/XLSX), and stabilized client-side PDF generation (jsPDF/html2canvas) and e-signature canvas scaling.',
    role: 'Frontend & Systems Engineer',
    techStack: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Axios Execution Locks', 'PapaParse', 'XLSX', 'jsPDF', 'html2canvas', 'AWS S3'],
    deliverables: [
      'Stabilized UI Interfacing with 50+ Domain Microservices & 1000s of Endpoints',
      'Secured Axios JWT Token Queueing System Utilizing Execution Locks',
      'Client-Side Bulk CSV & Excel Parsing (PapaParse / XLSX) Pre-Validation',
      'Stabilized Client-Side PDF Generation (jsPDF / html2canvas) & E-Signature Scaling',
      '8-Tier Hierarchical RBAC Authorization Matrix',
      'AWS S3 Document & Financial Agreement Storage Integration'
    ],
    metrics: [
      { label: 'Domain Services', value: '50+ Services' },
      { label: 'Token Queue Locks', value: 'Zero Data Loss' },
      { label: 'Bulk Pre-Parsing', value: 'Client Validated' },
      { label: 'PDF & Canvas', value: 'Multi-Viewport' },
    ],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com/Govind858',

    businessLogic: {
      headline: 'Enterprise Multi-Tier Fleet Operations and Financial Agreement Processing',
      problem: 'Operating a fleet of thousands of commercial rental and lease vehicles involves complicated multi-tier administrative responsibilities: driver KYC onboarding, lease agreement generation, vehicle inspection sign-offs, damage assessment ledgers, maintenance cycles, and recurring payment reconciliations. Without strict role separation and client-side validation, bad data entries corrupted central databases and caused costly billing errors.',
      solution: 'OlaCars Fleet Portal is an enterprise administrative workstation connecting branch managers, inspection technicians, compliance officers, and finance accountants. It features an 8-tier Role-Based Access Control (RBAC) matrix, browser-level bulk spreadsheet data sanitization, in-browser digital lease agreement generation with legal e-signature capture, and direct AWS S3 document archival.',
      userFlow: [
        { step: '01', title: 'RBAC Login & Session Initialization', desc: 'User logs in; JWT token decodes role permissions, rendering only authorized navigation trees and actionable tables.' },
        { step: '02', title: 'Vehicle & Lease Onboarding', desc: 'Select customer/driver profile, configure lease terms (deposit, monthly installment, mileage limits).' },
        { step: '03', title: 'Digital E-Signature Capture', desc: 'Customer and hub manager review agreement on tablet/desktop, sign digitally on HTML5 canvas.' },
        { step: '04', title: 'PDF Generation & S3 Archival', desc: 'Agreement is compiled into high-resolution multi-page PDF in the browser and uploaded to private AWS S3 bucket.' },
      ],
      partnerFlow: [
        { step: '01', title: 'Bulk Inventory Ingestion', desc: 'Upload CSV or XLSX file containing hundreds of new fleet vehicle registrations and telematics IDs.' },
        { step: '02', title: 'Pre-Flight Data Sanitization', desc: 'Client browser verifies VIN numbers, plate formats, and date structures before sending any payload to server.' },
        { step: '03', title: 'Financial Ledger & Overdue Tracking', desc: 'Finance teams monitor upcoming and overdue lease installments with real-time exportable audit ledgers.' },
        { step: '04', title: 'Automated 60-Second Security Polling', desc: 'Active sessions verify credential validity every 60 seconds to prevent unauthorized privilege escalation.' },
      ],
      financialModel: 'B2B Enterprise Fleet Infrastructure handling millions of rupees in recurring corporate leases and commercial driver agreements.',
    },

    technicalDeepDive: {
      overview: 'Engineered with React 19, TypeScript, and Redux Toolkit, orchestrating communication across 50+ domain microservices. Features client-side file parsing engines, digital signature canvas scaling, and execution-locked Axios interceptor queues.',
      components: [
        {
          title: '8-Tier Hierarchical RBAC Authorization Engine',
          subtitle: 'Granular Endpoint Protection & UI Permission Gating',
          details: 'Built a declarative permission matrix supporting 8 hierarchical tiers (Superadmin, Hub Manager, Fleet Technician, Finance Officer, Customer Agent, Compliance Auditor, Driver Onboarder, Read-Only Inspector). Every action button, tab, and API dispatch evaluates permission bitmasks before rendering.',
          spec: '8 User Tiers | Bitmask Permission Checking | Route Guards',
        },
        {
          title: 'Axios JWT Queueing with Mutex Execution Locks',
          subtitle: 'Zero Data Loss Under Heavy Concurrent API Dispatches',
          details: 'Enterprise dashboards trigger dozens of simultaneous API requests on initial load. If access tokens expire, a naive interceptor triggers dozens of duplicate refresh calls, causing race conditions and invalidated sessions. Implemented a mutex execution lock (isRefreshingToken) that pauses all requests, executes a single refresh call, and seamlessly replays the entire backlog.',
          spec: 'Mutex Token Lock | FailedQueue Replay | 100% Request Continuity',
          codeSnippet: `let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};`,
        },
        {
          title: 'Client-Side PapaParse & XLSX Data Pre-Sanitizer',
          subtitle: 'Eliminating Malformed Bulk Database Uploads',
          details: 'Automotive inventory uploads contain complex columns with potential formatting anomalies. Integrated client-side parsing using PapaParse and SheetJS (XLSX) in Web Workers to inspect rows, validate VIN checksums, check date formats, and highlight invalid cells directly in the browser UI before any network payload is dispatched.',
          spec: 'PapaParse & SheetJS | Browser Pre-flight Validation | 90% Less Server Load',
        },
        {
          title: 'Responsive E-Signature Canvas & jsPDF Generation',
          subtitle: 'Pixel-Perfect Multi-Viewport Document Rendering',
          details: 'Engineered responsive HTML5 canvas scaling for digital e-signatures that normalizes coordinates across touchscreens and desktop mice. Integrated jsPDF and html2canvas with custom pagination algorithms to render clean, legal agreements without clipping table rows or footers across page breaks.',
          spec: 'HTML5 Canvas DPI Normalization | Multi-Page jsPDF Generation',
        },
        {
          title: 'AWS S3 Pre-Signed Upload Integration',
          subtitle: 'Secure Decentralized Binary Asset Storage',
          details: 'Client uploads driver licenses, vehicle inspection photos, and generated agreement PDFs directly to Amazon S3 buckets using short-lived pre-signed URLs, preventing large file streams from bogging down internal application servers.',
          spec: 'Pre-Signed S3 URLs | Direct Client-to-S3 Binary Streaming',
        },
      ],
    },

    techStackDetailed: [
      { category: 'Frontend Core', name: 'React 19 & TypeScript', spec: 'Concurrent Features / Strict Typing', rationale: 'Enterprise state handling across massive data grids and complex modal hierarchies.' },
      { category: 'State Engine', name: 'Redux Toolkit', spec: 'RTK Query / Normalized Stores', rationale: 'Centralized state caching across 50+ domain microservices, preventing redundant API round trips.' },
      { category: 'Build Tooling', name: 'Vite & Tailwind CSS', spec: 'Instant HMR / Utility First', rationale: 'Sub-second compilation and high-contrast responsive styling optimized for enterprise displays.' },
      { category: 'Spreadsheet Parser', name: 'PapaParse & SheetJS (XLSX)', spec: 'Client-Side In-Memory Worker', rationale: 'In-browser pre-validation of bulk vehicle inventory manifests before database transmission.' },
      { category: 'Document Engine', name: 'jsPDF & html2canvas', spec: 'Client-Side Vector/Raster PDF', rationale: 'Generates legally binding vehicle lease agreements and inspection reports on-the-fly.' },
      { category: 'Cloud Storage', name: 'AWS S3', spec: 'Pre-Signed Direct Uploads', rationale: 'Decentralized cloud object storage for confidential customer agreements and KYC images.' },
    ],

    productionChallenges: [
      {
        issue: 'Token Refresh Race Conditions Dropping Grid Data',
        rootCause: 'Opening the fleet dashboard triggered 12 concurrent API calls. When access tokens expired, each request fired its own refresh token request, causing token invalidation on the backend.',
        engineeringSolution: 'Built an Axios mutex execution lock that intercepts all 401 calls, pauses outbound requests into a memory queue, triggers a single refresh token operation, and re-executes all queued calls upon resolution.',
        outcome: 'Achieved 100% session continuity and eliminated sudden mid-session logout errors across all branches.',
      },
      {
        issue: 'Server Crashes on Malformed 5,000-Row Excel Uploads',
        rootCause: 'Branch managers uploaded inventory spreadsheets containing missing headers, illegal VIN characters, and formula injection strings.',
        engineeringSolution: 'Implemented client-side parsing using PapaParse and XLSX to validate all columns in the browser, showing an interactive error matrix with exact line numbers before submission.',
        outcome: 'Reduced backend validation exceptions to zero and sped up bulk onboarding by 400%.',
      },
      {
        issue: 'Blurry Signatures and Truncated PDF Tables',
        rootCause: 'HTML5 canvas signature pads lost resolution on high-DPI retina displays, and tables broke awkwardly across PDF page breaks.',
        engineeringSolution: 'Applied window.devicePixelRatio coordinate normalization to canvas context and authored dynamic height calculation in jsPDF to insert clean page breaks before truncated rows.',
        outcome: 'Guaranteed crisp, legally compliant PDF agreements across all mobile, tablet, and desktop viewports.',
      },
    ],
  },
];
