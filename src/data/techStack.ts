export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: string;
    description: string;
    tags: string[];
    highlight?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend & Distributed Systems',
    subtitle: 'High-concurrency Node.js architectures, distributed locking, and resilient event queues.',
    skills: [
      {
        name: 'Node.js',
        level: 'Primary Focus',
        description: 'Building production-grade microservices, REST APIs, asynchronous task workers, and stream processing.',
        tags: ['v20-slim', 'Async/Await', 'Streams', 'Cluster'],
        highlight: true,
      },
      {
        name: 'Express.js',
        level: 'Advanced',
        description: 'MVC architecture, centralized error handling, cryptographic webhook verification, and compression middleware.',
        tags: ['Middleware', 'Routing', 'Security', 'REST'],
        highlight: true,
      },
      {
        name: 'Distributed Systems & Architecture',
        level: 'Core Discipline',
        description: 'Distributed locking with Redis, high-speed transient data layers, race-condition mitigation, and modular microservices.',
        tags: ['Distributed Locks', 'Concurrency', 'Microservices'],
        highlight: true,
      },
      {
        name: 'BullMQ & Job Queues',
        level: 'Production',
        description: 'Decoupled background worker architectures for heavy payout aggregation, scheduled tasks, and retries.',
        tags: ['Workers', 'Delayed Jobs', 'Concurrency'],
        highlight: true,
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
        description: 'Strict type safety across backend API contracts, DTO validation, and React components.',
        tags: ['Generics', 'DTOs', 'Strict Mode'],
      },
    ],
  },
  {
    title: 'Cloud, Containers & DevOps',
    subtitle: 'Containerization, Kubernetes pod orchestration, and Nginx load balancing.',
    skills: [
      {
        name: 'Kubernetes (K8s)',
        level: 'Production',
        description: 'Configuring Deployments, HorizontalPodAutoscaler (HPA 2-10 replicas at 75% CPU), readiness probes, and resource constraints.',
        tags: ['HPA', 'Deployments', 'ConfigMaps', 'Resource Limits'],
        highlight: true,
      },
      {
        name: 'Docker',
        level: 'Advanced',
        description: 'Multi-stage Dockerfiles leveraging layer caching for optimal container sizes and reproducible deployments.',
        tags: ['Multi-Stage', 'Layer Cache', 'Docker Compose'],
        highlight: true,
      },
      {
        name: 'Nginx',
        level: 'Production',
        description: 'Reverse proxy and upstream load balancer configured for 1,024 worker connections across container instances.',
        tags: ['Load Balancing', 'Proxy Buffering', 'Header Security'],
        highlight: true,
      },
      {
        name: 'Linux / Ubuntu',
        level: 'Core',
        description: 'Command line operations, daemon management, system resource monitoring, and production server hardening.',
        tags: ['Bash', 'Systemd', 'Networking', 'Permissions'],
      },
      {
        name: 'AWS S3',
        level: 'Intermediate',
        description: 'Secure cloud object storage for binary media, PDF reports, and agreement assets.',
        tags: ['Bucket Policies', 'Signed URLs', 'Media Storage'],
      },
    ],
  },
  {
    title: 'Databases & In-Memory Stores',
    subtitle: 'Relational & document stores paired with ultra-fast memory caching.',
    skills: [
      {
        name: 'MongoDB & Mongoose',
        level: 'Production',
        description: 'Schema modeling, indexing, pagination, transaction logs, and custom SRV DNS resolver retry mechanisms.',
        tags: ['Mongoose', 'Aggregation', 'Atlas', 'Indexes'],
        highlight: true,
      },
      {
        name: 'Redis',
        level: 'Production',
        description: 'Distributed locking layer, token caching, session storage, and BullMQ backing store.',
        tags: ['Distributed Locks', 'ioredis', 'Cache Invalidation'],
        highlight: true,
      },
      {
        name: 'PostgreSQL',
        level: 'Proficient',
        description: 'Relational data modeling, ACID transactions, complex joins, and query optimization.',
        tags: ['SQL', 'Relational', 'Constraints'],
      },
    ],
  },
  {
    title: 'Frontend, Mobile & Hardware IoT',
    subtitle: 'Cross-platform mobile applications, hardware thermal printing, and Next.js / React 19.',
    skills: [
      {
        name: 'Next.js & React 19',
        level: 'Advanced',
        description: 'Full-stack SSR/SSG workflows, enterprise state management with Redux Toolkit, and scalable component architecture.',
        tags: ['Next.js', 'React 19', 'Redux Toolkit', 'SSR'],
        highlight: true,
      },
      {
        name: 'React Native & Expo',
        level: 'Advanced',
        description: 'Cross-platform mobile apps (Expo SDK 54, Expo Router), native module bridges, and local cache policies.',
        tags: ['Expo SDK 54', 'EAS Builds', 'AsyncStorage'],
        highlight: true,
      },
      {
        name: 'BLE ESC/POS Printing',
        level: 'Specialty',
        description: 'Bluetooth Low Energy raw hex control arrays with 20-byte packet pagination, 50ms delay, and 5-retry exponential backoff.',
        tags: ['Hardware Hex', 'Buffer Throttling', 'Exponential Backoff'],
        highlight: true,
      },
      {
        name: 'Axios Interceptor Queues',
        level: 'Mastery',
        description: 'Silent JWT refresh queues with execution locks that intercept 401s, refresh tokens, and replay pending requests.',
        tags: ['Silent Refresh', 'Failed Queue', 'Execution Locks'],
        highlight: true,
      },
    ],
  },
  {
    title: 'API & Testing Tools',
    subtitle: 'API contract design, endpoint testing, and interactive documentation.',
    skills: [
      {
        name: 'Postman',
        level: 'Advanced',
        description: 'Comprehensive API testing suites, environment variables, automated pre-request scripts, and mock servers.',
        tags: ['Collection Testing', 'Automated Tests', 'Environments'],
        highlight: true,
      },
      {
        name: 'Swagger (OpenAPI)',
        level: 'Proficient',
        description: 'Interactive API documentation, OpenAPI specifications, request validation, and schema definitions.',
        tags: ['OpenAPI 3.0', 'Schema Validation', 'Interactive Docs'],
        highlight: true,
      },
    ],
  },
];
