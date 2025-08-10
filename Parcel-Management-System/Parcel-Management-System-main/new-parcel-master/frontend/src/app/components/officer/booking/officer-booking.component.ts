import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { NavbarComponent } from '../../shared/navbar.component';

@Component({
  selector: 'app-officer-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NavbarComponent
  ],
  template: `
    <!-- Navigation -->
    <app-navbar type="officer" theme="officer"></app-navbar>

    <div class="booking-container">
      <div class="booking-content">
        <!-- Header Section -->
        <div class="booking-header">
          <div class="header-badge">
            <mat-icon>admin_panel_settings</mat-icon>
            <span>Officer Booking</span>
          </div>
          <h1 class="booking-title">Create Customer Booking</h1>
          <p class="booking-subtitle">Fill in the details to create a courier booking for customer with full officer privileges</p>
        </div>

        <!-- Officer Info Section -->
        <div class="officer-info-section" *ngIf="currentUser">
          <div class="info-card">
            <div class="info-header">
              <mat-icon>admin_panel_settings</mat-icon>
              <h3>Officer Information</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Officer Name:</span>
                  <span class="info-value">{{ currentUser.officerName || currentUser.customerName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Officer ID:</span>
                  <span class="info-value">{{ currentUser.uniqueId }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Role:</span>
                <span class="info-value">Courier Officer</span>
              </div>
                </div>
              </div>
            </div>

        <!-- Booking Form Section -->
        <div class="booking-form-section">
          <div class="form-card">
            <div class="form-header">
              <h2>Customer Booking Details</h2>
              <p>Enter all required information for the customer's courier service</p>
            </div>

            <form [formGroup]="bookingForm" (ngSubmit)="createBooking()" class="booking-form">
              <!-- Receiver Details Section -->
              <div class="form-section">
                <div class="section-header">
                  <mat-icon>person_add</mat-icon>
                  <h3>Receiver Details</h3>
                </div>
                
                <div class="form-grid">
                  <div class="form-field-container">
                    <label class="field-label">Receiver Name</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput formControlName="receiverName" placeholder="Enter receiver's full name">
                      <mat-error *ngIf="bookingForm.get('receiverName')?.hasError('required')">
                        Receiver name is required
                      </mat-error>
                    </mat-form-field>
                </div>

                  <div class="form-field-container">
                    <label class="field-label">Receiver Mobile *</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput formControlName="receiverMobile" placeholder="Enter receiver's mobile number">
                      <mat-error *ngIf="bookingForm.get('receiverMobile')?.hasError('required')">
                        Receiver mobile is required
                      </mat-error>
                      <mat-error *ngIf="bookingForm.get('receiverMobile')?.hasError('pattern')">
                        Please enter a valid 10-digit mobile number
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-field-container">
                    <label class="field-label">PIN Code *</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput formControlName="receiverPin" placeholder="Enter 6-digit PIN code">
                      <mat-error *ngIf="bookingForm.get('receiverPin')?.hasError('required')">
                        PIN code is required
                      </mat-error>
                      <mat-error *ngIf="bookingForm.get('receiverPin')?.hasError('pattern')">
                        Please enter a valid 6-digit PIN code
                      </mat-error>
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-field-container full-width">
                    <label class="field-label">Receiver Address</label>
                    <mat-form-field appearance="outline" class="form-field">
                    <textarea matInput formControlName="receiverAddress" rows="3" placeholder="Enter complete receiver address"></textarea>
                      <mat-error *ngIf="bookingForm.get('receiverAddress')?.hasError('required')">
                        Receiver address is required
                      </mat-error>
                    </mat-form-field>
                  </div>
                </div>

              <!-- Package Details Section -->
              <div class="form-section">
                <div class="section-header">
                  <mat-icon>inventory_2</mat-icon>
                  <h3>Package Details</h3>
                </div>
                
                <div class="form-grid">
                  <div class="form-field-container">
                    <label class="field-label">Package Weight (kg)</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput type="number" formControlName="weight" placeholder="Enter weight in kg">
                      <mat-error *ngIf="bookingForm.get('weight')?.hasError('required')">
                        Weight is required
                      </mat-error>
                      <mat-error *ngIf="bookingForm.get('weight')?.hasError('min')">
                        Weight must be at least 0.1 kg
                      </mat-error>
                    </mat-form-field>
                </div>

                  <div class="form-field-container">
                    <label class="field-label">Package Type</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <mat-select formControlName="packageType">
                        <mat-option value="DOCUMENTS">Documents</mat-option>
                        <mat-option value="ELECTRONICS">Electronics</mat-option>
                        <mat-option value="CLOTHING">Clothing</mat-option>
                        <mat-option value="FOOD">Food</mat-option>
                        <mat-option value="OTHERS">Others</mat-option>
                      </mat-select>
                      <mat-error *ngIf="bookingForm.get('packageType')?.hasError('required')">
                        Package type is required
                      </mat-error>
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-field-container full-width">
                    <label class="field-label">Package Description</label>
                    <mat-form-field appearance="outline" class="form-field">
                    <textarea matInput formControlName="description" rows="3" placeholder="Describe your package contents"></textarea>
                    <mat-error *ngIf="bookingForm.get('description')?.hasError('required')">
                        Package description is required
                      </mat-error>
                    </mat-form-field>
                  </div>
                </div>

              <!-- Service Options Section -->
              <div class="form-section">
                <div class="section-header">
                  <mat-icon>settings</mat-icon>
                  <h3>Service Options</h3>
                </div>
                
                <div class="form-grid">
                  <div class="form-field-container">
                    <label class="field-label">Delivery Type</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <mat-select formControlName="deliveryType">
                        <mat-option value="STANDARD">Standard Delivery</mat-option>
                        <mat-option value="EXPRESS">Express Delivery</mat-option>
                        <mat-option value="SAME_DAY">Same Day Delivery</mat-option>
                      </mat-select>
                      <mat-error *ngIf="bookingForm.get('deliveryType')?.hasError('required')">
                        Delivery type is required
                      </mat-error>
                    </mat-form-field>
                </div>

                  <div class="form-field-container">
                    <label class="field-label">Packing Preference</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <mat-select formControlName="packingPreference">
                         <mat-option value="BASIC">Basic Packing</mat-option>
                        <mat-option value="STANDARD">Standard Packing</mat-option>
                         <mat-option value="PREMIUM">Premium Packing</mat-option>
                       </mat-select>
                      <mat-error *ngIf="bookingForm.get('packingPreference')?.hasError('required')">
                        Packing preference is required
                      </mat-error>
                    </mat-form-field>
                </div>
              </div>

                <div class="form-grid">
                  <div class="form-field-container">
                    <label class="field-label">Pickup Date</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput [matDatepicker]="pickupPicker" formControlName="pickupDate" placeholder="Choose pickup date">
                      <mat-datepicker-toggle matSuffix [for]="pickupPicker"></mat-datepicker-toggle>
                      <mat-datepicker #pickupPicker></mat-datepicker>
                      <mat-error *ngIf="bookingForm.get('pickupDate')?.hasError('required')">
                        Pickup date is required
                      </mat-error>
                      <mat-error *ngIf="bookingForm.get('pickupDate')?.hasError('pastDate')">
                        Pickup date cannot be in the past
                      </mat-error>
                    </mat-form-field>
                </div>

                  <div class="form-field-container">
                    <label class="field-label">Drop-off Date</label>
                    <mat-form-field appearance="outline" class="form-field">
                      <input matInput [matDatepicker]="dropoffPicker" formControlName="dropoffDate" placeholder="Choose drop-off date">
                      <mat-datepicker-toggle matSuffix [for]="dropoffPicker"></mat-datepicker-toggle>
                      <mat-datepicker #dropoffPicker></mat-datepicker>
                      <mat-error *ngIf="bookingForm.get('dropoffDate')?.hasError('required')">
                        Drop-off date is required
                      </mat-error>
                      <mat-error *ngIf="bookingForm.get('dropoffDate')?.hasError('dropoffDate')">
                        Drop-off date must be after pickup date
                      </mat-error>
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <!-- Cost Breakdown Section -->
              <div class="cost-breakdown-section">
                <div class="cost-header">
                  <mat-icon>receipt</mat-icon>
                  <h3>Cost Breakdown</h3>
                </div>
                
                <div class="cost-grid">
                <div class="cost-item">
                  <span class="cost-label">Base Rate:</span>
                  <span class="cost-value">₹{{ baseRate }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Weight Charge:</span>
                  <span class="cost-value">₹{{ weightCharge }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Delivery Charge:</span>
                  <span class="cost-value">₹{{ deliveryCharge }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Packing Charge:</span>
                  <span class="cost-value">₹{{ packingCharge }}</span>
                </div>
                <div class="cost-item">
                  <span class="cost-label">Admin Fee:</span>
                  <span class="cost-value">₹{{ adminFee }}</span>
                </div>
                  <div class="cost-item subtotal">
                    <span class="cost-label">Subtotal:</span>
                    <span class="cost-value">₹{{ subtotal }}</span>
                  </div>
                  <div class="cost-item tax">
                    <span class="cost-label">Tax (18%):</span>
                    <span class="cost-value">₹{{ taxAmount }}</span>
                  </div>
                <div class="cost-item total">
                    <span class="cost-label">Total Amount:</span>
                  <span class="cost-value">₹{{ calculatedCost }}</span>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button mat-raised-button type="submit" 
                        [disabled]="bookingForm.invalid || isLoading"
                        class="submit-button">
                  <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                  <mat-icon *ngIf="!isLoading">send</mat-icon>
                  <span *ngIf="!isLoading">Create Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--background-primary) 0%, var(--background-secondary) 50%, var(--background-tertiary) 100%);
      padding: 120px 3rem 3rem;
      position: relative;
    }

    .booking-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .booking-content {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    /* Header Section */
    .booking-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(8, 145, 178, 0.1);
      color: var(--primary-color);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-lg);
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 2rem;
      border: 1px solid rgba(8, 145, 178, 0.2);
      transition: all var(--transition-fast);
    }

    .header-badge:hover {
      background: rgba(8, 145, 178, 0.15);
      transform: translateY(-1px);
    }

    .header-badge mat-icon {
      font-size: 1.125rem;
      width: 1.125rem;
      height: 1.125rem;
    }

    .booking-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .booking-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Officer Info Section */
    .officer-info-section {
      margin-bottom: 3rem;
    }

    .info-card {
      background: var(--background-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-fast);
    }

    .info-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--primary-color);
    }

    .info-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .info-header mat-icon {
      color: var(--primary-color);
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .info-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--background-secondary);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
    }

    .info-label {
      font-weight: 600;
      color: var(--text-secondary);
    }

    .info-value {
      font-weight: 600;
      color: var(--text-primary);
    }

    /* Booking Form Section */
    .booking-form-section {
      margin-bottom: 3rem;
    }

    .form-card {
      background: var(--background-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-2xl);
      padding: 3rem;
      box-shadow: var(--shadow-lg);
    }

    .form-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .form-header h2 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .form-header p {
      color: var(--text-secondary);
      font-size: 1.125rem;
      line-height: 1.6;
    }

    .booking-form {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .form-section {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 2rem;
      background: var(--background-secondary);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .section-header mat-icon {
      color: var(--primary-color);
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .section-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .form-field-container {
      display: flex;
      flex-direction: column;
    }

    .form-field-container.full-width {
      grid-column: 1 / -1;
    }

    .field-label {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }

    .form-field {
      width: 100%;
    }

    .form-field ::ng-deep .mat-mdc-text-field-wrapper {
      background: var(--background-primary);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-medium);
      transition: all var(--transition-fast);
      padding: 0.5rem 0;
    }

    .form-field ::ng-deep .mat-mdc-text-field-wrapper:hover {
      border-color: var(--primary-color);
      background: var(--background-secondary);
    }

    .form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--focused {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
    }

    .form-field ::ng-deep .mat-mdc-form-field-focus-overlay {
      background: transparent;
    }

    .form-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    /* Cost Breakdown Section */
    .cost-breakdown-section {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      border-radius: var(--radius-xl);
      padding: 2rem;
      color: var(--text-inverse);
    }

    .cost-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .cost-header mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .cost-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .cost-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cost-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .cost-item.subtotal {
      border-top: 2px solid rgba(255, 255, 255, 0.3);
      margin-top: 1rem;
      padding-top: 1.5rem;
    }

    .cost-item.tax {
      background: rgba(255, 255, 255, 0.15);
    }

    .cost-item.total {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 700;
      font-size: 1.125rem;
    }

    .cost-label {
      font-weight: 500;
    }

    .cost-value {
      font-weight: 600;
    }

    /* Form Actions */
    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }

    .submit-button {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: var(--text-inverse);
      border: none;
      padding: 1.25rem 3rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1.125rem;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      letter-spacing: 0.025em;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .booking-container {
        padding: 100px 2rem 2rem;
      }

      .booking-title {
        font-size: 2.5rem;
      }

      .form-card {
        padding: 2rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .booking-container {
        padding: 80px 1.5rem 1.5rem;
      }

      .booking-title {
        font-size: 2rem;
      }

      .form-card {
        padding: 1.5rem;
      }

      .form-section {
        padding: 1.5rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .booking-container {
        padding: 70px 1rem 1rem;
      }

      .booking-title {
        font-size: 1.75rem;
      }

      .form-card {
        padding: 1rem;
      }

      .form-section {
        padding: 1rem;
      }
    }
  `]
})
export class OfficerBookingComponent implements OnInit {
  bookingForm: FormGroup;
  isLoading = false;
  currentUser: any = null;
  calculatedCost = 0;
  baseRate = 50;
  weightCharge = 0;
  deliveryCharge = 0;
  packingCharge = 0;
  adminFee = 50;
  subtotal = 0;
  taxAmount = 0;
  parcelWeightInGram = 0;
  minPickupDate: Date = new Date();
  minDropoffDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookingForm = this.fb.group({
      receiverName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      receiverAddress: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      receiverMobile: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      receiverPin: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      parcelWeight: ['', [
        Validators.required, 
        Validators.min(1), 
        Validators.max(1000000),
        Validators.pattern(/^\d+$/)
      ]],
      parcelDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      deliveryType: ['STANDARD', Validators.required],
      packingType: ['BASIC', Validators.required],
      pickupDate: ['', [Validators.required, this.pastDateValidator()]],
      dropoffDate: ['', [Validators.required, this.pastDateValidator()]]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserByRole('OFFICER');
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.calculateCost();
    this.initializeDatePickers();
  }

  initializeDatePickers() {
    // Set minimum dates for date pickers
    this.minPickupDate = new Date();
    this.minDropoffDate = new Date();
  }

  pastDateValidator() {
    return (control: any) => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }

  dateRangeValidator(form: FormGroup) {
    const pickupDate = form.get('pickupDate');
    const dropoffDate = form.get('dropoffDate');
    
    if (pickupDate && dropoffDate && pickupDate.value && dropoffDate.value) {
      const pickup = new Date(pickupDate.value);
      const dropoff = new Date(dropoffDate.value);
      
      // Check if dates are valid
      if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) {
        return { invalidDate: true };
      }
      
      if (dropoff <= pickup) {
        dropoffDate.setErrors({ invalidDateRange: true });
        return { invalidDateRange: true };
      }
    }
    
    return null;
  }

