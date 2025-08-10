import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <nav class="navbar" [class.navbar-landing]="type === 'landing'">
      <div class="navbar-container">
        <!-- Brand Section -->
        <div class="brand-section">
          <div class="brand-logo" aria-hidden="true">🚚</div>
          <div class="brand-text">
            <h1 class="brand-title">{{ getBrandTitle() }}</h1>
            <p class="brand-subtitle" *ngIf="type === 'landing'">Delivering excellence worldwide</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-links" *ngIf="type === 'landing'">
          <a (click)="scrollToFeatures()" class="nav-link">
            <span class="icon" aria-hidden="true">⭐</span>
            <span>Features</span>
          </a>
          <a (click)="scrollToServices()" class="nav-link">
            <span class="icon" aria-hidden="true">🚚</span>
            <span>Services</span>
          </a>
          <a (click)="scrollToAbout()" class="nav-link">
            <span class="icon" aria-hidden="true">ℹ️</span>
            <span>About</span>
          </a>
          <a (click)="scrollToContact()" class="nav-link">
            <span class="icon" aria-hidden="true">📞</span>
            <span>Contact</span>
          </a>
        </div>
      
        <!-- Customer Navigation -->
        <div class="nav-links" *ngIf="type === 'customer'">
          <a routerLink="/customer/dashboard" class="nav-link">
            <span class="icon" aria-hidden="true">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/customer/booking" class="nav-link">
            <span class="icon" aria-hidden="true">✚</span>
            <span>New Booking</span>
          </a>
          <a routerLink="/customer/tracking" class="nav-link">
            <span class="icon" aria-hidden="true">📍</span>
            <span>Track Package</span>
          </a>
          <a routerLink="/customer/previous-bookings" class="nav-link">
            <span class="icon" aria-hidden="true">🕘</span>
            <span>My Bookings</span>
          </a>
        </div>

        <!-- Officer Navigation -->
        <div class="nav-links" *ngIf="type === 'officer'">
          <a routerLink="/officer/dashboard" class="nav-link">
            <span class="icon" aria-hidden="true">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/officer/booking" class="nav-link">
            <span class="icon" aria-hidden="true">✚</span>
            <span>Create Booking</span>
          </a>
          <a routerLink="/officer/all-bookings" class="nav-link">
            <span class="icon" aria-hidden="true">📄</span>
            <span>All Bookings</span>
          </a>
          <a routerLink="/officer/tracking" class="nav-link">
            <span class="icon" aria-hidden="true">📍</span>
            <span>Track Package</span>
          </a>
          <a routerLink="/officer/pickup-scheduling" class="nav-link">
            <span class="icon" aria-hidden="true">🗓️</span>
            <span>Schedule Pickup</span>
          </a>
          <a routerLink="/officer/delivery-status" class="nav-link">
            <span class="icon" aria-hidden="true">🔄</span>
            <span>Update Status</span>
          </a>
        </div>

        <!-- Auth Buttons -->
        <div class="auth-buttons" *ngIf="type === 'landing'">
          <button class="btn btn-secondary" (click)="navigateToLogin()">
            <span class="icon" aria-hidden="true">🔑</span>
            Sign In
          </button>
          <button class="btn btn-primary" (click)="navigateToRegister()">
            <span class="icon" aria-hidden="true">➕</span>
            Sign Up
          </button>
        </div>

        <!-- User Menu -->
        <div class="user-menu" *ngIf="type !== 'landing'">
          <div class="user-info" *ngIf="currentUser" (click)="toggleUserMenu()">
            <div class="user-avatar" aria-hidden="true">👤</div>
            <div class="user-details">
              <div class="user-name">{{ currentUser.customerName || currentUser.officerName }}</div>
              <div class="user-role">{{ currentUser.role }}</div>
            </div>
            <span class="dropdown-icon" [class.rotated]="isUserMenuOpen" aria-hidden="true">▾</span>
          </div>

          <!-- User Dropdown Menu -->
          <div class="user-dropdown" [class.open]="isUserMenuOpen">
            <button class="dropdown-item" (click)="navigateToProfile(); closeUserMenu()">
              <span class="icon" aria-hidden="true">👤</span>
              <span>Profile</span>
            </button>
            <button class="dropdown-item" (click)="navigateToDashboard(); closeUserMenu()">
              <span class="icon" aria-hidden="true">📊</span>
              <span>Dashboard</span>
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" (click)="logout(); closeUserMenu()">
              <span class="icon" aria-hidden="true">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" *ngIf="type === 'landing'" aria-label="Open menu">
          ☰
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" *ngIf="isMobileMenuOpen && type === 'landing'" (click)="closeMobileMenu()"></div>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.mobile-menu-open]="isMobileMenuOpen && type === 'landing'">
        <div class="mobile-menu-header">
          <h3>Menu</h3>
          <button class="close-btn" (click)="closeMobileMenu()" aria-label="Close menu">✕</button>
        </div>
        <div class="mobile-menu-links">
          <a (click)="scrollToFeatures(); closeMobileMenu()" class="mobile-nav-link">
            <span class="icon" aria-hidden="true">⭐</span>
            <span>Features</span>
          </a>
          <a (click)="scrollToServices(); closeMobileMenu()" class="mobile-nav-link">
            <span class="icon" aria-hidden="true">🚚</span>
            <span>Services</span>
          </a>
          <a (click)="scrollToAbout(); closeMobileMenu()" class="mobile-nav-link">
            <span class="icon" aria-hidden="true">ℹ️</span>
            <span>About</span>
          </a>
          <a (click)="scrollToContact(); closeMobileMenu()" class="mobile-nav-link">
            <span class="icon" aria-hidden="true">📞</span>
            <span>Contact</span>
          </a>
        </div>
        <div class="mobile-menu-actions">
          <button class="btn btn-secondary" (click)="navigateToLogin(); closeMobileMenu()">
            <span class="icon" aria-hidden="true">🔑</span>
            Sign In
          </button>
          <button class="btn btn-primary" (click)="navigateToRegister(); closeMobileMenu()">
            <span class="icon" aria-hidden="true">➕</span>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--brand-gradient);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
    }

    /* Brand Section */
    .brand-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .brand-logo {
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #ffffff;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      line-height: 1.2;
    }

    .brand-subtitle {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      line-height: 1.2;
    }

    /* Navigation Links */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.15s ease;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }

    .nav-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .icon {
      display: inline-block;
      font-size: 1rem;
      line-height: 1;
      width: 1rem;
      text-align: center;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: 'Inter', sans-serif;
    }

    .btn-primary {
      background: var(--brand-gradient);
      color: #ffffff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .btn-secondary {
      background: #ffffff;
      color: #0891b2;
      border: 2px solid #0891b2;
    }

    .btn-secondary:hover {
      background: #0891b2;
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* Auth Buttons */
    .auth-buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* User Menu */
    .user-menu {
      position: relative;
      display: flex;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .user-info:hover {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .user-avatar {
      width: 2rem;
      height: 2rem;
      background: var(--brand-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.1rem;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
    }

    .user-role {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      text-transform: capitalize;
      line-height: 1.2;
    }

    .dropdown-icon {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      transition: transform 0.15s ease;
      display: inline-block;
    }

    .dropdown-icon.rotated {
      transform: rotate(180deg);
    }

    /* User Dropdown Menu */
    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.15s ease;
      min-width: 200px;
    }

    .user-dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #64748b;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: 'Inter', sans-serif;
    }

    .dropdown-item:hover {
      background: #f8fafc;
      color: #0891b2;
    }

    .dropdown-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 0.5rem 0;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 1.5rem;
      line-height: 1;
    }

    /* Mobile Menu */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      backdrop-filter: blur(4px);
    }

    .mobile-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 300px;
      height: 100vh;
      background: #ffffff;
      border-left: 1px solid #e2e8f0;
      z-index: 1001;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .mobile-menu-open {
      right: 0;
    }

    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .mobile-menu-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 1.25rem;
      color: #64748b;
      line-height: 1;
    }

    .mobile-menu-links {
      flex: 1;
      padding: 1rem 0;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: #64748b;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .mobile-nav-link:hover {
      background: #f8fafc;
      color: #0891b2;
    }

    .mobile-menu-actions {
      padding: 1.5rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .nav-links {
        gap: 1rem;
      }

      .nav-link span:last-child {
        display: none;
      }

      .nav-link {
        padding: 0.5rem;
      }
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 1rem;
      }

      .nav-links,
      .auth-buttons {
        display: none;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .brand-subtitle {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .navbar-container {
        padding: 0 0.75rem;
      }

      .brand-title {
        font-size: 1.125rem;
      }

      .user-details {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  @Input() type: 'landing' | 'customer' | 'officer' | 'dashboard' = 'landing';
  @Input() theme: 'landing' | 'customer' | 'officer' | 'light' | 'dark' = 'light';
  
  currentUser: any;
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  getBrandTitle(): string {
    switch (this.type) {
      case 'customer':
        return 'Customer Portal';
      case 'officer':
        return 'Officer Portal';
      default:
        return 'Express Parcel';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToProfile() {
    if (this.currentUser?.role === 'CUSTOMER') {
      this.router.navigate(['/customer/profile']);
    } else if (this.currentUser?.role === 'OFFICER') {
      this.router.navigate(['/officer/profile']);
    }
  }

  navigateToDashboard() {
    if (this.currentUser?.role === 'CUSTOMER') {
      this.router.navigate(['/customer/dashboard']);
    } else if (this.currentUser?.role === 'OFFICER') {
      this.router.navigate(['/officer/dashboard']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToServices() {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
} 