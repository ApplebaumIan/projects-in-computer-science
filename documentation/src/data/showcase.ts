// filepath: documentation/src/data/showcase.ts
// Showcase data for the Capstone showcase (new format).

export type TagType =
  | 'education'
  | 'gamification'
  | 'computerVision'
  | 'iot'
  | 'hardware'
  | 'ar'
  | 'robotics'
  | 'safety'
  | 'healthFitness'
  | 'bioinformatics'
  | 'devops'
  | 'chatbot'
  | 'accessibility'
  | 'geolocation'
  | 'collaboration'
  | 'environmental'
  | 'interviewPrep'
  | 'game'
  | 'blockCoding'
  | 'analytics'
  | 'research'
  | 'llms';

export const TagList: TagType[] = [
  'education',
  'gamification',
  'computerVision',
  'iot',
  'hardware',
  'ar',
  'robotics',
  'safety',
  'healthFitness',
  'bioinformatics',
  'devops',
  'chatbot',
  'accessibility',
  'geolocation',
  'collaboration',
  'environmental',
  'interviewPrep',
  'game',
  'blockCoding',
  'analytics',
  'research',
  'llms',
];

export const Tags: Record<
  TagType,
  { label: string; description: string; color: string }
> = {
  education: {
    label: 'Education',
    description: 'Learning-focused platforms or tools',
    color: '#3D7FFF',
  },
  gamification: {
    label: 'Gamification',
    description: 'Uses game mechanics to drive engagement',
    color: '#FF8A00',
  },
  computerVision: {
    label: 'Computer Vision',
    description: 'Image / video recognition or detection',
    color: '#8E44AD',
  },
  iot: {
    label: 'IoT',
    description: 'Internet-connected physical devices',
    color: '#00A6A6',
  },
  hardware: {
    label: 'Hardware',
    description: 'Custom physical devices or embedded builds',
    color: '#546E7A',
  },
  ar: {
    label: 'Augmented Reality',
    description: 'AR experience or AR-enhanced interaction',
    color: '#B620E0',
  },
  robotics: {
    label: 'Robotics',
    description: 'Robotic platform or autonomous control',
    color: '#37474F',
  },
  safety: {
    label: 'Safety',
    description: 'Emergency, collision, or risk mitigation',
    color: '#D32F2F',
  },
  healthFitness: {
    label: 'Health & Fitness',
    description: 'Promotes wellness, exercise, or nutrition',
    color: '#2ECC71',
  },
  bioinformatics: {
    label: 'Bioinformatics',
    description: 'Biological data analysis or research support',
    color: '#1E88E5',
  },
  devops: {
    label: 'DevOps',
    description: 'Developer workflow, review, or automation',
    color: '#FFB300',
  },
  chatbot: {
    label: 'Chatbot',
    description: 'Conversational AI or assistant interface',
    color: '#2196F3',
  },
  accessibility: {
    label: 'Accessibility',
    description: 'Improves access for diverse users',
    color: '#795548',
  },
  geolocation: {
    label: 'Geolocation',
    description: 'Uses real-time location or mapping',
    color: '#009688',
  },
  collaboration: {
    label: 'Collaboration',
    description: 'Team communication or coordination',
    color: '#FF7043',
  },
  environmental: {
    label: 'Environmental',
    description: 'Monitors or aids ecological conditions',
    color: '#4CAF50',
  },
  interviewPrep: {
    label: 'Interview Prep',
    description: 'Practice and coaching for technical interviews',
    color: '#0066CC',
  },
  game: {
    label: 'Game',
    description: 'Playable interactive entertainment',
    color: '#FDD835',
  },
  blockCoding: {
    label: 'Block Coding',
    description: 'Visual programming or drag-and-drop coding',
    color: '#9C27B0',
  },
  analytics: {
    label: 'Analytics',
    description: 'Performance metrics or data insights',
    color: '#455A64',
  },
  research: {
    label: 'Research',
    description: 'Supports academic or scientific study',
    color: '#5C6BC0',
  },
  llms: {
      label: 'LLMs',
      description: 'Large Language Models or NLP applications',
      color: '#FF5722',
    },
};


export type Project = {
  title: string;
  description: string;
  website?: string; // deployed app link (button)
  documentation?: string; // link to project documentation (button)
  demo?: string; // link to demo video (button)
  source?: string; // source/repository link (button)
  tags: TagType[];
  preview?: string;
  semester?: string;
  slug?: string;
  members?: string[];
  repo?: string;
};

// Example projects array; replace with real project data as needed.
export const projects: Project[] = [
  {
    title: 'Hip.io',
    description:
      "Hip.io is a reimagined online multiplayer version of Hungry Hungry Hippo designed for children who use Augmentative and Alternative Communication (AAC) devices. Unlike traditional games, the AAC user leads gameplay by selecting which foods appear and applying special effects, while other players control hippos to catch the chosen foods. The system uses React for the UI, Phaser for game logic, and a WebSocket server for real-time multiplayer synchronization. The goal is to empower AAC users to direct group play, making fast-paced games more accessible and inclusive.\n",
    website: 'https://capstone-projects-2025-spring.github.io/project-acc-hungry-hippos',
    // documentation: 'https://capstone-projects-2025-spring.github.io/project-acc-hungry-hippos/docs',
    demo: 'https://www.youtube.com/watch?v=example-hipio',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-acc-hungry-hippos',
    tags: ['game', 'accessibility'],
    semester: 'Summer 2025',
    slug: 'hip-io',
    members: ['Team A'],
  },
  {
    title: 'Clover',
    description:
      'CLOVER is an AI-powered coding assistant designed for educational use. It integrates with Visual Studio Code to provide real-time code suggestions, track user interactions, and analyze coding habits. By logging mistakes and offering contextual feedback, it helps novice programmers learn and avoid over-reliance on AI. A dashboard allows users to review their progress and coding behavior, making the assistant both a learning tool and a productivity aid.\n',
    website: 'https://capstone-projects-2025-spring.github.io/project-copilot-clone-2/',
    // documentation: 'https://capstone-projects-2025-spring.github.io/project-copilot-clone-2/docs',
    demo: 'https://www.youtube.com/watch?v=example-clover',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-copilot-clone-2',
    tags: ['education', 'llms', 'research'],
    semester: 'Spring 2025',
    slug: 'clover',
    members: ['Team B'],
  },
];

// Provide backward-compatible exports used by older components (names like `sortedUsers`).
export const sortedUsers = projects;
export type User = Project;

export default projects;
