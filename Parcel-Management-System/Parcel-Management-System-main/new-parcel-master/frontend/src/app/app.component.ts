import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * Main Application Component
 * 
 * This is the root component of our Angular application. It serves as the main
 * container for the entire application and provides the basic structure.
 * 
 * Key Concepts:
 * - @Component: Angular decorator that marks this class as a component
 * - selector: The HTML tag name used to include this component in templates
 * - standalone: Modern Angular feature that makes components self-contained
 * - imports: Other modules/components this component depends on
 * - template: The HTML template for this component (inline in this case)
 * - styles: CSS styles specific to this component
 * 
 * Component Responsibilities:
 * 1. Provide the main application container
 * 2. Include the router outlet for navigation
 * 3. Apply global styling (gradient background)
 * 4. Import necessary modules for the application
 */
@Component({
  // HTML tag name: <app-root></app-root>
  selector: 'app-root',
  
  // Standalone component (doesn't need to be declared in a module)
  standalone: true,
  
  // Import required modules and components
  imports: [
    CommonModule,        // Provides common directives like *ngIf, *ngFor
    RouterOutlet         // Displays the current route's component
  ],
  
  // Inline HTML template
  template: `
    <div class="app-container">
      <!-- Router outlet displays the component for the current route -->
      <router-outlet></router-outlet>
    </div>
  `,
  
  // Inline CSS styles
  styles: [`
    .app-container {
      min-height: 100vh;  /* Full viewport height */
      background: var(--background-secondary);
    }
  `]
})
export class AppComponent {
  /**
   * Application title
   * Used for browser tab title and other display purposes
   */
  title = 'Express Parcel';
} 