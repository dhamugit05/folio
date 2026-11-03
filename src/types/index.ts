export type ThemeMode = 'dark' | 'light';

export interface ProjectCaseStudy {
  challenge: string;
  architecture: string;
  impact: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Frontend' | 'Full Stack' | '3D & AI';
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: ProjectCaseStudy;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Array<{
    name: string;
    level: string;
    note: string;
  }>;
}

export interface OwnerProfile {
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  photoUrl: string;
  availability: string;
}

export interface CustomCursorState {
  variant: 'default' | 'hover' | 'project' | 'drag' | 'text';
  text?: string;
}
