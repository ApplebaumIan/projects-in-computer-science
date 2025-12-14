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
  | 'perl';

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
  tags: (TagType | string)[];
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
    title: 'AACcommodate API',
    description: 'This application programming interface (API) supports AAC games. The API allows users to play AAC games like StoryQuest through external AAC board interaction, rather than relying on an embedded AAC board in the game. Users can relay game inputs by either speaking verbally or speaking through the board. The API will enable audio-controlled games, which will promote social and communication skills in children who use AAC devices by enabling AAC users to play games alongside non-AAC users.',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-001-aac-api',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-001-aac-api/',
    website: 'https://www.npmjs.com/package/aac-voice-api',
    tags: ['aac', 'accessibility', 'games','api', 'communication','library','speech-to-text'],
    semester: 'Fall 2025',
    slug: 'aaccommodate',
    useDocsAsPreview: false,
  },
  {
    title: 'Hip.io',
    description: 'Hip.io is a reimagined online multiplayer version of Hungry Hungry Hippo designed for children who use Augmentative and Alternative Communication (AAC) devices. Unlike traditional games, the AAC user leads gameplay by selecting which foods appear and applying special effects, while other players control hippos to catch the chosen foods. The system uses React for the UI, Phaser for game logic, and a WebSocket server for real-time multiplayer synchronization. The goal is to empower AAC users to direct group play, making fast-paced games more accessible and inclusive.',
    website: 'https://project-acc-hungry-hippos.vercel.app/',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-acc-hungry-hippos',
    demo: 'https://www.youtube.com/watch?v=tA-bBxNLHKY&t=2526',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-acc-hungry-hippos',
    tags: ['game', 'accessibility', 'multiplayer', 'aac', 'research'],
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
    demo: 'https://www.youtube.com/watch?v=y990YPLQf2Q&t=725',
    tags: ['ai', 'education', 'vscode-extension','research'],
    semester: 'Spring 2025',
    slug: 'clover',
  },
  {
    title: 'OrderUp',
    description: 'Order Up! is a web-based cooking game designed for elementary school children with communication challenges. The game uses AAC to empower nonverbal children as active game leaders, fostering social interaction and reducing isolation.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/aac-go-fish/',
    website: 'https://bankruptcyassociation.com',
    source: 'https://github.com/Capstone-Projects-2025-Spring/aac-go-fish',
    demo: 'https://www.youtube.com/watch?v=BDUngO0hlBk&t=781',
    tags: ['game', 'accessibility', 'aac', 'education','research', 'multiplayer'],
    semester: 'Spring 2025',
    slug: 'order-up',
  },
  {
    title: 'Piglet Prep',
    description: 'This website is a child-friendly video platform designed to offer interactive educational content. Videos are enhanced with embedded Multiple Choice Questions (MCQs) and Object Detection (OD) questions to engage children and assess their understanding as they watch. The system allows users to answer MCQs and OD questions based on each video real-time, customize their preference for each video, and allows researchers to review performance analytics.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-piggyback-learning-team-1/',
    website: 'https://piglet-prep.vercel.app',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-piggyback-learning-team-1',
    demo: 'https://www.youtube.com/watch?v=BDUngO0hlBk&t=1902',
    tags: ['education', 'ml', 'computer-vision', 'analytics', 'research','nextjs'],
    semester: 'Spring 2025',
    slug: 'piglet-prep',
    // useDocsAsPreview: true,
  },
  {
    title: 'BioGenie',
    description: 'The Bioinformatics Chatbot is a cutting-edge web application designed to assist bioinformatics researchers with complex problems more efficiently. The application enables users to ask the chatbot questions and receive relevant, accurate answers. Using innovative learning technology and human-like behavior, the chatbot guides the researchers with step-by-step tutorials (answers) for complex bioinformatics questions. The methods provided to the chatbot will serve as the foundation for generating precise responses, enabling users to save time and focus on advancing their research. By harnessing the strength of AI, the web application is transforming how researchers tackle heartfelt problems leading to rapid advancements.\n',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-003-bioinformatics-chatbot/',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-003-bioinformatics-chatbot',
    tags: ['bioinformatics', 'ai', 'llms', 'chatbot', 'research'],
    demo: 'https://www.youtube.com/watch?v=j1K0Ypl_iDk&t=5325',
    semester: 'Spring 2025',
    slug: 'biogenie',
  },
  {
    title: 'Whiteboard Assistant',
    description: 'WhiteBoardFlow is a tool to help professionals and students entering the development workforce practice whiteboard-style interview questions. It prompts users to reason out solutions through writing and speaking, generates feedback based on answers, and allows attempts with actual code or handwriting dictation.',
    documentation: 'https://capstone-projects-2024-fall.github.io/project-whiteboardflow/',
    website: 'https://project-whiteboardflow-eowa.vercel.app',
    demo: 'https://www.youtube.com/watch?v=TE_P9Rks8LU&t=1719',
    source: 'https://github.com/Capstone-Projects-2024-Fall/project-whiteboardflow',
    tags: ['education','ai', 'interview-prep', 'web','pwa'],
    semester: 'Fall 2024',
    slug: 'whiteboard-assistant',
    // useDocsAsPreview: true
  },
  {
    title: 'BlastPad',
    description: 'The BlastPad is a kid-friendly handheld gaming device and block-based coding suite for creating, playing, and sharing custom games. Built around a Raspberry Pi, it offers an all-in-one solution for learning game development with sensors, buttons, and switches.',
    documentation: 'https://capstone-projects-2024-spring.github.io/project-blastpad/',
    demo: 'https://www.youtube.com/watch?v=w5BaWx_9U6U&t=3527',
    source: 'https://github.com/Capstone-Projects-2024-Spring/project-blastpad',
    tags: ['gaming', 'education', 'hardware', 'raspberry-pi', 'embedded','pwa'],
    semester: 'Spring 2024',
    slug: 'blastpad',
  },
  {
    title: 'Wildlife Odyssey',
    description: 'This project is a cooperative 2D platforming game with RPG-style progression, built in Unity using Alteruna Multiplayer. Players join or create online lobbies, choose from a roster of characters—each with unique attacks and stat distributions—and work together to fight enemies and advance through levels. As the party defeats enemies, the group level increases, allowing each character to improve their stats and unlock new attacks. Players can customize their movesets by choosing which attacks to equip and assigning directional inputs to them. Attacks can also be upgraded for more power and efficiency. While players are free to explore levels independently, they can warp back to teammates if needed. Menus such as move selection or control rebinding are player-specific and do not pause gameplay for others, though indicators show when someone is in a menu. Players cannot damage each other, but all can damage enemies. The game blends fast-paced platform fighter mechanics (similar to Super Smash Bros. or Kirby) with RPG progression systems (similar to Pokémon or Xenoblade Chronicles), creating a customizable and cooperative action experience.',
    documentation: 'https://capstone-projects-2024-spring.github.io/project-rpg-elements-game/',
    source: 'https://github.com/Capstone-Projects-2024-Spring/project-rpg-elements-game/',
    semester: 'Spring 2024',
    slug: 'wildlife-odyssey',
    tags: ['game', 'multiplayer', 'unity','csharp', "matlab"],
  },
  {
    title: 'SmartSpeech',
    description: 'A project focusing on AAC (augmentative and alternative communication) apps. It proposes a revamp of standard AAC tools, introducing ML drawing recognition for easier word finding and an optional extension using device cameras for word suggestions related to surrounding objects.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-smartspeech/',
    demo: 'https://www.youtube.com/watch?v=xYrKWJfFlUc&t=3327',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-smartspeech',
    website: 'https://project-smartspeech.vercel.app',
    tags: ['accessibility', 'aac', 'ml', 'pwa','nextjs'],
    semester: 'Fall 2023',
    useDocsAsPreview: true,
    slug: 'smartspeech',
  },
  {
    title: 'Garden Sensor Array',
    description: 'Aims to assist community gardeners in Philadelphia by providing easily implementable sensors for gardens. These sensors provide information on sunlight, soil moisture, and temperature, helping reduce work hours and fresh food shortages in food-desert areas.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-garden-sensor-array/',
    demo: 'https://www.youtube.com/watch?v=xYrKWJfFlUc&t=1430',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-garden-sensor-array',
    tags: ['iot', 'sensors', 'community', 'hardware', 'raspberry-pi', 'embedded','bluetooth'],
    semester: 'Fall 2023',
    slug: 'garden-sensor-array',
  },
  {
    title: 'Lomo',
    description: 'An app that facilitates in-person gaming using real-time geolocation on a 2D map. Users can create or join gaming "Beacons," specifying game details and preferences, catering to those who prefer physical gaming environments.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/',
    website: 'https://lomogaming.netlify.app/',
    demo: 'https://www.youtube.com/watch?v=xYrKWJfFlUc&t=176',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app',
    tags: ['gaming', 'geolocation', 'social','pwa','laravel'],
    semester: 'Fall 2023',
    slug: 'lomo',
  },
  {
    title: 'Code Review Chatbot',
    description: 'This project addresses code review in software development. A chatbot integrated within an IDE conducts preliminary code reviews before peer review, aiming to improve code quality and educate users on effective code review practices.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-code-review-chatbot/',
    demo: 'https://www.youtube.com/watch?v=Wge6Wd8ctRI&t=2596',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-code-review-chatbot',
    tags: ['ai', 'code-quality', 'vscode-extension', 'education','laravel'],
    semester: 'Fall 2023',
    slug: 'code-review-chatbot',
  },
  {
    title: 'ARPetPals',
    description: 'An AR mobile app for both Android and iOS that promotes health and fitness through virtual pets interacting with real-world environments. The pet\'s health correlates with user diet and exercise habits, using object recognition to track nutrition.',
    documentation: 'https://capstone-projects-2023-fall.github.io/project-ar-pet-pals/',
    demo: 'https://www.youtube.com/watch?v=XxRJPMJZ6Fk&t=3823',
    source: 'https://github.com/Capstone-Projects-2023-Fall/project-ar-pet-pals',
    tags: ['virtual-pet','ar', 'mobile', 'health', 'fitness', 'unity','gamification'],
    semester: 'Fall 2023',
    slug: 'ar-pet-pals',
  },
  {
    title: 'Study Buddy',
    description: 'Study Buddy is a progressive web application that helps students keep up with course work using gamification, featuring a virtual pet that you take care of by studying and completing assignments. The app can easily import existing Canvas LMS course assignments.',
    documentation: 'https://capstone-projects-2023-spring.github.io/project-virtual-pet/',
    demo: 'https://www.youtube.com/watch?v=Xlta-ZZ4gPc',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-virtual-pet',
    website: 'https://studybuddy.life/',
    tags: ['virtual-pet','education', 'gamification', 'pwa', 'canvas-lms','react','django','sqlite'],
    semester: 'Spring 2023',
    slug: 'study-buddy',
  },
  {
    title: 'TUTraffic',
    description: 'TUTraffic is an application that eases traffic and parking troubles on Temple\'s main campus. Using Raspberry Pi computers equipped with cameras, computer vision, and machine learning, it detects available parking spaces in real-time.',
    documentation: 'https://capstone-projects-2023-spring.github.io/project-tutraffic/',
    website: 'https://tutrafficdatabase.web.app',
    demo: 'https://www.youtube.com/watch?v=s_Vt6rIZhMs',
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
    demo: 'https://www.youtube.com/watch?v=hJrjVTWIg7o',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-robocontrol',
    tags: ['robotics', 'autonomous', 'hardware', 'raspberry-pi'],
    semester: 'Spring 2023',
    slug: 'robocontrol',
  },
  {
    title: 'Vehicle Collision Automatic Detection',
    description: 'An embedded device with a companion mobile app that provides peace of mind in the event of a car accident. When a severe collision is detected, the app automatically sends calls or text messages to emergency services or pre-set contacts.',
    // documentation: 'https://capstone-projects-2023-spring.github.io/project-vehicle-collision/',
    demo: 'https://www.youtube.com/watch?v=Wx4h5qCqgfw',
    source: 'https://github.com/Capstone-Projects-2023-Spring/project-vehicle-collision-automatic-detection',
    website: 'https://github.com/Capstone-Projects-2023-Spring/project-vehicle-collision-automatic-detection',
    tags: ['iot', 'mobile', 'safety', 'bluetooth', 'embedded','hardware'],
    semester: 'Spring 2023',
    slug: 'vehicle-collision-detection',
    useDocsAsPreview: true
  },
  {
    title: 'CollabyBot',
    description: 'CollabyBot is an application for communication and collaboration in Discord. Features real-time GitHub notifications, customizable updates, and Jira integration for tracking team progress and assigning tickets from chat.',
    documentation: 'https://capstone-projects-2022-fall.github.io/project-collabybot/',
    demo: 'https://www.youtube.com/watch?v=JxB71ua5FB0',
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
    demo: 'https://www.youtube.com/watch?v=Do7IXoSzjHU',
    source: 'https://github.com/Capstone-Projects-2022-Fall/project-sokroban',
    tags: ['game', 'puzzle', 'multiplayer', 'unity', 'webgl'],
    semester: 'Fall 2022',
    slug: 'sokroban',
  },

];

