// filepath: documentation/src/data/showcase.ts
// Showcase data for the Capstone showcase (new format).

export type TagType = 'favorite' | 'opensource' | 'react' | 'tooling' | 'education' | 'capstone';

export const TagList: TagType[] = [
  'favorite',
  'opensource',
  'react',
  'tooling',
  'education',
  'capstone',
];

export const Tags: Record<TagType, {label: string; description: string; color: string}> = {
  favorite: {label: 'Favorite', description: 'Personal favorite sites', color: '#ffb020'},
  opensource: {label: 'Open Source', description: 'Open source project', color: '#007acc'},
  react: {label: 'React', description: 'Built with React', color: '#61dafb'},
  tooling: {label: 'Tooling', description: 'Developer tooling', color: '#0f62fe'},
  education: {label: 'Education', description: 'Educational project or tutorial', color: '#3ddc84'},
  capstone: {label: 'Capstone', description: 'Capstone course project', color: '#8e44ad'},
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
    tags: ['capstone', 'opensource', 'react'],
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
    tags: ['capstone', 'tooling'],
    semester: 'Spring 2025',
    slug: 'clover',
    members: ['Team B'],
  },
];

// Provide backward-compatible exports used by older components (names like `sortedUsers`).
export const sortedUsers = projects;
export type User = Project;

export default projects;
