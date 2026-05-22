// filepath: documentation/src/data/showcase.ts
// Showcase data for the Capstone showcase (new format).

export type TagType =
  | 'aac'
  | 'ai'
  | 'analytics'
  | 'ar'
  | 'autonomous'
  | 'accessibility'
  | 'bioinformatics'
  | 'bluetooth'
  | 'canvas-lms'
  | 'chatbot'
  | 'collaboration'
  | 'code-quality'
  | 'community'
  | 'computer-vision'
  | 'devops'
  | 'discordBot'
  | 'education'
  | 'embedded'
  | 'gamification'
  | 'game'
  | 'gaming'
  | 'geolocation'
  | 'github'
  | 'hardware'
  | 'health'
  | 'fitness'
  | 'interview-prep'
  | 'iot'
  | 'jira'
  | 'llms'
  | 'ml'
  | 'mobile'
  | 'multiplayer'
  | 'puzzle'
  | 'parking'
  | 'pwa'
  | 'raspberry-pi'
  | 'research'
  | 'robotics'
  | 'safety'
  | 'sensors'
  | 'slack'
  | 'social'
  | 'unity'
  | 'vscode-extension'
  | 'virtual-pet'
  | 'web'
  | 'webgl'
  | 'api'
  | 'library'
  | 'speech-to-text'
  | 'laravel'
  | 'nextjs'
  | 'react'
  | 'django'
  | 'flask'
  | 'sqlite'
  | 'postgresql'
  | 'mongodb'
  | 'tensorflow'
  | 'pytorch'
  // Language tags
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'csharp'
  | 'cpp'
  | 'shell'
  | 'swift'
  | 'go'
  | 'kotlin'
  | 'php'
  | 'c'
  | 'java'
  | 'ruby'
  | 'rust'
  | 'dart'
  | 'lua'
  | 'dockerfile'
  | 'docker-compose'
  | 'jupyter-notebook'
  | 'matlab'
  | 'r'
  | 'objective-c'
  | 'haskell'
  | 'perl'
  | 'node'
  | 'websocket'
  | 'k8s'
  | 'redis'
  | 'bun'
  | 'phaser'
;

export const TagList: TagType[] = [
  'aac',
  'ai',
  'analytics',
  'ar',
  'autonomous',
  'accessibility',
  'bioinformatics',
  'bluetooth',
  'canvas-lms',
  'chatbot',
  'collaboration',
  'code-quality',
  'community',
  'computer-vision',
  'devops',
  'discordBot',
  'education',
  'embedded',
  'gamification',
  'game',
  'gaming',
  'geolocation',
  'github',
  'hardware',
  'health',
  'fitness',
  'interview-prep'
  , 'iot'
  , 'jira'
  , 'llms'
  , 'ml'
  , 'mobile'
  , 'multiplayer'
  , 'puzzle'
  , 'parking'
  , 'pwa'
  , 'raspberry-pi'
  , 'research'
  , 'robotics'
  , 'safety'
  , 'sensors'
  , 'slack'
  , 'social'
  , 'unity'
  , 'vscode-extension'
  , 'virtual-pet'
  , 'web'
  , 'webgl'
  , 'api'
  , 'library'
  , 'speech-to-text'
  , 'laravel'
  , 'nextjs'
  , 'react'
  , 'django'
  , 'flask'
  , 'sqlite'
  , 'postgresql'
  , 'mongodb'
  , 'tensorflow'
  , 'pytorch'
  , 'node'
  , 'websocket'
  , 'k8s'
  , 'redis'
  ,'bun'
  ,'phaser'
  // Language tags appended
  , 'typescript', 'javascript', 'python', 'csharp', 'cpp', 'shell', 'swift', 'go', 'kotlin', 'php', 'c', 'java', 'ruby', 'rust', 'dart', 'lua','dockerfile','docker-compose','jupyter-notebook','matlab','r','objective-c','haskell','perl'
];

export const LanguageTagList: TagType[] = ['typescript','javascript','python','csharp','cpp','shell','swift','go','kotlin','php','c','java','ruby','rust','dart','lua','dockerfile','docker-compose','jupyter-notebook'];

export const Tags: Record<
  TagType,
  { label: string; description: string; color: string }
