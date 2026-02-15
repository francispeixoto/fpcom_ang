import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/cv.models';

@Component({
  selector: 'app-job-entry',
  imports: [CommonModule],
  templateUrl: './job-entry.html',
  styleUrl: './job-entry.css',
})
export class JobEntry {
  @Input() experience!: Experience;
}
