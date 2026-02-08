import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService, HeaderContent, HeroContent, FeaturesContent } from '../content.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container p-8 bg-gray-100 min-h-screen">
      <h1 class="text-4xl font-bold mb-8">Content Management System</h1>

      <div class="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-semibold mb-4">Header Content</h2>
        <div *ngIf="header">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Title:</label>
            <input [(ngModel)]="header.title" class="w-full p-2 border rounded" />
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">Contacts</h3>
            <div *ngFor="let contact of header.contacts; let i = index" class="mb-4 p-4 border rounded">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Label:</label>
                  <input [(ngModel)]="contact.label" class="w-full p-2 border rounded" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">URL:</label>
                  <input [(ngModel)]="contact.url" class="w-full p-2 border rounded" />
                </div>
              </div>
            </div>
          </div>

          <button (click)="saveHeader()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Header
          </button>
        </div>
      </div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-semibold mb-4">Hero Content</h2>
        <div *ngIf="hero">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Summary:</label>
            <textarea [(ngModel)]="hero.summary" rows="4" class="w-full p-2 border rounded"></textarea>
          </div>

          <button (click)="saveHero()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Hero
          </button>
        </div>
      </div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-semibold mb-4">Features</h2>
        <div *ngIf="features">
          <div *ngFor="let feature of features.features; let i = index" class="mb-6 p-4 border rounded">
            <h3 class="text-lg font-semibold mb-3">Feature {{ i + 1 }}</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Title:</label>
                <input [(ngModel)]="feature.title" class="w-full p-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Alignment:</label>
                <select [(ngModel)]="feature.alignment" class="w-full p-2 border rounded">
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium mb-1">Description:</label>
              <textarea [(ngModel)]="feature.description" rows="3" class="w-full p-2 border rounded"></textarea>
            </div>
          </div>

          <button (click)="saveFeatures()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Features
          </button>
        </div>
      </div>

      <div class="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <h3 class="text-lg font-semibold mb-2">⚠️ Development Mode Only</h3>
        <p class="text-sm text-gray-700">
          This admin interface is only available in development mode and will not be included in production builds.
          Changes made here update the JSON files in the <code class="px-1 bg-gray-200 rounded">src/content</code> directory.
        </p>
        <p class="text-sm text-gray-700 mt-2">
          <strong>Note:</strong> Currently, this admin interface displays content but saving requires a backend API.
          For now, edit the JSON files in <code class="px-1 bg-gray-200 rounded">src/content/</code> directly.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      font-family: system-ui, -apple-system, sans-serif;
    }
  `]
})
export class AdminComponent implements OnInit {
  header?: HeaderContent;
  hero?: HeroContent;
  features?: FeaturesContent;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getHeader().subscribe(data => this.header = data);
    this.contentService.getHero().subscribe(data => this.hero = data);
    this.contentService.getFeatures().subscribe(data => this.features = data);
  }

  saveHeader(): void {
    console.log('Save Header:', this.header);
    alert('Header content logged to console. To persist changes, edit src/content/header.json directly.');
  }

  saveHero(): void {
    console.log('Save Hero:', this.hero);
    alert('Hero content logged to console. To persist changes, edit src/content/hero.json directly.');
  }

  saveFeatures(): void {
    console.log('Save Features:', this.features);
    alert('Features content logged to console. To persist changes, edit src/content/features.json directly.');
  }
}
