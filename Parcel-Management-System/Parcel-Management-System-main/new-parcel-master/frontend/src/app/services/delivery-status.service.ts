import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryStatusService {
  private baseUrl = 'http://localhost:8080/api/delivery-status';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    // Try to get customer token first, then officer token
    const customerToken = localStorage.getItem('customer_token');
    const officerToken = localStorage.getItem('officer_token');
    const token = customerToken || officerToken;
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  updateDeliveryStatus(bookingId: string, status: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${bookingId}`, 
      { status }, 
      { headers: this.getHeaders() }
    );
  }

  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${bookingId}`, 
      { headers: this.getHeaders() }
    );
  }
} 