// Import generated language mapping (slug -> language tag array)
// This file is produced at build time by scripts/fetch-showcase-languages.js
// Using require to avoid TS2732 without resolveJsonModule
// eslint-disable-next-line @typescript-eslint/no-var-requires
const languagesMapping: Record<string, string[]> = require('./showcaseLanguages.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const categoryHints: Record<string, string[]> = require('./showcaseCategoryHints.json');

function mergeLanguageTags(proj: Project): Project {
  try {
    const langs: string[] | undefined = (languagesMapping as any)[proj.slug ?? ''];
    const cats: string[] | undefined = (categoryHints as any)[proj.slug ?? ''];
    const addable = (arr?: string[]) => Array.isArray(arr) ? arr.map((l) => l.toLowerCase()).filter((l) => (Tags as any)[l]) : [];
    const validLangTags = addable(langs);
    const validCatTags = addable(cats);
    if (validLangTags.length === 0 && validCatTags.length === 0) return proj;
    const merged = Array.from(new Set([...(proj.tags || []), ...validLangTags, ...validCatTags]));
    return { ...proj, tags: merged };
  } catch (e) {
    return proj;
  }
}

const enrichedProjects: Project[] = projects.map(mergeLanguageTags);

// Provide backward-compatible exports used by older components (names like `sortedUsers`).
export const sortedUsers = enrichedProjects;
export type User = Project;

export default enrichedProjects;