> = {
  aac: { label: 'AAC', description: 'Augmentative and Alternative Communication', color: '#7B1FA2' },
  ai: { label: 'AI', description: 'Artificial Intelligence features or models', color: '#E64A19' },
  analytics: { label: 'Analytics', description: 'Performance metrics or data insights', color: '#455A64' },
  ar: { label: 'Augmented Reality', description: 'AR experience or AR-enhanced interaction', color: '#B620E0' },
  autonomous: { label: 'Autonomous', description: 'Autonomy, automated navigation, or control', color: '#455A64' },
  accessibility: { label: 'Accessibility', description: 'Improves access for diverse users', color: '#795548' },
  bioinformatics: { label: 'Bioinformatics', description: 'Biological data analysis or research support', color: '#1E88E5' },
  bluetooth: { label: 'Bluetooth', description: 'Bluetooth connectivity or wireless protocols', color: '#0288D1' },
  'canvas-lms': { label: 'Canvas LMS', description: 'Integrations or tools for Canvas LMS', color: '#3F51B5' },
  chatbot: { label: 'Chatbot', description: 'Conversational AI or assistant interface', color: '#2196F3' },
  collaboration: { label: 'Collaboration', description: 'Team communication or coordination', color: '#FF7043' },
  'code-quality': { label: 'Code Quality', description: 'Tools or workflows to improve code quality', color: '#455A64' },
  community: { label: 'Community', description: 'Community-focused or civic tech projects', color: '#00897B' },
  'computer-vision': { label: 'Computer Vision', description: 'Image / video recognition or detection', color: '#8E44AD' },
  devops: { label: 'DevOps', description: 'Developer workflow, review, or automation', color: '#FFB300' },
  discordBot: { label: 'Discord Bot', description: 'Bots or integrations for Discord', color: '#7289DA' },
  education: { label: 'Education', description: 'Learning-focused platforms or tools', color: '#3D7FFF' },
  embedded: { label: 'Embedded', description: 'Embedded systems or firmware projects', color: '#6D4C41' },
  gamification: { label: 'Gamification', description: 'Uses game mechanics to drive engagement', color: '#FF8A00' },
  game: { label: 'Game', description: 'Playable interactive entertainment', color: '#FDD835' },
  gaming: { label: 'Gaming', description: 'Gaming projects (alternate to Game/Gamification)', color: '#F39C12' },
  geolocation: { label: 'Geolocation', description: 'Uses real-time location or mapping', color: '#009688' },
  github: { label: 'GitHub', description: 'GitHub integrations or tooling', color: '#24292E' },
  hardware: { label: 'Hardware', description: 'Custom physical devices or embedded builds', color: '#546E7A' },
  health: { label: 'Health', description: 'Health-related features or apps', color: '#43A047' },
  fitness: { label: 'Fitness', description: 'Fitness or activity-tracking features', color: '#2E7D32' },
  'interview-prep': { label: 'Interview Prep', description: 'Practice and coaching for technical interviews', color: '#0066CC' },
  iot: { label: 'IoT', description: 'Internet-connected physical devices', color: '#00A6A6' },
  jira: { label: 'Jira', description: 'Jira integrations or project tracking', color: '#0052CC' },
  llms: { label: 'LLMs', description: 'Large Language Models or NLP applications', color: '#FF5722' },
  ml: { label: 'ML', description: 'Machine Learning', color: '#1976D2' },
  mobile: { label: 'Mobile', description: 'Mobile app or mobile-first projects', color: '#D81B60' },
  multiplayer: { label: 'Multiplayer', description: 'Real-time multiplayer or networked play', color: '#6A1B9A' },
  puzzle: { label: 'Puzzle', description: 'Puzzle or brain-teaser game mechanics', color: '#FFB74D' },
  parking: { label: 'Parking', description: 'Parking/transportation-related solutions', color: '#607D8B' },
  pwa: { label: 'PWA', description: 'Progressive Web App', color: '#43A047' },
  'raspberry-pi': { label: 'Raspberry Pi', description: 'Projects using Raspberry Pi hardware', color: '#C62828' },
  research: { label: 'Research', description: 'Supports academic or scientific study', color: '#5C6BC0' },
  robotics: { label: 'Robotics', description: 'Robotic platform or autonomous control', color: '#37474F' },
  safety: { label: 'Safety', description: 'Emergency, collision, or risk mitigation', color: '#D32F2F' },
  sensors: { label: 'Sensors', description: 'Sensor hardware and data collection', color: '#3949AB' },
  slack: { label: 'Slack', description: 'Slack bots, apps, or workspace integrations', color: '#4A154B' },
  social: { label: 'Social', description: 'Social or location-based social features', color: '#6D4C41' },
  unity: { label: 'Unity', description: 'Unity game engine projects', color: '#8E24AA' },
  'vscode-extension': { label: 'VSCode Extension', description: 'Extensions or IDE integrations for VSCode', color: '#0078D7' },
  'virtual-pet': { label: 'Virtual Pet', description: 'Virtual pet or pet simulation gameplay', color: '#FF6F9E' },
  web: { label: 'Web', description: 'Web application or web technology', color: '#0D47A1' },
  webgl: { label: 'WebGL', description: 'WebGL or browser-based graphics', color: '#00ACC1' },
  api: { label: 'API', description: 'APIs or backend services', color: '#00897B' },
  library: { label: 'Library', description: 'Reusable code libraries or frameworks', color: '#6D4C41' },
  'speech-to-text': { label: 'Speech-to-Text', description: 'Speech recognition or transcription features', color: '#F4511E' },
  laravel: { label: 'Laravel', description: 'Laravel framework', color: '#FF2D20' },
  nextjs: { label: 'Next.js', description: 'Next.js framework', color: '#000000' },
  react: { label: 'React', description: 'React library', color: '#61DAFB' },
  django: { label: 'Django', description: 'Django framework', color: '#092E20' },
  flask: { label: 'Flask', description: 'Flask microframework', color: '#000000' },
  sqlite: { label: 'SQLite', description: 'SQLite database', color: '#003B57' },
  postgresql: { label: 'PostgreSQL', description: 'PostgreSQL database', color: '#336791' },
  mongodb: { label: 'MongoDB', description: 'MongoDB database', color: '#47A248' },
  tensorflow: { label: 'TensorFlow', description: 'TensorFlow ML framework', color: '#FF6F00' },
  pytorch: { label: 'PyTorch', description: 'PyTorch ML framework', color: '#EE4C2C' },
  // Language tags metadata
  typescript: { label: 'TypeScript', description: 'TypeScript language', color: '#3178C6' },
  javascript: { label: 'JavaScript', description: 'JavaScript language', color: '#F7DF1E' },
  python: { label: 'Python', description: 'Python language', color: '#3776AB' },
  csharp: { label: 'C#', description: 'C# language', color: '#9B4F96' },
  cpp: { label: 'C++', description: 'C++ language', color: '#00599C' },
  shell: { label: 'Shell', description: 'Shell scripting', color: '#4EAA25' },
  swift: { label: 'Swift', description: 'Swift language', color: '#FA7343' },
  go: { label: 'Go', description: 'Go language', color: '#00ADD8' },
  kotlin: { label: 'Kotlin', description: 'Kotlin language', color: '#7F52FF' },
  php: { label: 'PHP', description: 'PHP language', color: '#777BB4' },
  c: { label: 'C', description: 'C language', color: '#A8B9CC' },
  java: { label: 'Java', description: 'Java language', color: '#007396' },
  ruby: { label: 'Ruby', description: 'Ruby language', color: '#CC342D' },
  rust: { label: 'Rust', description: 'Rust language', color: '#DEA584' },
  dart: { label: 'Dart', description: 'Dart language', color: '#0175C2' },
  lua: { label: 'Lua', description: 'Lua language', color: '#000080' },
  dockerfile: { label: 'Dockerfile', description: 'Dockerfile configuration', color: '#2496ED' },
  'docker-compose': { label: 'Docker Compose', description: 'Docker Compose configuration', color: '#2496ED' },
  'jupyter-notebook': { label: 'Jupyter Notebook', description: 'Jupyter Notebook files', color: '#F37626' },
  'matlab': { label: 'MATLAB', description: 'MATLAB language', color: '#0076A8' },
  'r': { label: 'R', description: 'R language', color: '#276DC3' },
  'objective-c': { label: 'Objective-C', description: 'Objective-C language', color: '#438EFF' },
  'haskell': { label: 'Haskell', description: 'Haskell language', color: '#5E5086' },
  'perl': { label: 'Perl', description: 'Perl language', color: '#39457E' },
  'node': {label: 'Node.js', description: 'Node.js runtime', color: '#339933' },
  'websocket': { label: 'WebSocket', description: 'WebSocket protocol or real-time communication', color: '#00897B' },
  'k8s': { label: 'Kubernetes', description: 'Kubernetes container orchestration', color: '#326CE5' },
  'redis':{ label: 'Redis', description: 'Redis in-memory data store', color: '#D82C20' },
  'bun':{ label: 'Bun', description: 'Bun runtime', color: '#ee81c3' },
  'phaser': { label: 'Phaser', description: 'Phaser Game Framework for Web', color: '#00897B' },

};

