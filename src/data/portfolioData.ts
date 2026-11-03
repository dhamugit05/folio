import { OwnerProfile, ProjectItem, SkillCategory } from '../types';

export const initialProfile: OwnerProfile = {
  name: 'Dhamotharan S',
  title: 'Junior Software Developer',
  specializations: [
    'Python',
    'React.js',
    'Node.js',
    'TypeScript',
    'SQL',
    'Django & REST APIs',
  ],
  bio: 'Python Fullstack Developer (BCA graduate) building scalable full stack web applications with React, TypeScript, Node.js, and SQL. Deployed 3+ production applications with REST API integration, JWT authentication, and responsive UIs.',
  email: 'dhamotharanpers@gmail.com',
  location: 'Chennai, Tamil Nadu, India',
  github: 'https://github.com/dhamugit05',
  linkedin: 'https://www.linkedin.com/in/dhamotharansamy',
  resumeUrl: '/resume.pdf',
  photoUrl: '/images/profile.jpg',
  availability: 'Open to full-time Junior Full Stack / Frontend / Python roles (Remote or On-site)',
};

export const initialProjects: ProjectItem[] = [
  {
    id: 'horolo',
    slug: 'horolo',
    title: 'Horolo',
    subtitle: 'Luxury Watch E-Commerce & Interactive 3D Web Application',
    description: 'A luxury timepiece e-commerce showcase featuring interactive procedural 3D watch presentation, dynamic micro-interactions, and AI-assisted timepiece advisory powered by the Google GenAI API.',
    category: '3D & AI',
    tags: ['React', 'TypeScript', 'Vite', 'Three.js', 'Tailwind CSS', 'Google GenAI API'],
    image: '/images/projects/horolo.webp',
    liveUrl: 'https://horolo.netlify.app/',
    githubUrl: 'https://github.com/dhamugit05/horolo',
    featured: true,
    caseStudy: {
      challenge: 'High-end luxury goods depend on tactile aesthetic details and visual depth that static flat 2D e-commerce catalogs fail to deliver.',
      architecture: 'Engineered procedural 3D presentation with Three.js, lightweight spring animations with Framer Motion, and incorporated contextual Google GenAI queries for curated watch recommendations.',
      impact: 'Fluid 60 FPS responsive showcase with instant interactive color switching and an engaging customer discovery experience.',
    },
  },
  {
    id: 'volt',
    slug: 'volt',
    title: 'Volt Storefront',
    subtitle: 'Multi-Page High-Performance E-Commerce Frontend',
    description: 'A responsive multi-page e-commerce storefront engineered for speed, clean catalog navigation, instant cart state synchronization, and accessible UI controls.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite', 'Netlify'],
    image: '/images/projects/volt.webp',
    liveUrl: 'https://voltecom.netlify.app/',
    githubUrl: 'https://github.com/dhamugit05/voltecom',
    featured: true,
    caseStudy: {
      challenge: 'Delivering an e-commerce shopping experience with instant page loads, zero UI layout shifts, and clean cross-device navigation.',
      architecture: 'Structured modular component hierarchy with Tailwind styling, dynamic route code splitting, and optimized client state management.',
      impact: 'High-speed browsing experience with zero layout shift and 95+ performance scores.',
    },
  },
  {
    id: 'task-manager',
    slug: 'task-manager',
    title: 'Full Stack Task Manager',
    subtitle: 'Secure Workflow Platform with Django REST & React',
    description: 'A full-stack productivity workspace backed by Django REST Framework, MySQL relational schema, secure JWT token authentication, and a responsive React frontend.',
    category: 'Full Stack',
    tags: ['Python', 'Django', 'Django REST Framework', 'MySQL', 'JWT Auth', 'React'],
    image: '/images/projects/taskmanager.webp',
    githubUrl: 'https://github.com/dhamugit05/task-manager',
    featured: true,
    caseStudy: {
      challenge: 'Building a robust multi-user task management backend with role-based access control, atomic transactions, and clean client-side token renewal.',
      architecture: 'Engineered Django REST Framework API with JSON Web Token authentication, relational MySQL schema with foreign key constraints, and React CRUD interface with optimistic updates.',
      impact: 'Fully documented REST API endpoints tested via Postman, zero auth token leakage, and responsive user workflow.',
    },
  },
  {
    id: 'spendwise',
    slug: 'spendwise',
    title: 'SpendWise',
    subtitle: 'Responsive Expense Tracker & Analytics Platform',
    description: 'Personal finance visualizer with dynamic filtering, transactional form validations, category breakdown charts, and persistent local storage.',
    category: 'Frontend',
    tags: ['JavaScript (ES6+)', 'Chart.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    image: '/images/projects/spendwise.webp',
    githubUrl: 'https://github.com/dhamugit05/spendwise',
    featured: false,
    caseStudy: {
      challenge: 'Helping users understand categorized monthly cash flows through visual indicators and instant category aggregation without latency.',
      architecture: 'Engineered client-side state caching with dynamic Chart.js canvas rendering and strict input schema verification.',
      impact: 'Intuitive data visualization accessible on any mobile device.',
    },
  },
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 'Advanced', note: 'Hooks, functional components, state management & reusable component architectures' },
      { name: 'TypeScript', level: 'Intermediate', note: 'Strict typing, interfaces, type-safe API contracts & generic utilities' },
      { name: 'JavaScript', level: 'Advanced', note: 'Modern ES6+, async/await, closures, DOM manipulation & event loop' },
      { name: 'Tailwind CSS', level: 'Advanced', note: 'Responsive layouts, dark mode, design systems & micro-interactions' },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Python', level: 'Advanced', note: 'Object-oriented programming, data structures, algorithms & scripting' },
      { name: 'Django', level: 'Intermediate', note: 'ORM models, migrations, authentication, modular applications & middleware' },
      { name: 'Django REST Framework', level: 'Intermediate', note: 'ModelSerializers, API views, JWT auth & pagination' },
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'SQL (MySQL)', level: 'Intermediate', note: 'Relational schema design, indexes, joins, aggregations & constraints' },
      { name: 'Git Bash & Git', level: 'Advanced', note: 'Branching, commits, rebasing, merge conflict resolution & GitHub workflows' },
      { name: 'Three.js / WebGL', level: 'Intermediate', note: 'Procedural meshes, scene lighting, materials & responsive canvas rendering' },
    ],
  },
];
