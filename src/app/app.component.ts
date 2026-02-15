import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Navigation } from './components/navigation/navigation';
import { JobEntry } from './components/job-entry/job-entry';
import { CvDataService } from './services/cv-data.service';
import { Experience } from './models/cv.models';
import { marked } from 'marked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FontAwesomeModule, Navigation, JobEntry]
})
export class AppComponent implements OnInit {
  profileHtml = '';
  skillsHtml = '';
  experiences: Experience[] = [];
  currentExperiences: Experience[] = [];
  pastExperiences: Experience[] = [];

  constructor(private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getProfile().subscribe(md => {
      this.profileHtml = marked.parse(md) as string;
    });

    this.cvDataService.getSkills().subscribe(md => {
      this.skillsHtml = marked.parse(md) as string;
    });

    this.cvDataService.getExperience().subscribe(experiences => {
      this.experiences = experiences;
      this.currentExperiences = experiences.filter(exp => exp.id === 'exo-current');
      this.pastExperiences = experiences.filter(exp => exp.id !== 'exo-current');
    });
  }
}
