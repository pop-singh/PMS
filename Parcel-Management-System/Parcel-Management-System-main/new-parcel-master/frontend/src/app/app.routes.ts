import { Routes } from '@angular/router';
import { CustomerGuard } from './guards/customer.guard';
import { OfficerGuard } from './guards/officer.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  
  // Customer routes
  { path: 'customer/dashboard', loadComponent: () => import('./components/customer/dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent), canActivate: [CustomerGuard] },
  { path: 'customer/booking', loadComponent: () => import('./components/customer/booking/booking.component').then(m => m.BookingComponent), canActivate: [CustomerGuard] },
  { path: 'customer/payment', loadComponent: () => import('./components/customer/payment/payment.component').then(m => m.PaymentComponent), canActivate: [CustomerGuard] },
  { path: 'customer/payment-success', loadComponent: () => import('./components/customer/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent), canActivate: [CustomerGuard] },
  { path: 'customer/tracking', loadComponent: () => import('./components/customer/tracking/tracking.component').then(m => m.TrackingComponent), canActivate: [CustomerGuard] },
  { path: 'customer/previous-bookings', loadComponent: () => import('./components/customer/previous-bookings/previous-bookings.component').then(m => m.PreviousBookingsComponent), canActivate: [CustomerGuard] },
  { path: 'customer/cancel-booking', loadComponent: () => import('./components/customer/cancel-booking/cancel-booking.component').then(m => m.CancelBookingComponent), canActivate: [CustomerGuard] },
  { path: 'customer/feedback', loadComponent: () => import('./components/customer/feedback/feedback.component').then(m => m.FeedbackComponent), canActivate: [CustomerGuard] },
  { path: 'customer/profile', loadComponent: () => import('./components/customer/profile/customer-profile.component').then(m => m.CustomerProfileComponent), canActivate: [CustomerGuard] },
  { path: 'customer/contact-support', loadComponent: () => import('./components/customer/contact-support/contact-support.component').then(m => m.ContactSupportComponent), canActivate: [CustomerGuard] },
  
  // Officer routes
  { path: 'officer/dashboard', loadComponent: () => import('./components/officer/dashboard/officer-dashboard.component').then(m => m.OfficerDashboardComponent), canActivate: [OfficerGuard] },
  { path: 'officer/tracking', loadComponent: () => import('./components/officer/tracking/officer-tracking.component').then(m => m.OfficerTrackingComponent), canActivate: [OfficerGuard] },
  { path: 'officer/delivery-status', loadComponent: () => import('./components/officer/delivery-status/delivery-status.component').then(m => m.DeliveryStatusComponent), canActivate: [OfficerGuard] },
  { path: 'officer/pickup-scheduling', loadComponent: () => import('./components/officer/pickup-scheduling/pickup-scheduling.component').then(m => m.PickupSchedulingComponent), canActivate: [OfficerGuard] },
  { path: 'officer/all-bookings', loadComponent: () => import('./components/officer/all-bookings/all-bookings.component').then(m => m.AllBookingsComponent), canActivate: [OfficerGuard] },
  { path: 'officer/booking', loadComponent: () => import('./components/officer/booking/officer-booking.component').then(m => m.OfficerBookingComponent), canActivate: [OfficerGuard] },
  { path: 'officer/payment', loadComponent: () => import('./components/officer/payment/officer-payment.component').then(m => m.OfficerPaymentComponent), canActivate: [OfficerGuard] },
  { path: 'officer/payment-success', loadComponent: () => import('./components/officer/payment-success/officer-payment-success.component').then(m => m.OfficerPaymentSuccessComponent), canActivate: [OfficerGuard] },
  { path: 'officer/invoice', loadComponent: () => import('./components/officer/invoice/officer-invoice.component').then(m => m.OfficerInvoiceComponent), canActivate: [OfficerGuard] },
  { path: 'officer/cancel-booking', loadComponent: () => import('./components/officer/cancel-booking/officer-cancel-booking.component').then(m => m.OfficerCancelBookingComponent), canActivate: [OfficerGuard] },
  { path: 'officer/feedback', loadComponent: () => import('./components/officer/feedback/officer-feedback.component').then(m => m.OfficerFeedbackComponent), canActivate: [OfficerGuard] },
  { path: 'officer/profile', loadComponent: () => import('./components/officer/profile/officer-profile.component').then(m => m.OfficerProfileComponent), canActivate: [OfficerGuard] },
]; 