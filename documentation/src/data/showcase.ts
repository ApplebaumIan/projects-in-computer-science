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
  | 'llms'
  // New tags found in the projects list (added to keep the type consistent)
  | 'multiplayer'
  | 'interview-prep'
  | 'web'
  | 'gaming'
  | 'raspberry-pi'
  | 'aac'
  | 'ml'
  | 'pwa'
  | 'sensors'
  | 'community'
  | 'social'
  | 'ai'
  | 'code-quality'
  | 'vscode-extension'
  | 'mobile'
  | 'health'
  | 'fitness'
  | 'unity'
  | 'canvas-lms'
  | 'computer-vision'
  | 'parking'
  | 'autonomous'
  | 'bluetooth'
  | 'embedded'
  | 'discordBot'
  | 'github'
  | 'jira'
  | 'puzzle'
  | 'webgl';

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
  // New tags
  'multiplayer',
  'interview-prep',
  'web',
  'gaming',
  'raspberry-pi',
  'aac',
  'ml',
  'pwa',
  'sensors',
  'community',
  'social',
  'ai',
  'code-quality',
  'vscode-extension',
  'mobile',
  'health',
  'fitness',
  'unity',
  'canvas-lms',
  'computer-vision',
  'parking',
  'autonomous',
  'bluetooth',
  'embedded',
  'discordBot',
  'github',
  'jira',
  'puzzle',
  'webgl',
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
  // Newly added tag definitions (minimal labels/descriptions/colors)
  multiplayer: {
    label: 'Multiplayer',
    description: 'Real-time multiplayer or networked play',
    color: '#6A1B9A',
  },
  'interview-prep': {
    label: 'Interview Prep (hyphen)',
    description: 'Interview practice and prep resources (alternate tag)',
    color: '#0288D1',
  },
  web: {
    label: 'Web',
    description: 'Web application or web technology',
    color: '#0D47A1',
  },
  gaming: {
    label: 'Gaming',
    description: 'Gaming projects (alternate to Game/Gamification)',
    color: '#F39C12',
  },
  'raspberry-pi': {
    label: 'Raspberry Pi',
    description: 'Projects using Raspberry Pi hardware',
    color: '#C62828',
  },
  aac: {
    label: 'AAC',
    description: 'Augmentative and Alternative Communication',
    color: '#7B1FA2',
  },
  ml: {
    label: 'ML',
    description: 'Machine Learning',
    color: '#1976D2',
  },
  pwa: {
    label: 'PWA',
    description: 'Progressive Web App',
    color: '#43A047',
  },
  sensors: {
    label: 'Sensors',
    description: 'Sensor hardware and data collection',
    color: '#3949AB',
  },
  community: {
    label: 'Community',
    description: 'Community-focused or civic tech projects',
    color: '#00897B',
  },
  social: {
    label: 'Social',
    description: 'Social or location-based social features',
    color: '#6D4C41',
  },
  ai: {
    label: 'AI',
    description: 'Artificial Intelligence features or models',
    color: '#E64A19',
  },
  'code-quality': {
    label: 'Code Quality',
    description: 'Tools or workflows to improve code quality',
    color: '#455A64',
  },
  'vscode-extension': {
    label: 'VSCode Extension',
    description: 'Extensions or IDE integrations for VSCode',
    color: '#0078D7',
  },
  mobile: {
    label: 'Mobile',
    description: 'Mobile app or mobile-first projects',
    color: '#D81B60',
  },
  health: {
    label: 'Health',
    description: 'Health-related features or apps',
    color: '#43A047',
  },
  fitness: {
    label: 'Fitness',
    description: 'Fitness or activity-tracking features',
    color: '#2E7D32',
  },
  unity: {
    label: 'Unity',
    description: 'Unity game engine projects',
    color: '#8E24AA',
  },
  'canvas-lms': {
    label: 'Canvas LMS',
    description: 'Integrations or tools for Canvas Learning Management System',
    color: '#3F51B5',
  },
  'computer-vision': {
    label: 'Computer Vision (alt)',
    description: 'Alternate tag for computer vision projects',
    color: '#6A1B9A',
  },
  parking: {
    label: 'Parking',
    description: 'Parking/transportation-related solutions',
    color: '#607D8B',
  },
  autonomous: {
    label: 'Autonomous',
    description: 'Autonomy, automated navigation, or control',
    color: '#455A64',
  },
  bluetooth: {
    label: 'Bluetooth',
    description: 'Bluetooth connectivity or wireless protocols',
    color: '#0288D1',
  },
  embedded: {
    label: 'Embedded',
    description: 'Embedded systems or firmware projects',
    color: '#6D4C41',
  },
  discordBot: {
    label: 'Discord Bot',
    description: 'Bots or integrations for Discord',
    color: '#7289DA',
  },
  github: {
    label: 'GitHub',
    description: 'GitHub integrations or tooling',
    color: '#24292E',
  },
  jira: {
    label: 'Jira',
    description: 'Jira integrations or project tracking',
    color: '#0052CC',
  },
  puzzle: {
    label: 'Puzzle',
    description: 'Puzzle or brain-teaser game mechanics',
    color: '#FFB74D',
  },
  webgl: {
    label: 'WebGL',
    description: 'WebGL or browser-based graphics',
    color: '#00ACC1',
  },
};

