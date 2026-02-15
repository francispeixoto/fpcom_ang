import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Experience } from '../models/cv.models';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<string> {
    return this.http.get('assets/cv-data/profile.md', { responseType: 'text' });
  }

  getSkills(): Observable<string> {
    return this.http.get('assets/cv-data/skills.md', { responseType: 'text' });
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>('assets/cv-data/experience.json');
  }
}
