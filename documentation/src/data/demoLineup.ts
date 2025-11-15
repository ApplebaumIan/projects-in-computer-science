import type { Project } from './showcase';

// Demo Lineup data for current presenting projects
// These are projects currently presenting that haven't been added to the showcase yet

export const demoLineupProjects: Project[] = [
  // Section 001 (9:30-10:50am EST)
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
    description: 'CLOVER is an AI-powered coding assistant designed for educational use. It integrates with Visual Studio Code to provide real-time code suggestions, track user interactions, and analyze coding habits. By logging mistakes and offering contextual feedback, it helps novice programmers learn and avoid over-reliance on AI. A dashboard allows users to review their progress and coding behavior, making the assistant both a learning tool and a productivity aid.',
    website: 'https://clover.nickrucinski.com',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-copilot-clone-2/',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-copilot-clone-2',
    demo: 'https://www.youtube.com/watch?v=y990YPLQf2Q&t=725',
    tags: ['ai', 'education', 'vscode-extension', 'research'],
    semester: 'Spring 2025',
    slug: 'clover',
  },
  {
    title: 'OrderUp',
    description: 'Order Up! is a web-based cooking game designed for elementary school children with communication challenges. The game uses AAC to empower nonverbal children as active game leaders, fostering social interaction and reducing isolation.',
    documentation: 'https://capstone-projects-2025-spring.github.io/aac-go-fish/',
    website: 'https://bankruptcyassociation.com',
    source: 'https://github.com/Capstone-Projects-2025-Spring/aac-go-fish',
    demo: 'https://www.youtube.com/watch?v=BDUngO0hlBk&t=781',
    tags: ['game', 'accessibility', 'aac', 'education', 'research'],
    semester: 'Spring 2025',
    slug: 'order-up',
  },
  // Section 002 (12:30-1:50pm EST)
  {
    title: 'Piglet Prep',
    description: 'This website is a child-friendly video platform designed to offer interactive educational content. Videos are enhanced with embedded Multiple Choice Questions (MCQs) and Object Detection (OD) questions to engage children and assess their understanding as they watch. The system allows users to answer MCQs and OD questions based on each video real-time, customize their preference for each video, and allows researchers to review performance analytics.',
    documentation: 'https://capstone-projects-2025-spring.github.io/project-piggyback-learning-team-1/',
    website: 'https://piglet-prep.vercel.app',
    source: 'https://github.com/Capstone-Projects-2025-Spring/project-piggyback-learning-team-1',
    demo: 'https://www.youtube.com/watch?v=BDUngO0hlBk&t=1902',
    tags: ['education', 'ml', 'computer-vision', 'analytics', 'research'],
    semester: 'Spring 2025',
    slug: 'piglet-prep',
  },
  {
    title: 'BioGenie',
    description: 'The Bioinformatics Chatbot is a cutting-edge web application designed to assist bioinformatics researchers with complex problems more efficiently. The application enables users to ask the chatbot questions and receive relevant, accurate answers. Using innovative learning technology and human-like behavior, the chatbot guides the researchers with step-by-step tutorials (answers) for complex bioinformatics questions. The methods provided to the chatbot will serve as the foundation for generating precise responses, enabling users to save time and focus on advancing their research. By harnessing the strength of AI, the web application is transforming how researchers tackle heartfelt problems leading to rapid advancements.',
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
    tags: ['education', 'ai', 'interview-prep', 'web'],
    semester: 'Fall 2024',
    slug: 'whiteboard-assistant',
  },
];

// Sections configuration for demo lineup
export const demoSections = {
  '001': {
    name: 'Section 001',
    time: '9:30-10:50am EST',
    location: 'SERC 306',
    youtubeId: 'y990YPLQf2Q',
    projectSlugs: ['hip-io', 'clover', 'order-up'],
  },
  '002': {
    name: 'Section 002',
    time: '12:30pm to 1:50pm EST',
    location: 'SERC 306',
    youtubeId: 'BDUngO0hlBk',
    projectSlugs: ['piglet-prep', 'biogenie', 'whiteboard-assistant'],
  },
};