  onPickupDateChange() {
    this.calculateCost();
    this.updateMinDropoffDate();
  }

  onDropoffDateChange() {
    this.calculateCost();
  }

  updateMinDropoffDate() {
    const pickupDate = this.bookingForm.get('pickupDate')?.value;
    if (pickupDate) {
      const pickup = new Date(pickupDate);
      // Set minimum dropoff date to next day after pickup
      this.minDropoffDate = new Date(pickup);
      this.minDropoffDate.setDate(pickup.getDate() + 1);
    }
  }

  updatePickupDateTime() {
    const pickupDate = this.bookingForm.get('pickupDate')?.value;
    if (pickupDate) {
      const date = new Date(pickupDate);
      const timeString = '09:00'; // Default pickup time
      this.combineDateTime(date, timeString);
    }
  }

  updateDropoffDateTime() {
    const dropoffDate = this.bookingForm.get('dropoffDate')?.value;
    if (dropoffDate) {
      const date = new Date(dropoffDate);
      const timeString = '18:00'; // Default dropoff time
      this.combineDateTime(date, timeString);
    }
  }

  calculateCost() {
    const weight = this.bookingForm.get('parcelWeight')?.value || 0;
    const deliveryType = this.bookingForm.get('deliveryType')?.value || 'STANDARD';
    const packingType = this.bookingForm.get('packingType')?.value || 'BASIC';
    
    // Weight charge calculation - weight is now in grams, apply 0.02 multiplier
    this.parcelWeightInGram = weight || 0; // Weight is already in grams
    this.weightCharge = this.parcelWeightInGram * 0.02; // 2% of weight in grams
    
    // Delivery charge calculation
    switch (deliveryType) {
      case 'STANDARD':
        this.deliveryCharge = 100;
        break;
      case 'EXPRESS':
        this.deliveryCharge = 200;
        break;
      case 'SAME_DAY':
        this.deliveryCharge = 300;
        break;
      default:
        this.deliveryCharge = 100;
    }
    
    // Packing charge calculation
    switch (packingType) {
      case 'BASIC':
        this.packingCharge = 50;
        break;
      case 'PREMIUM':
        this.packingCharge = 150;
        break;
      default:
        this.packingCharge = 50;
    }
    
    this.subtotal = this.baseRate + this.weightCharge + this.deliveryCharge + this.packingCharge + this.adminFee;
    this.taxAmount = this.subtotal * 0.18; // 18% GST
    this.calculatedCost = this.subtotal + this.taxAmount;
  }

