import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/cv.models';

@Component({
  selector: 'app-job-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-entry.html',
  styleUrl: './job-entry.css',
})
export class JobEntryComponent {
  @Input() experience!: Experience;
}

