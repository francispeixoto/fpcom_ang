import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  type: string;
  icon: [string, string];
  label: string;
  url: string;
  target?: string;
}

export interface HeaderContent {
  title: string;
  contacts: Contact[];
}

export interface HeroContent {
  summary: string;
}

export interface Feature {
  icon: [string, string];
  title: string;
  description: string;
  alignment: 'left' | 'right';
}

export interface FeaturesContent {
  features: Feature[];
}

export interface Position {
  title: string;
  period: string;
}

export interface NotableProject {
  name: string;
  description: string;
}

export interface Experience {
  logo?: string;
  logoText?: string;
  company: string;
  positions: Position[];
  description?: string;
  responsibilities?: string[];
  notableProjects?: NotableProject[];
  roles?: {
    title: string;
    responsibilities: string[];
    notableProjects?: NotableProject[];
  }[];
}

export interface ExperiencesContent {
  currentPosition: Experience & {
    sectionTitle: string;
  };
  pastExperiences: {
    sectionTitle: string;
    experiences: Experience[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly contentBasePath = '/content';

  constructor(private http: HttpClient) {}

  getHeader(): Observable<HeaderContent> {
    return this.http.get<HeaderContent>(`${this.contentBasePath}/header.json`);
  }

  getHero(): Observable<HeroContent> {
    return this.http.get<HeroContent>(`${this.contentBasePath}/hero.json`);
  }

  getFeatures(): Observable<FeaturesContent> {
    return this.http.get<FeaturesContent>(`${this.contentBasePath}/features.json`);
  }

  getExperiences(): Observable<ExperiencesContent> {
    return this.http.get<ExperiencesContent>(`${this.contentBasePath}/experiences.json`);
  }
}
