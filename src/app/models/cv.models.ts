export interface Position {
  title: string;
  period: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  logo: string | null;
  logoText?: string;
  positions: Position[];
  description: string;
  responsibilities: string[];
  projects: Project[];
}

export interface ProfileData {
  name: string;
  email: string;
  linkedin: string;
  phone: string;
  summary: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon?: string;
}
