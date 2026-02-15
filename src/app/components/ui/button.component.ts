import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClasses"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 disabled:bg-gray-400',
      secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-100 focus:ring-gray-900 disabled:border-gray-400 disabled:text-gray-400',
      ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-900 disabled:text-gray-400'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass} ${disabledClass}`;
  }

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