  getDeliveryTypeName(): string {
    const deliveryType = this.bookingForm.get('deliveryType')?.value;
    switch (deliveryType) {
      case 'STANDARD': return 'Standard Delivery';
      case 'EXPRESS': return 'Express Delivery';
      case 'SAME_DAY': return 'Same Day Delivery';
      default: return 'Standard Delivery';
    }
  }

  getPackingTypeName(): string {
    const packingType = this.bookingForm.get('packingType')?.value;
    switch (packingType) {
      case 'BASIC': return 'Basic Packing';
      case 'PREMIUM': return 'Premium Packing';
      default: return 'Basic Packing';
    }
  }

  combineDateTime(date: Date, time: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T${time}:00.000`;
  }

  createBooking() {
    if (this.bookingForm.valid) {
      this.isLoading = true;
      
      // Convert form data to backend expected format
      const bookingData = {
        receiverName: this.bookingForm.get('receiverName')?.value,
        receiverAddress: this.bookingForm.get('receiverAddress')?.value,
        receiverPin: this.bookingForm.get('receiverPin')?.value,
        receiverMobile: this.bookingForm.get('receiverMobile')?.value,
        parcelWeightInGram: parseInt(this.bookingForm.get('parcelWeight')?.value), // Convert to integer
        parcelContentsDescription: this.bookingForm.get('parcelDescription')?.value,
        parcelDeliveryType: this.bookingForm.get('deliveryType')?.value,
        parcelPackingPreference: this.bookingForm.get('packingType')?.value,
        parcelPickupTime: this.bookingForm.get('pickupDate')?.value ? this.combineDateTime(this.bookingForm.get('pickupDate')?.value, '09:00') : null,
        parcelDropoffTime: this.bookingForm.get('dropoffDate')?.value ? this.combineDateTime(this.bookingForm.get('dropoffDate')?.value, '18:00') : null
      };

      this.bookingService.createOfficerBooking(bookingData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.snackBar.open('Booking created successfully! Redirecting to payment...', 'Close', { 
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/officer/payment'], {
              queryParams: { 
                bookingId: response.booking?.bookingId,
                amount: this.calculatedCost,
                customerName: this.currentUser?.officerName || 'Officer',
                receiverName: this.bookingForm.get('receiverName')?.value,
                receiverAddress: this.bookingForm.get('receiverAddress')?.value
              }
            });
          } else {
            this.snackBar.open(response.message || 'Booking creation failed', 'Close', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          
          let errorMessage = 'Failed to create booking. Please try again.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.status === 401) {
            errorMessage = 'Authentication failed. Please login again.';
          } else if (error.status === 400) {
            if (error.error && error.error.errors) {
              const validationErrors = error.error.errors.map((err: any) => err.defaultMessage || err.message).join(', ');
              errorMessage = `Validation errors: ${validationErrors}`;
            } else {
              errorMessage = 'Invalid booking data. Please check all fields.';
            }
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
          
          this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }
} 