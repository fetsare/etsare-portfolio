export interface Project {
  name: string;
  description: string;
  image?: string;
  video?: string;
  link?: string;
  github?: string;
  demo?: string;
  tags?: string[];
}

export type Section = "Projects" | "Photography";