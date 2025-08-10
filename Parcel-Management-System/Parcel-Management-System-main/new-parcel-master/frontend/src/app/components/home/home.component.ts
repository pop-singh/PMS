import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Express Parcel</h1>
          <p class="hero-subtitle">
            Fast, reliable, and secure parcel delivery services at your fingertips
          </p>
          <div class="hero-buttons">
            <button class="btn btn-primary hero-button" (click)="navigateToRegister()">
              <mat-icon>person_add</mat-icon>
              Get Started
            </button>
            <button class="btn btn-secondary hero-button" (click)="navigateToLogin()">
              <mat-icon>login</mat-icon>
              Login
            </button>
          </div>
        </div>
        <div class="hero-image">
          <div class="delivery-illustration">
            <mat-icon class="delivery-icon">local_shipping</mat-icon>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2 class="section-title">Our Services</h2>
        <div class="features-grid">
          <div class="card feature-card">
            <div class="card-header">
              <mat-icon>schedule</mat-icon>
              <h3>Express Delivery</h3>
            </div>
            <div class="card-body">
              <p>Fast and reliable delivery within 24 hours to your doorstep.</p>
            </div>
          </div>

          <div class="card feature-card">
            <div class="card-header">
              <mat-icon>track_changes</mat-icon>
              <h3>Real-time Tracking</h3>
            </div>
            <div class="card-body">
              <p>Track your parcels in real-time with our advanced tracking system.</p>
            </div>
          </div>

          <div class="card feature-card">
            <div class="card-header">
              <mat-icon>security</mat-icon>
              <h3>Secure Handling</h3>
            </div>
            <div class="card-body">
              <p>Your parcels are handled with utmost care and security.</p>
            </div>
          </div>

          <div class="card feature-card">
            <div class="card-header">
              <mat-icon>payment</mat-icon>
              <h3>Easy Payment</h3>
            </div>
            <div class="card-body">
              <p>Multiple payment options for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works-section">
        <h2 class="section-title">How It Works</h2>
        <div class="steps-container">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Register & Login</h3>
            <p>Create your account and login to access our services</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Book Your Parcel</h3>
            <p>Fill in the details and book your parcel for delivery</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Track & Monitor</h3>
            <p>Track your parcel's journey in real-time</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>Receive Delivery</h3>
            <p>Get your parcel delivered safely to your doorstep</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers who trust us with their deliveries</p>
          <button class="btn btn-primary cta-button" (click)="navigateToRegister()">
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: #fafafa;
    }

    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 80px 24px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 60vh;
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
    }

    .hero-title {
      font-size: var(--font-size-4xl);
      font-weight: 700;
      color: #1f2937;
      margin-bottom: var(--space-lg);
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: var(--font-size-xl);
      color: #6b7280;
      margin-bottom: var(--space-2xl);
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: var(--space-md);
      flex-wrap: wrap;
    }

    .hero-button {
      padding: var(--space-md) var(--space-lg);
      font-size: var(--font-size-lg);
    }

    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .delivery-illustration {
      width: 300px;
      height: 300px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .delivery-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #0891b2;
    }

    .features-section {
      padding: var(--space-3xl) var(--space-lg);
      background: var(--background-primary);
    }

    .section-title {
      text-align: center;
      font-size: var(--font-size-3xl);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-2xl);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-xl);
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      text-align: center;
      padding: var(--space-xl);
      transition: transform var(--transition-normal);
    }

    .feature-card:hover {
      transform: translateY(-8px);
    }

    .how-it-works-section {
      padding: 80px 24px;
      background: #ffffff;
    }

    .steps-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .step {
      text-align: center;
      padding: 32px;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 auto 20px;
    }

    .step h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .step p {
      color: #666;
      line-height: 1.6;
    }

    .cta-section {
      padding: 80px 24px;
      background: var(--primary-color);
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 600;
      color: white;
      margin-bottom: 20px;
    }

    .cta-content p {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 40px;
    }

    .cta-button {
      padding: 16px 32px;
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 16px;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-buttons {
        justify-content: center;
      }

      .delivery-illustration {
        width: 200px;
        height: 200px;
        margin-top: 40px;
      }

      .delivery-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
      }

      .section-title {
        font-size: 2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .steps-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
} 