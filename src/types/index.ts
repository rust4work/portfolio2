export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
}

export interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  image: string;
  description: string;
}
