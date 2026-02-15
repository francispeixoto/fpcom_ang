import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../ui/button.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class NavigationComponent {
  @Input() title = 'Francis Peixoto';
  @Input() showPrintButton = true;

  print(): void {
    window.print();
  }
}

