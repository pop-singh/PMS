import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../../services/payment.service';
import { NavbarComponent } from '../../shared/navbar.component';

@Component({
  selector: 'app-officer-invoice',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NavbarComponent
  ],
  template: `
    <!-- Navigation -->
    <app-navbar type="officer" theme="officer"></app-navbar>

    <div class="invoice-container">
      <div class="invoice-content">
        <!-- Header Section -->
        <div class="invoice-header">
          <div class="header-badge">
            <mat-icon>receipt</mat-icon>
            <span>Officer Invoice</span>
          </div>
          <h1 class="invoice-title">Customer Invoice & Receipt</h1>
          <p class="invoice-subtitle">Complete details of customer's courier service booking processed by officer</p>
        </div>

        <!-- Loading State -->
        <div class="loading-section" *ngIf="isLoading">
          <div class="loading-card">
            <mat-spinner diameter="50"></mat-spinner>
            <h3>Loading Invoice Details</h3>
            <p>Please wait while we fetch invoice information...</p>
          </div>
        </div>

        <!-- Error State -->
        <div class="error-section" *ngIf="errorMessage && !isLoading">
          <div class="error-card">
            <div class="error-icon">
              <mat-icon>error</mat-icon>
            </div>
            <h3>Unable to Load Invoice</h3>
            <p>{{ errorMessage }}</p>
            <button mat-raised-button class="retry-btn" (click)="retryLoadInvoice()">
              <mat-icon>refresh</mat-icon>
              <span>Retry</span>
            </button>
          </div>
        </div>

        <!-- Invoice Content -->
        <div class="invoice-sections" *ngIf="invoiceData && !isLoading">
          <!-- Invoice Header -->
          <div class="invoice-header-section">
            <div class="invoice-header-card">
              <div class="invoice-header-content">
                <div class="invoice-info">
                  <div class="invoice-number">
                    <h2>Invoice #{{ invoiceData.invoiceNumber }}</h2>
                    <span class="invoice-status">PAID</span>
                  </div>
                  <div class="invoice-dates">
                    <div class="date-item">
                      <span class="date-label">Issue Date</span>
                      <span class="date-value">{{ invoiceData.issueDate | date:'mediumDate' }}</span>
                    </div>
                    <div class="date-item">
                      <span class="date-label">Due Date</span>
                      <span class="date-value">{{ invoiceData.dueDate | date:'mediumDate' }}</span>
                    </div>
                  </div>
                </div>
                <div class="company-info">
                  <div class="company-logo">
                    <mat-icon>local_shipping</mat-icon>
                    <span>Express Parcel</span>
                  </div>
                  <div class="company-details">
                    <p>Express Parcel Solutions Pvt Ltd</p>
                    <p>No. 45, Brigade Road, MG Road</p>
                    <p>Bangalore, Karnataka 560001</p>
                    <p>Phone: +91 80 4567 8900</p>
                    <p>Email: billing&#64;expressparcel.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Officer & Customer Information -->
          <div class="customer-receiver-section">
            <div class="info-grid">
              <div class="info-card">
                <div class="info-header">
                  <mat-icon>admin_panel_settings</mat-icon>
                  <h3>Processing Officer</h3>
                </div>
                <div class="info-content">
                  <div class="info-item">
                    <span class="info-label">Officer Name</span>
                    <span class="info-value">{{ invoiceData.officerName || 'Officer' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Processing Date</span>
                    <span class="info-value">{{ invoiceData.processingDate | date:'mediumDate' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Service Type</span>
                    <span class="info-value">Officer Assisted Booking</span>
                  </div>
                </div>
              </div>

              <div class="info-card">
                <div class="info-header">
                  <mat-icon>person</mat-icon>
                  <h3>Customer Information</h3>
                </div>
                <div class="info-content">
                  <div class="info-item">
                    <span class="info-label">Customer</span>
                    <span class="info-value">{{ invoiceData.customerName || 'Walk-in Customer' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Booking ID</span>
                    <span class="info-value">{{ invoiceData.bookingId }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Service Date</span>
                    <span class="info-value">{{ invoiceData.paymentTime | date:'mediumDate' }}</span>
                  </div>
                </div>
              </div>

              <div class="info-card">
                <div class="info-header">
                  <mat-icon>location_on</mat-icon>
                  <h3>Receiver Information</h3>
                </div>
                <div class="info-content">
                  <div class="info-item">
                    <span class="info-label">Name</span>
                    <span class="info-value">{{ invoiceData.receiverName }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone</span>
                    <span class="info-value">{{ invoiceData.receiverMobile }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Address</span>
                    <span class="info-value">{{ invoiceData.receiverAddress }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">PIN Code</span>
                    <span class="info-value">{{ invoiceData.receiverPin }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="payment-info-section">
            <div class="payment-info-card">
              <div class="payment-info-header">
                <mat-icon>payment</mat-icon>
                <h3>Payment Information</h3>
              </div>
              <div class="payment-info-content">
                <div class="payment-info-item">
                  <span class="payment-info-label">Payment ID</span>
                  <span class="payment-info-value">{{ invoiceData.paymentId }}</span>
                </div>
                <div class="payment-info-item">
                  <span class="payment-info-label">Transaction ID</span>
                  <span class="payment-info-value">{{ invoiceData.transactionId }}</span>
                </div>
                <div class="payment-info-item">
                  <span class="payment-info-label">Payment Time</span>
                  <span class="payment-info-value">{{ invoiceData.paymentTime | date:'medium' }}</span>
                </div>
                <div class="payment-info-item">
                  <span class="payment-info-label">Payment Method</span>
                  <span class="payment-info-value">Officer Assisted Payment</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Parcel Details -->
          <div class="parcel-details-section">
            <div class="parcel-card">
              <div class="parcel-header">
                <mat-icon>inventory</mat-icon>
                <h3>Parcel Details</h3>
              </div>
              <div class="parcel-grid">
                <div class="parcel-item">
                  <span class="parcel-label">Weight</span>
                  <span class="parcel-value">{{ invoiceData.parcelWeight }}g</span>
                </div>
                <div class="parcel-item">
                  <span class="parcel-label">Contents Description</span>
                  <span class="parcel-value">{{ invoiceData.parcelContents }}</span>
                </div>
                <div class="parcel-item">
                  <span class="parcel-label">Delivery Type</span>
                  <span class="parcel-value">{{ invoiceData.deliveryType }}</span>
                </div>
                <div class="parcel-item">
                  <span class="parcel-label">Packing Preference</span>
                  <span class="parcel-value">{{ invoiceData.packingPreference }}</span>
                </div>
                <div class="parcel-item">
                  <span class="parcel-label">Pickup Time</span>
                  <span class="parcel-value">{{ invoiceData.pickupTime | date:'medium' }}</span>
                </div>
                <div class="parcel-item">
                  <span class="parcel-label">Drop-off Time</span>
                  <span class="parcel-value">{{ invoiceData.dropoffTime | date:'medium' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Summary -->
          <div class="payment-summary-section">
            <div class="payment-summary-card">
              <div class="payment-summary-header">
                <mat-icon>receipt_long</mat-icon>
                <h3>Payment Summary</h3>
              </div>
              <div class="payment-details">
                <div class="payment-item">
                  <span class="payment-label">Service Cost</span>
                  <span class="payment-value">₹{{ invoiceData.serviceCost | number:'1.2-2' }}</span>
                </div>
                <div class="payment-item">
                  <span class="payment-label">Officer Fee</span>
                  <span class="payment-value">₹50.00</span>
                </div>
                <div class="payment-item">
                  <span class="payment-label">Payment Type</span>
                  <span class="payment-value">Officer Assisted</span>
                </div>
                <div class="payment-item">
                  <span class="payment-label">Payment ID</span>
                  <span class="payment-value">{{ invoiceData.paymentId }}</span>
                </div>
                <div class="payment-item">
                  <span class="payment-label">Transaction ID</span>
                  <span class="payment-value">{{ invoiceData.transactionId }}</span>
                </div>
                <div class="payment-item">
                  <span class="payment-label">Payment Time</span>
                  <span class="payment-value">{{ invoiceData.paymentTime | date:'medium' }}</span>
                </div>
                <div class="payment-item total">
                  <span class="payment-label">Total Amount</span>
                  <span class="payment-value">₹{{ invoiceData.serviceCost | number:'1.2-2' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="actions-section">
            <div class="actions-card">
              <div class="actions-header">
                <h3>Invoice Actions</h3>
                <p>Download or manage this invoice</p>
              </div>
              <div class="actions-grid">
                <button mat-raised-button class="action-btn primary-btn" (click)="downloadInvoice()">
                  <mat-icon>download</mat-icon>
                  <span>Download PDF</span>
                </button>
                <button mat-stroked-button class="action-btn secondary-btn" (click)="goToDashboard()">
                  <mat-icon>dashboard</mat-icon>
                  <span>Officer Dashboard</span>
                </button>
                <button mat-stroked-button class="action-btn secondary-btn" (click)="createNewBooking()">
                  <mat-icon>add</mat-icon>
                  <span>New Booking</span>
                </button>
                <button mat-stroked-button class="action-btn secondary-btn" (click)="trackPackage()">
                  <mat-icon>track_changes</mat-icon>
                  <span>Track Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .invoice-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 2rem 0;
      margin-top: 80px;
    }

    .invoice-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .invoice-header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInUp 0.8s ease-out;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--brand-gradient);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 1rem;
      box-shadow: 0 2px 10px rgba(8, 145, 178, 0.3);
    }

    .header-badge mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .invoice-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #1e293b 0%, #0891b2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .invoice-subtitle {
      font-size: 1.125rem;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .loading-section,
    .error-section {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .loading-card,
    .error-card {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      text-align: center;
    }

    .loading-card h3,
    .error-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 1rem 0 0.5rem;
    }

    .loading-card p,
    .error-card p {
      color: #64748b;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .error-icon {
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .error-icon mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: white;
    }

    .retry-btn {
      background: var(--brand-gradient);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(8, 145, 178, 0.3);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    }

    .retry-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(8, 145, 178, 0.4);
    }

    .invoice-sections {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .invoice-header-section {
      margin-bottom: 2rem;
    }

    .invoice-header-card {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .invoice-header-content {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: start;
    }

    .invoice-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .invoice-number {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .invoice-number h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .invoice-status {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .invoice-dates {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .date-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .date-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .date-value {
      font-size: 1rem;
      color: #1e293b;
      font-weight: 600;
    }

    .company-info {
      text-align: right;
    }

    .company-logo {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .company-logo mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: #0891b2;
    }

    .company-logo span {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
    }

    .company-details p {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0.25rem 0;
    }

    .customer-receiver-section {
      margin-bottom: 2rem;
    }

    .payment-info-section {
      margin-bottom: 2rem;
    }

    .payment-info-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .payment-info-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .payment-info-header mat-icon {
      color: #0891b2;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .payment-info-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .payment-info-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .payment-info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .payment-info-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .payment-info-value {
      font-size: 0.875rem;
      color: #1e293b;
      font-weight: 600;
      text-align: right;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .info-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .info-header mat-icon {
      color: #0891b2;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .info-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .info-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .info-value {
      font-size: 0.875rem;
      color: #1e293b;
      font-weight: 600;
      text-align: right;
    }

    .parcel-details-section {
      margin-bottom: 2rem;
    }

    .parcel-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .parcel-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .parcel-header mat-icon {
      color: #0891b2;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .parcel-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .parcel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .parcel-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .parcel-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .parcel-value {
      font-size: 0.875rem;
      color: #1e293b;
      font-weight: 600;
    }

    .payment-summary-section {
      margin-bottom: 2rem;
    }

    .payment-summary-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .payment-summary-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .payment-summary-header mat-icon {
      color: #0891b2;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .payment-summary-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .payment-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .payment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .payment-item.total {
      background: var(--brand-gradient);
      border-color: var(--primary-color);
      color: white;
    }

    .payment-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .payment-item.total .payment-label {
      color: white;
      font-weight: 600;
    }

    .payment-value {
      font-size: 0.875rem;
      color: #1e293b;
      font-weight: 600;
    }

    .payment-item.total .payment-value {
      color: white;
      font-size: 1rem;
    }

    .actions-section {
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }

    .actions-card {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .actions-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .actions-header h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .actions-header p {
      color: #64748b;
      font-size: 1rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      font-weight: 500;
      transition: all 0.3s ease;
      min-height: 3rem;
    }

    .primary-btn {
      background: var(--brand-gradient);
      color: white;
      border: none;
      box-shadow: 0 2px 10px rgba(124, 58, 237, 0.3);
    }

    .primary-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(8, 145, 178, 0.4);
    }

    .secondary-btn {
      background: #f8fafc;
      color: #1e293b;
      border: 2px solid #e2e8f0;
    }

    .secondary-btn:hover {
      border-color: #0891b2;
      background: #f0f9ff;
      transform: translateY(-2px);
      box-shadow: 0 2px 10px rgba(8, 145, 178, 0.2);
    }

    @media (max-width: 768px) {
      .invoice-container {
        padding: 80px 1rem 2rem;
      }

      .invoice-title {
        font-size: 2rem;
      }

      .invoice-header-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .company-info {
        text-align: left;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .parcel-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }

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
  `]
})
export class OfficerInvoiceComponent implements OnInit {
  invoiceData: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  transactionId: string = '';
  transactionDate: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const bookingId = params['bookingId'];
      this.transactionId = params['transactionId'] || 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      if (bookingId) {
        this.loadInvoiceData(bookingId);
      } else {
        this.errorMessage = 'No booking ID found';
      }
    });
  }

  loadInvoiceData(bookingId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.paymentService.generateInvoice(bookingId).subscribe({
      next: (response) => {
        if (response.success) {
          this.invoiceData = response.invoiceData;
        } else {
          // For demo purposes, create invoice data from query params
          this.createDemoInvoiceData(bookingId);
        }
      },
      error: (error) => {
        // For demo purposes, create invoice data from query params
        this.createDemoInvoiceData(bookingId);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  createDemoInvoiceData(bookingId: string) {
    // Get data from query parameters
    this.route.queryParams.subscribe(params => {
      this.invoiceData = {
        bookingId: bookingId,
        invoiceNumber: 'INV' + bookingId,
        paymentId: 'PAY' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        transactionId: this.transactionId,
        customerName: params['customerName'] || 'Walk-in Customer',
        officerName: params['customerName'] || 'Courier Officer',
        receiverName: params['receiverName'] || 'Receiver',
        receiverAddress: params['receiverAddress'] || 'Address not provided',
        receiverMobile: '9876543210',
        receiverPin: '560001',
        parcelWeight: '1500',
        parcelContents: 'Documents and Electronics',
        deliveryType: 'STANDARD',
        packingPreference: 'BASIC',
        serviceCost: parseFloat(params['amount']) || 1250,
        paymentTime: new Date(),
        pickupTime: new Date(),
        dropoffTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        issueDate: new Date(),
        dueDate: new Date(),
        processingDate: new Date()
      };
    });
  }

  retryLoadInvoice() {
    this.route.queryParams.subscribe(params => {
      const bookingId = params['bookingId'];
      if (bookingId) {
        this.loadInvoiceData(bookingId);
      }
    });
  }

  downloadInvoice() {
    // Attempt to download invoice as PDF using the payment service
    const bookingId = this.invoiceData?.bookingId;
    if (!bookingId) {
      this.snackBar.open('Booking ID not found', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.paymentService.downloadInvoicePdf(bookingId).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice_${bookingId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('Invoice downloaded successfully', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Failed to download invoice', 'Close', { duration: 3000 });
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/officer/dashboard']);
  }

  createNewBooking() {
    this.router.navigate(['/officer/booking']);
  }

  trackPackage() {
    this.router.navigate(['/officer/tracking'], {
      queryParams: { bookingId: this.invoiceData?.bookingId }
    });
  }
}
