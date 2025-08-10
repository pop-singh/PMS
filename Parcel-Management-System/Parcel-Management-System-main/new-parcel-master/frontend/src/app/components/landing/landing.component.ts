import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../shared/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NavbarComponent
  ],
  template: `
    <!-- Navigation -->
    <app-navbar type="landing" theme="landing"></app-navbar>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="gradient-text">Lightning-Fast</span> Express<br>
            <span class="accent-text">Delivery Solutions</span>
          </h1>
          <p class="hero-subtitle">
            Revolutionize your shipping experience with our cutting-edge logistics platform. 
            Real-time tracking, instant notifications, and guaranteed on-time delivery at your fingertips.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary primary-btn" (click)="navigateToRegister()">
              <mat-icon>flash_on</mat-icon>
              Ship Now
            </button>
            <button class="btn btn-secondary secondary-btn" (click)="scrollToFeatures()">
              <mat-icon>explore</mat-icon>
              Discover Features
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card card-1">
            <mat-icon class="card-icon">local_shipping</mat-icon>
            <div class="card-content">
              <h3>Fast Delivery</h3>
              <p>24/7 tracking</p>
            </div>
          </div>
          <div class="floating-card card-2">
            <mat-icon class="card-icon">security</mat-icon>
            <div class="card-content">
              <h3>Secure</h3>
              <p>100% safe</p>
            </div>
          </div>
          <div class="floating-card card-3">
            <mat-icon class="card-icon">schedule</mat-icon>
            <div class="card-content">
              <h3>Flexible</h3>
              <p>Any time</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Advanced Features That Set Us Apart</h2>
          <p class="section-subtitle">Cutting-edge technology meets exceptional service delivery</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>track_changes</mat-icon>
            </div>
            <h3>Real-time Tracking</h3>
            <p>Track your parcels in real-time with our advanced GPS tracking system. Know exactly where your package is at every moment.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>security</mat-icon>
            </div>
            <h3>Secure Delivery</h3>
            <p>Your packages are handled with utmost care and security. We ensure safe delivery with insurance coverage.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>speed</mat-icon>
            </div>
            <h3>Fast & Reliable</h3>
            <p>Quick delivery times with guaranteed reliability. We pride ourselves on meeting deadlines consistently.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>support_agent</mat-icon>
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support to assist you with any queries or concerns about your shipments.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>payments</mat-icon>
            </div>
            <h3>Easy Payments</h3>
            <p>Multiple payment options with secure transactions. Pay online or on delivery with complete transparency.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>analytics</mat-icon>
            </div>
            <h3>Smart Analytics</h3>
            <p>Advanced analytics and reporting to help you understand your shipping patterns and optimize costs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Comprehensive Express Parcel Services</h2>
          <p class="section-subtitle">From local deliveries to international shipping, we've got you covered</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <mat-icon>local_shipping</mat-icon>
            </div>
            <h3>Local Delivery</h3>
            <p>Same-day and next-day delivery within your city with our extensive local network.</p>
            <ul>
              <li>Same-day delivery</li>
              <li>Next-day delivery</li>
              <li>Local pickup points</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <mat-icon>flight</mat-icon>
            </div>
            <h3>National Shipping</h3>
            <p>Fast and reliable shipping across the country with our nationwide logistics network.</p>
            <ul>
              <li>2-3 day delivery</li>
              <li>Express options</li>
              <li>Insurance included</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <mat-icon>public</mat-icon>
            </div>
            <h3>International</h3>
            <p>Global shipping solutions with customs handling and international tracking.</p>
            <ul>
              <li>Worldwide delivery</li>
              <li>Customs clearance</li>
              <li>Real-time tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">About Our Company</h2>
            <p class="about-description">
              We are a leading courier management company dedicated to providing exceptional shipping services. 
              With years of experience and a commitment to innovation, we've built a reputation for reliability, 
              speed, and customer satisfaction.
            </p>
            
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">10K+</div>
                <div class="stat-label">Happy Customers</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">500K+</div>
                <div class="stat-label">Packages Delivered</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">99.8%</div>
                <div class="stat-label">Success Rate</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support Available</div>
              </div>
            </div>
          </div>
          
          <div class="about-visual">
            <div class="about-card">
              <mat-icon>mission</mat-icon>
              <h3>Our Mission</h3>
              <p>To provide seamless, reliable, and efficient courier services that exceed customer expectations.</p>
            </div>
            <div class="about-card">
              <mat-icon>visibility</mat-icon>
              <h3>Our Vision</h3>
              <p>To become the most trusted and innovative courier management platform globally.</p>
            </div>
            <div class="about-card">
              <mat-icon>favorite</mat-icon>
              <h3>Our Values</h3>
              <p>Integrity, reliability, innovation, and customer-centric approach in everything we do.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Get in Touch</h2>
          <p class="section-subtitle">We're here to help with all your shipping needs</p>
        </div>
        
        <div class="contact-content">
          <div class="contact-form">
            <div class="form-header">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            <form>
              <div class="form-row">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter your first name" required>
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter your last name" required>
                </div>
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email address" required>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number">
              </div>
              <div class="form-group">
                <label>Subject</label>
                <select>
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us how we can help you..." rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary submit-btn">
                <mat-icon>send</mat-icon>
                Send Message
              </button>
            </form>
          </div>
          
          <div class="contact-info">
            <div class="info-header">
              <h3>Contact Information</h3>
              <p>Reach out to us through any of these channels</p>
            </div>
            
            <div class="contact-grid">
              <div class="contact-item">
                <div class="contact-icon">
                  <mat-icon>location_on</mat-icon>
                </div>
                <div class="contact-details">
                  <h4>Our Office</h4>
                  <p>Express Parcel Solutions Pvt Ltd<br>No. 45, Brigade Road, MG Road<br>Bangalore, Karnataka 560001</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <mat-icon>phone</mat-icon>
                </div>
                <div class="contact-details">
                  <h4>Call Us</h4>
                  <p>+91 80 4567 8900<br>+91 80 2234 5678</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <mat-icon>email</mat-icon>
                </div>
                <div class="contact-details">
                  <h4>Email Us</h4>
                  <p>info&#64;expressparcel.in<br>support&#64;expressparcel.in</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <mat-icon>schedule</mat-icon>
                </div>
                <div class="contact-details">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div class="social-section">
              <h4>Follow Us</h4>
              <div class="social-links">
                <a href="#" class="social-link">
                  <mat-icon>facebook</mat-icon>
                </a>
                <a href="#" class="social-link">
                  <mat-icon>twitter</mat-icon>
                </a>
                <a href="#" class="social-link">
                  <mat-icon>linkedin</mat-icon>
                </a>
                <a href="#" class="social-link">
                  <mat-icon>instagram</mat-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="brand-info">
              <h3>Express Parcel</h3>
              <p>Your trusted partner for all shipping and delivery needs. We provide reliable, fast, and secure express parcel services worldwide.</p>
            </div>
            <div class="newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest updates and offers</p>
              <div class="newsletter-form">
                <input type="email" placeholder="Enter your email">
                <button class="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-content">
          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a (click)="scrollToAbout()" class="footer-link">About Us</a></li>
              <li><a href="#" class="footer-link">Careers</a></li>
              <li><a href="#" class="footer-link">Press</a></li>
              <li><a href="#" class="footer-link">Blog</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#" class="footer-link">Local Delivery</a></li>
              <li><a href="#" class="footer-link">National Shipping</a></li>
              <li><a href="#" class="footer-link">International</a></li>
              <li><a href="#" class="footer-link">Express Delivery</a></li>
              <li><a href="#" class="footer-link">Same Day Delivery</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#" class="footer-link">Help Center</a></li>
              <li><a href="#" class="footer-link">Track Package</a></li>
              <li><a href="#" class="footer-link">Contact Support</a></li>
              <li><a href="#" class="footer-link">Shipping Guide</a></li>
              <li><a href="#" class="footer-link">FAQs</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Account</h4>
            <ul>
              <li><a (click)="navigateToLogin()" class="footer-link">Sign In</a></li>
              <li><a (click)="navigateToRegister()" class="footer-link">Sign Up</a></li>
              <li><a href="#" class="footer-link">My Account</a></li>
              <li><a href="#" class="footer-link">Order History</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; 2024 Express Parcel. All rights reserved.</p>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Modern Light Theme */
    :root {
      --primary-color: #0891b2;
      --primary-light: #06b6d4;
      --primary-dark: #0e7490;
      --secondary-color: #f59e0b;
      --secondary-light: #fbbf24;
      --secondary-dark: #d97706;
      --accent-color: #10b981;
      --accent-light: #34d399;
      --accent-dark: #059669;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --error-color: #ef4444;
      --info-color: #3b82f6;
      
      --background-primary: #ffffff;
      --background-secondary: #f8fafc;
      --background-tertiary: #f1f5f9;
      --background-accent: #f0f9ff;
      
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      --text-inverse: #ffffff;
      
      --border-light: #e2e8f0;
      --border-medium: #cbd5e1;
      --border-dark: #94a3b8;
      
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      
      --radius-sm: 0.375rem;
      --radius-md: 0.5rem;
      --radius-lg: 0.75rem;
      --radius-xl: 1rem;
      --radius-full: 9999px;
      
      --transition-fast: 0.15s ease;
      --transition-normal: 0.3s ease;
      --transition-slow: 0.5s ease;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background: var(--background-primary);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      background: #fafafa;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 120px 0 80px;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
    }

    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
      opacity: 0.3;
      transition: opacity 0.6s ease-in-out;
    }

    .shape-1 {
      width: 100px;
      height: 100px;
      top: 10%;
      left: 80%;
      animation: slideOut1 15s ease-in-out infinite;
      animation-delay: 1s;
    }

    .shape-2 {
      width: 60px;
      height: 60px;
      top: 70%;
      right: 80%;
      animation: slideOut2 18s ease-in-out infinite;
      animation-delay: 6s;
    }

    .shape-3 {
      width: 120px;
      height: 120px;
      bottom: 10%;
      left: 75%;
      animation: slideOut3 20s ease-in-out infinite;
      animation-delay: 12s;
    }

    @keyframes slideOut1 {
      0%, 100% { 
        transform: translateX(0px) translateY(0px) scale(1);
        opacity: 0.2;
      }
      50% { 
        transform: translateX(-5px) translateY(-5px) scale(1.05);
        opacity: 0.3;
      }
    }

    @keyframes slideOut2 {
      0%, 100% { 
        transform: translateX(0px) translateY(0px) scale(1);
        opacity: 0.15;
      }
      50% { 
        transform: translateX(5px) translateY(-5px) scale(1.03);
        opacity: 0.25;
      }
    }

    @keyframes slideOut3 {
      0%, 100% { 
        transform: translateX(0px) translateY(0px) scale(1);
        opacity: 0.18;
      }
      50% { 
        transform: translateX(-3px) translateY(5px) scale(1.02);
        opacity: 0.28;
      }
    }

    .hero-content {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-text {
      animation: fadeInUp 1s ease-out;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      padding: 2rem;
      border-radius: var(--radius-xl);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .accent-text {
      color: var(--accent-color);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .primary-btn {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: var(--text-inverse);
      border: none;
      padding: 1rem 2rem;
      border-radius: var(--radius-lg);
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .primary-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .secondary-btn {
      background: var(--background-primary);
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      padding: 1rem 2rem;
      border-radius: var(--radius-lg);
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .secondary-btn:hover {
      transform: translateY(-2px);
      background: var(--primary-color);
      color: var(--text-inverse);
    }

    .hero-visual {
      position: relative;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .floating-card {
      position: absolute;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-light);
      backdrop-filter: blur(10px);
      animation: fadeInUp 1s ease-out 0.3s both;
      min-height: 120px;
      min-width: 180px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .floating-card.card-1 {
      top: 15%;
      left: 5%;
      animation: gentleFloat1 8s ease-in-out infinite;
      animation-delay: 0s;
      z-index: 3;
    }

    .floating-card.card-2 {
      top: 55%;
      right: 5%;
      animation: gentleFloat2 10s ease-in-out infinite;
      animation-delay: 2s;
      z-index: 2;
    }

    .floating-card.card-3 {
      bottom: 15%;
      left: 35%;
      animation: gentleFloat3 12s ease-in-out infinite;
      animation-delay: 4s;
      z-index: 1;
    }

    @keyframes gentleFloat1 {
      0%, 100% { 
        transform: translateY(0px) scale(1);
        opacity: 0.9;
      }
      50% { 
        transform: translateY(-5px) scale(1.01);
        opacity: 0.95;
      }
    }

    @keyframes gentleFloat2 {
      0%, 100% { 
        transform: translateY(0px) scale(1);
        opacity: 0.9;
      }
      50% { 
        transform: translateY(-6px) scale(1.01);
        opacity: 0.95;
      }
    }

    @keyframes gentleFloat3 {
      0%, 100% { 
        transform: translateY(0px) scale(1);
        opacity: 0.9;
      }
      50% { 
        transform: translateY(-4px) scale(1.01);
        opacity: 0.95;
      }
    }

    .card-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .card-content h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .card-content p {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    /* Features Section */
    .features {
      padding: 100px 0;
      background: var(--background-secondary);
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: var(--background-primary);
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-light);
      transition: all var(--transition-normal);
      animation: fadeInUp 0.8s ease-out;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }

    .feature-icon {
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .feature-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: var(--text-inverse);
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Services Section */
    .services {
      padding: 100px 0;
      background: var(--background-primary);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: var(--background-secondary);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-light);
      transition: all var(--transition-normal);
      animation: fadeInUp 0.8s ease-out;
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-xl);
      border-color: var(--accent-color);
    }

    .service-icon {
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-color) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .service-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: var(--text-inverse);
    }

    .service-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .service-card p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .service-card ul {
      list-style: none;
    }

    .service-card li {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .service-card li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-color);
      font-weight: bold;
    }

    /* About Section */
    .about {
      padding: 100px 0;
      background: var(--background-secondary);
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: var(--background-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .about-visual {
      display: grid;
      gap: 1.5rem;
    }

    .about-card {
      background: var(--background-primary);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-light);
      transition: all var(--transition-normal);
    }

    .about-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: var(--primary-color);
    }

    .about-card mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .about-card h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .about-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Contact Section */
    .contact {
      padding: 100px 0;
      background: #fafafa;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .contact-form {
      background: #ffffff;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
    }

    .form-header {
      margin-bottom: 2rem;
    }

    .form-header h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .form-header p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      background: #ffffff;
      color: #1f2937;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #0891b2;
      box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
    }

    .submit-btn {
      width: 100%;
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-header {
      margin-bottom: 1rem;
    }

    .info-header h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .info-header p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    .contact-grid {
      display: grid;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }

    .contact-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: #0891b2;
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      background: var(--brand-gradient);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .contact-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: #ffffff;
    }

    .contact-details h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .contact-details p {
      color: #6b7280;
      line-height: 1.6;
      font-size: 0.9rem;
    }

    .social-section {
      margin-top: 1rem;
    }

    .social-section h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
    }

    .social-link {
      width: 40px;
      height: 40px;
      background: #f3f4f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background: #0891b2;
      color: #ffffff;
      transform: translateY(-2px);
    }

    /* Footer */
    .footer {
      background: #ffffff;
      color: #1f2937;
      padding: 80px 0 20px;
      border-top: 1px solid #e5e7eb;
    }

    .footer-top {
      margin-bottom: 3rem;
    }

    .footer-brand {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .brand-info h3 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .brand-info p {
      color: #6b7280;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .newsletter h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .newsletter p {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .newsletter-form {
      display: flex;
      gap: 0.75rem;
    }

    .newsletter-form input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.9rem;
      background: #ffffff;
      color: #1f2937;
    }

    .newsletter-form input:focus {
      outline: none;
      border-color: #0891b2;
    }

    .newsletter-form button {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }

    .footer-section h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.25rem;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section li {
      margin-bottom: 0.75rem;
    }

    .footer-link {
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s ease;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .footer-link:hover {
      color: #0891b2;
    }

    .footer-bottom {
      border-top: 1px solid #e5e7eb;
      padding-top: 2rem;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-bottom p {
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links .footer-link {
      font-size: 0.875rem;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    .loading-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      background-size: 200px 100%;
      animation: shimmer 1.5s infinite;
    }

    /* Ensure content is always visible during transitions */
    .hero-content, .feature-card, .service-card {
      opacity: 1 !important;
      min-height: fit-content;
    }

    /* Smooth transitions for professional look */
    * {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .contact-content {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 1rem;
      }

      .hero {
        padding: 100px 0 60px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .hero-actions {
        justify-content: center;
      }

      .section-title {
        font-size: 2rem;
      }

      .features-grid,
      .services-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .floating-card {
        position: relative;
        margin-bottom: 1rem;
      }

      .hero-visual {
        display: none;
      }
    }
  `]
})
export class LandingComponent {
  supportEmail = 'support@courierservice.com';

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
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