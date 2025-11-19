import {Tags, type Project} from './showcase';

// Demo Lineup data for current presenting projects
// These are projects currently presenting that haven't been added to the showcase yet

export const demoLineupProjects: Project[] = [
  // Section 001 (9:30-10:50am EST)
  {
    title: 'Collaborative Agent',
    description: 'CollabAgent is a VS Code extension built to make team collaboration easier. Whether you\'re a beginner working on your first group project or a professional developer on a team assignment, CollabAgent uses AI to help you coordinate better with your teammates. The extension automatically tracks what everyone is working on by taking snapshots of local changes and displaying them in a shared timeline with AI-generated summaries. It can suggest which team member should work on which Jira tasks based on their user profile, and it lets you manage Jira tasks without leaving your editor. If you\'ve ever struggled to keep track of what your team is doing or felt out of sync with your project, CollabAgent helps solve that problem.',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-collabagent01/',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-collabagent01',
    tags: ['ai', 'vscode-extension', 'education', 'collaboration','jira', 'productivity'],
    semester: 'Fall 2025',
    slug: 'collaborative-agent-01',
  },
  {
    title: 'Sketch To Screen',
    description: 'Sketch2Screen is an AI-powered collaborative web application that transforms hand-drawn sketches into functional UI components and production-ready code. The application enables individuals, including those without programming expertise, to convert their design ideas into working website components through simple sketches. Users can collaborate in real-time, sketching interface elements that the system converts into structured UI components with the assistance of a Large Language Model (LLM). These components can then be refined, arranged into complete layouts, and exported as code in multiple frameworks (HTML/CSS, React, Vue, etc.). The primary purpose of the application is to empower non-programmers to create websites using their imagination and minimal coding knowledge, thereby lowering the barrier to entry for web development.',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-001-sketch2screen',
    website: 'https://sketchtoscreen.onrender.com/',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-001-sketch2screen/',
    tags: ['ai', 'web-development', 'collaboration', 'llm'],
    semester: 'Fall 2025',
    slug: 'sketch-to-screen-01',
    useDocsAsPreview: true,
  },
  {
    title: 'AACcommodate API',
    description: 'This application programming interface (API) supports AAC games. The API allows users to play AAC games like StoryQuest through external AAC board interaction, rather than relying on an embedded AAC board in the game. Users can relay game inputs by either speaking verbally or speaking through the board. The API will enable audio-controlled games, which will promote social and communication skills in children who use AAC devices by enabling AAC users to play games alongside non-AAC users.',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-001-aac-api',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-001-aac-api/',
    website: 'https://www.npmjs.com/package/aac-voice-api',
    tags: ['aac', 'accessibility', 'games','api', 'communication','library','speech-to-text'],
    semester: 'Fall 2025',
    slug: 'aaccommodate-api-01',
    useDocsAsPreview: false,
  },
  {
    title: 'AI Collab Agent',
    description: 'Effective collaboration is a fundamental aspect of modern software development, yet student teams often struggle with organizing responsibilities, maintaining communication, and aligning on project goals. While version control systems like GitHub and collaboration tools like Live Share make it easier to code together, they don\'t solve the deeper challenges of task distribution, team coordination, or shared understanding of project requirements. To address these gaps, this project introduces a VS Code extension that combines real-time collaboration with AI-driven task management and feedback. The extension enables users to form teams, define project goals, and receive automated task assignments based on individual skills and learning objectives. Throughout the development process, an AI agent provides real-time coding feedback and synthesizes team input to offer high-level project guidance.By integrating these features directly into the coding environment, this tool aims to streamline collaborative development for students, promote more efficient teamwork, and enhance the overall learning experience.',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-002-ai-collaborative-agent',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-002-ai-collaborative-agent/',
    tags: ['ai', 'vscode-extension', 'education', 'collaboration','productivity'],
    semester: 'Fall 2025',
    slug: 'ai-collab-agent-02',
  },
  {
    title: 'AAC API',
    description: 'Augmentative and Alternative Communcation (AAC) refers to any tools, strategies, or devices that help people communicate to others when they have difficulties speaking. They can include simple tools like picture boards to high tech devies like a tablet or an app.\n' +
        '\n' +
        'An AAC Board, which is what the project is primarily targeting as the main device for our API, is a visual interface with images, words, or symbols that can represent basic phrases or ideas, which the user can select items on a board, which is then spoken out aloud by the device.\n' +
        '\n' +
        'This project implements a Speech-to-Text API designed for use with AAC systmes. The API receives an audio file (such as a spoken message or sound recording), processes it through a Python-base speech recognizer, and returns a JSON response contaning the recognized text, metadata, and error information in order for game developers developing AAC based games to map the returned response to a game input',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-002-aac-api',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-002-aac-api/tic-tac-toe',
    tags: ['aac', 'accessibility', 'games','api', 'communication','library','speech-to-text'],
    semester: 'Fall 2025',
    slug: 'aac-api-02',
    useDocsAsPreview: false,
  },
  {
    title: 'AAC Highlighting',
    description: 'This application aims to replicate the intelligent text prediction found within smartphones into an AAC device. The application will use methods of highlighting to direct the attention of the user of the AAC device. This includes primarily the use of different levels of opacity to draw more attention to specific words that are relevant to the context of conversation. The application will allow the user to use the device\'s microphone to listen to conversations and highlight relevant words to choose from that best fit the context. The goal of this application is to give the user a more efficient time to engage in conversation with others using an AAC device, while not limiting or overloading them with word options to choose from.',
    source: 'https://github.com/Capstone-Projects-2025-Fall/project-002-highlighting',
    documentation: 'https://capstone-projects-2025-fall.github.io/project-002-highlighting/',
    website: 'https://smartspeech.vercel.app/',
    tags: ['aac', 'accessibility', 'communication','ai','ml',],
    semester: 'Fall 2025',
    slug: 'aac-highlighting-02',
    useDocsAsPreview: false,
  }

];

// Inject language tags (generated at build time) for demo lineup projects
import languagesMapping from './showcaseLanguages.json';
for (const proj of demoLineupProjects) {
  try {
    const langs: string[] | undefined = (languagesMapping as any)[proj.slug];
    if (!langs || !Array.isArray(langs) || !langs.length) continue;
    const validLangs = langs.filter(l => (Tags as any)[l]);
    if (!validLangs.length) continue;
    proj.tags = Array.from(new Set([...(proj.tags || []), ...validLangs]));
  } catch (e) {
    // swallow enrichment errors
  }
}

// Sections configuration for demo lineup
export const demoSections = {
  '001': {
    name: 'Section 001',
    time: '9:30-10:50am EST',
    location: 'SERC 306',
    youtubeId: 'y990YPLQf2Q',
    projectSlugs: ['collaborative-agent-01','sketch-to-screen-01', 'aaccommodate-api-01'],
  },
  '002': {
    name: 'Section 002',
    time: '2:00pm to 3:20pm EST',
    location: 'SERC 306',
    youtubeId: 'BDUngO0hlBk',
    projectSlugs: ['ai-collab-agent-02','aac-api-02', 'aac-highlighting-02'],
  },
};