// Minimal Project type and placeholder projects array.
// The real `projects` array (with Project entries) appears to have been removed; to avoid
// type errors we define a small shape and export an empty array. If you want, I can
// merge back your actual `projects: Project[]` entries instead of this placeholder.
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
  useDocsAsPreview?: boolean;
};

// Example projects array; replace with real project data as needed.
export const projects: Project[] = [
  {
    title: 'Hip.io',
    description: 'Hip.io is a reimagined online multiplayer version of Hungry Hungry Hippo designed for children who use Augmentative and Alternative Communication (AAC) devices. Unlike traditional games, the AAC user leads gameplay by selecting which foods appear and applying special effects, while other players control hippos to catch the chosen foods. The system uses React for the UI, Phaser for game logic, and a WebSocket server for real-time multiplayer synchronization. The goal is to empower AAC users to direct group play, making fast-paced games more accessible and inclusive.',
    website: 'https://project-acc-hungry-hippos.vercel.app/',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-acc-hungry-hippos',
    demo: 'https://www.youtube.com/embed/tA-bBxNLHKY?start=2526',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-acc-hungry-hippos',
    tags: ['game', 'accessibility', 'multiplayer', 'aac'],
    semester: 'Summer 2025',
    slug: 'hip-io',
    useDocsAsPreview: true,
  },
  {
    title: 'Clover',
    description: 'CLOVER is an AI-powered coding assistant designed for educational use. It integrates with Visual Studio Code to provide real-time code suggestions, track user interactions, and analyze coding habits. By logging mistakes and offering contextual feedback, it helps novice programmers learn and avoid over-reliance on AI. A dashboard allows users to review their progress and coding behavior, making the assistant both a learning tool and a productivity aid.\n',
    website: 'https://clover.nickrucinski.com',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-copilot-clone-2/',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-copilot-clone-2',
    tags: ['ai', 'education', 'vscode-extension'],
    semester: 'Spring 2025',
    slug: 'clover',
  },
  {
    title: 'OrderUp',
    description: 'Order Up! is a web-based cooking game designed for elementary school children with communication challenges. The game uses AAC to empower nonverbal children as active game leaders, fostering social interaction and reducing isolation.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/aac-go-fish/',
    website: 'https://bankruptcyassociation.com',
    source: 'https://github.com/Capstone-Projects-2025-Spring/aac-go-fish',
    tags: ['game', 'accessibility', 'aac', 'education'],
    semester: 'Spring 2025',
    slug: 'order-up',
  },
  {
    title: 'Piglet Prep',
    description: 'This website is a child-friendly video platform designed to offer interactive educational content. Videos are enhanced with embedded Multiple Choice Questions (MCQs) and Object Detection (OD) questions to engage children and assess their understanding as they watch. The system allows users to answer MCQs and OD questions based on each video real-time, customize their preference for each video, and allows researchers to review performance analytics.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-piggyback-learning-team-1/',
    website: 'https://piglet-prep.vercel.app',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-piggyback-learning-team-1',
    tags: ['education', 'ml', 'computerVision', 'analytics'],
    semester: 'Spring 2025',
    slug: 'piglet-prep',
    // useDocsAsPreview: true,
  },
  {
    title: 'BioGenie',
    description: 'The Bioinformatics Chatbot is a cutting-edge web application designed to assist bioinformatics researchers with complex problems more efficiently. The application enables users to ask the chatbot questions and receive relevant, accurate answers. Using innovative learning technology and human-like behavior, the chatbot guides the researchers with step-by-step tutorials (answers) for complex bioinformatics questions. The methods provided to the chatbot will serve as the foundation for generating precise responses, enabling users to save time and focus on advancing their research. By harnessing the strength of AI, the web application is transforming how researchers tackle heartfelt problems leading to rapid advancements.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-003-bioinformatics-chatbot/',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-003-bioinformatics-chatbot',
    tags: ['bioinformatics', 'ai', 'llms', 'chatbot'],
    semester: 'Spring 2025',
    slug: 'biogenie',
  },
  {
    title: 'Whiteboard Assistant',
    description: 'WhiteBoardFlow is a tool to help professionals and students entering the development workforce practice whiteboard-style interview questions. It prompts users to reason out solutions through writing and speaking, generates feedback based on answers, and allows attempts with actual code or handwriting dictation.',
    documentation: 'https://capstone-projects-2024-fall.github.io/project-whiteboardflow/',
    website: 'https://project-whiteboardflow-eowa.vercel.app',
    demo: 'https://www.youtube.com/embed/TE_P9Rks8LU?start=1719',
    source: 'https://github.com/Capstone-Projects-2024-Fall/project-whiteboardflow',
    tags: ['education', 'interview-prep', 'web'],
    semester: 'Fall 2024',
    slug: 'whiteboard-assistant',
    // useDocsAsPreview: true
  },
  {
    title: 'BlastPad',
    description: 'The BlastPad is a kid-friendly handheld gaming device and block-based coding suite for creating, playing, and sharing custom games. Built around a Raspberry Pi, it offers an all-in-one solution for learning game development with sensors, buttons, and switches.',
    documentation: 'https://capstone-projects-2024-spring.github.io/project-blastpad/',
    demo: 'https://www.youtube.com/embed/w5BaWx_9U6U?t=3527',
    source: 'https://github.com/Capstone-Projects-2024-Spring/project-blastpad',
    tags: ['gaming', 'education', 'hardware', 'raspberry-pi'],
    semester: 'Spring 2024',
    slug: 'blastpad',
  },
  {
    title: 'SmartSpeech',
    description: 'A project focusing on AAC (augmentative and alternative communication) apps. It proposes a revamp of standard AAC tools, introducing ML drawing recognition for easier word finding and an optional extension using device cameras for word suggestions related to surrounding objects.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-smartspeech/',
    demo: 'https://www.youtube.com/embed/xYrKWJfFlUc?start=3327',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-smartspeech',
    website: 'https://project-smartspeech.vercel.app',
    tags: ['accessibility', 'aac', 'ml', 'pwa'],
    semester: 'Fall 2023',
    useDocsAsPreview: true,
    slug: 'smartspeech',
  },
  {
    title: 'Garden Sensor Array',
    description: 'Aims to assist community gardeners in Philadelphia by providing easily implementable sensors for gardens. These sensors provide information on sunlight, soil moisture, and temperature, helping reduce work hours and fresh food shortages in food-desert areas.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-garden-sensor-array/',
    demo: 'https://www.youtube.com/embed/xYrKWJfFlUc?start=1430',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-garden-sensor-array',
    tags: ['iot', 'sensors', 'community', 'hardware'],
    semester: 'Fall 2023',
    slug: 'garden-sensor-array',
  },
  {
    title: 'Lomo',
    description: 'An app that facilitates in-person gaming using real-time geolocation on a 2D map. Users can create or join gaming "Beacons," specifying game details and preferences, catering to those who prefer physical gaming environments.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/',
    demo: 'https://www.youtube.com/embed/xYrKWJfFlUc?start=176',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app',
    tags: ['gaming', 'geolocation', 'social'],
    semester: 'Fall 2023',
    slug: 'lomo',
  },
  {
    title: 'Code Review Chatbot',
    description: 'This project addresses code review in software development. A chatbot integrated within an IDE conducts preliminary code reviews before peer review, aiming to improve code quality and educate users on effective code review practices.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-code-review-chatbot/',
    demo: 'https://www.youtube.com/embed/Wge6Wd8ctRI?start=2596',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-code-review-chatbot',
    tags: ['ai', 'code-quality', 'vscode-extension', 'education'],
    semester: 'Fall 2023',
    slug: 'code-review-chatbot',
  },
  {
    title: 'ARPetPals',
    description: 'An AR mobile app for both Android and iOS that promotes health and fitness through virtual pets interacting with real-world environments. The pet\'s health correlates with user diet and exercise habits, using object recognition to track nutrition.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-ar-pet-pals/',
    demo: 'https://www.youtube.com/embed/XxRJPMJZ6Fk?start=3823',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-ar-pet-pals',
    tags: ['ar', 'mobile', 'health', 'fitness', 'unity'],
    semester: 'Fall 2023',
    slug: 'ar-pet-pals',
  },
  {
    title: 'Study Buddy',
    description: 'Study Buddy is a progressive web application that helps students keep up with course work using gamification, featuring a virtual pet that you take care of by studying and completing assignments. The app can easily import existing Canvas LMS course assignments.',
    documentation: 'https://capstone-projects-2023-spring.github.io/project-virtual-pet/',
    demo: 'https://www.youtube.com/embed/Xlta-ZZ4gPc',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-virtual-pet',
    tags: ['education', 'gamification', 'pwa', 'canvas-lms'],
    semester: 'Spring 2023',
    slug: 'study-buddy',
  },
  {
    title: 'TUTraffic',
    description: 'TUTraffic is an application that eases traffic and parking troubles on Temple\'s main campus. Using Raspberry Pi computers equipped with cameras, computer vision, and machine learning, it detects available parking spaces in real-time.',
    documentation: 'https://capstone-projects-2023-spring.github.io/project-tutraffic/',
    website: 'https://tutrafficdatabase.web.app',
    demo: 'https://www.youtube.com/embed/s_Vt6rIZhMs',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-tutraffic',
    tags: ['ml', 'computer-vision', 'iot', 'raspberry-pi', 'parking'],
    semester: 'Spring 2023',
    // useDocsAsPreview: true,
    slug: 'tu-traffic',
  },
  {
    title: 'Robocontrol',
    description: 'Robocontrol is a user-friendly interface for the Adeept RaspTank. Enhanced with an "Autonomous" mode, it allows the tank to navigate an obstacle course without human intervention.',
    documentation: 'https://capstone-projects-2023-spring.github.io/project-robocontrol/',
    demo: 'https://www.youtube.com/embed/hJrjVTWIg7o',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-robocontrol',
    tags: ['robotics', 'autonomous', 'hardware', 'raspberry-pi'],
    semester: 'Spring 2023',
    slug: 'robocontrol',
  },
  {
    title: 'Vehicle Collision Automatic Detection',
    description: 'An embedded device with a companion mobile app that provides peace of mind in the event of a car accident. When a severe collision is detected, the app automatically sends calls or text messages to emergency services or pre-set contacts.',
    // documentation: 'https://capstone-projects-2023-spring.github.io/project-vehicle-collision/',
    demo: 'https://www.youtube.com/embed/Wx4h5qCqgfw',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-vehicle-collision-automatic-detection',
    website: 'https://github.com/Capstone-Projects-2023-Spring/project-vehicle-collision-automatic-detection',
    tags: ['iot', 'mobile', 'safety', 'bluetooth', 'embedded'],
    semester: 'Spring 2023',
    slug: 'vehicle-collision-detection',
    useDocsAsPreview: true
  },
  {
    title: 'CollabyBot',
    description: 'CollabyBot is an application for communication and collaboration in Discord. Features real-time GitHub notifications, customizable updates, and Jira integration for tracking team progress and assigning tickets from chat.',
    documentation: 'https://capstone-projects-2022-fall.github.io/project-collabybot/',
    demo: 'https://www.youtube.com/embed/JxB71ua5FB0',
    source: 'https://github.com/Capstone-Projects-2022-Fall/project-collabybot',
    tags: ['discordBot', 'github', 'jira', 'collaboration', 'devops'],
    semester: 'Fall 2022',
    slug: 'collabybot',
  },
  {
    title: 'Sokroban',
    description: 'SOKROBAN is a puzzle game based on the 1982 classic "Sokoban" that challenges users\' problem-solving skills. Move crates on procedurally generated maps and place them on targets. Offers Normal, Challenge, Co-op, and VS modes.',
    documentation: 'https://capstone-projects-2022-fall.github.io/project-sokroban/',
    website: 'https://play.unity.com/mg/other/webgl-builds-281781',
    demo: 'https://www.youtube.com/embed/Do7IXoSzjHU',
    source: 'https://github.com/Capstone-Projects-2022-Fall/project-sokroban',
    tags: ['game', 'puzzle', 'multiplayer', 'unity', 'webgl'],
    semester: 'Fall 2022',
    slug: 'sokroban',
  },
];

// Provide backward-compatible exports used by older components (names like `sortedUsers`).
export const sortedUsers = projects;
export type User = Project;

export default projects;
