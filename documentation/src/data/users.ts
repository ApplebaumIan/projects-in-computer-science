// filepath: documentation/src/data/users.ts
// Minimal users data and types required by the showcase components.

export type TagType = 'favorite' | 'opensource' | 'react' | 'tooling' | 'education';

export const TagList: TagType[] = ['favorite', 'opensource', 'react', 'tooling', 'education'];

export const Tags: Record<TagType, {label: string; description: string; color: string}> = {
  favorite: {label: 'Favorite', description: 'Personal favorite sites', color: '#ffb020'},
  opensource: {label: 'Open Source', description: 'Open source project', color: '#007acc'},
  react: {label: 'React', description: 'Built with React', color: '#61dafb'},
  tooling: {label: 'Tooling', description: 'Developer tooling', color: '#0f62fe'},
  education: {label: 'Education', description: 'Educational project or tutorial', color: '#3ddc84'},
};

export type User = {
  title: string;
  description: string;
  website: string;
  source?: string;
  tags: TagType[];
  preview?: string;
};

// A very small example list so the showcase renders. Modify or replace with real data as needed.
export const sortedUsers: User[] = [
  {
    title: 'Example Favorite',
    description: 'An example favorite site used for the showcase.',
    website: 'https://example.com',
    source: 'https://github.com/example/repo',
    tags: ['favorite', 'opensource'],
  },
];