export type Project = {
  title: string;
  description: string;
  website?: string; // deployed app link (button)
  documentation?: string; // link to project documentation (button)
  demo?: string; // link to demo video (button)
  source?: string; // source/repository link (button)
  tags: (TagType | string)[];
  preview?: string;
  semester?: string;
  slug: string;
  legacySlug?: string;
  aliases?: string[];
  members?: string[];
  highlights?: string[];
  repo?: string;
  useDocsAsPreview?: boolean;
};

type ProjectOverviewEntry = {
  contentHtml?: string;
  summary: string;
  url: string;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rawProjects: Project[] = require('./showcaseProjects');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const showcaseProjectHelpers = require('./showcaseProjectHelpers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {enrichedProjects} = require('./showcaseEnrichment') as {
  enrichedProjects: Project[];
};

export const projects: Project[] = rawProjects;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const systemOverviewMapping: Record<string, ProjectOverviewEntry> = require('./showcaseSystemOverviews.json');

// Provide backward-compatible exports used by older components (names like `sortedUsers`).
export const sortedUsers = enrichedProjects;
export type User = Project;

export const {
  buildProjectMetaDescription,
  buildProjectPageTitle,
  buildProjectStructuredData,
  extractProjectSlugFromPathname,
  getAcademicYearLabel,
  getProjectCardAnchorIds,
  getProjectDetailPath,
  getProjectImage,
  getProjectLookupKeys,
  getProjectRouteAliases,
  getProjectOverviewSummary,
  getProjectSlug,
  getProjectSystemOverviewCandidates,
  getProjectSystemOverviewUrl,
  getRelatedProjects,
  normalizeProjectLookupValue,
  parseYoutubeUrl,
  slugifyProjectValue,
} = showcaseProjectHelpers as {
  buildProjectMetaDescription: (
    project: Project,
    overviewMapping?: Record<string, ProjectOverviewEntry>,
  ) => string;
  buildProjectPageTitle: (project: Project) => string;
  buildProjectStructuredData: (
    project: Project,
    overviewMapping?: Record<string, ProjectOverviewEntry>,
  ) => Record<string, unknown>;
  extractProjectSlugFromPathname: (pathname: string) => string;
  getAcademicYearLabel: (semester?: string) => string;
  getProjectCardAnchorIds: (project: Project) => string[];
  getProjectDetailPath: (projectOrSlug: Project | string) => string;
  getProjectImage: (project: Project) => string | null;
  getProjectLookupKeys: (project: Project) => string[];
  getProjectRouteAliases: (project: Project) => string[];
  getProjectOverviewSummary: (
    project: Project,
    overviewMapping?: Record<string, ProjectOverviewEntry>,
  ) => string;
  getProjectSlug: (project: Project) => string;
  getProjectSystemOverviewCandidates: (project: Project) => string[];
  getProjectSystemOverviewUrl: (project: Project) => string | null;
  getRelatedProjects: (
    projects: Project[],
    currentProject: Project,
    limit?: number,
  ) => Project[];
  normalizeProjectLookupValue: (value: string) => string;
  parseYoutubeUrl: (
    url?: string,
  ) => {videoId: string | null; startTime: string | null};
  slugifyProjectValue: (value: string) => string;
};

export function getProjectOverview(project: Project): string {
  return getProjectOverviewSummary(project, systemOverviewMapping);
}

export function getProjectOverviewContentHtml(project: Project): string {
  return systemOverviewMapping[getProjectSlug(project)]?.contentHtml ?? '';
}

export function getProjectOverviewSourceUrl(project: Project): string | null {
  return systemOverviewMapping[getProjectSlug(project)]?.url ?? getProjectSystemOverviewUrl(project);
}

export const showcaseSystemOverviews = systemOverviewMapping;

export function findShowcaseProjectBySlug(value: string): User | null {
  return showcaseProjectHelpers.findProjectBySlug(sortedUsers, value) as User | null;
}

export function resolveLegacyShowcaseRedirect(locationLike: {
  pathname?: string;
  hash?: string;
  search?: string;
}): string | null {
  return showcaseProjectHelpers.resolveLegacyShowcaseRedirect(
    sortedUsers,
    locationLike,
  ) as string | null;
}

export default enrichedProjects;
