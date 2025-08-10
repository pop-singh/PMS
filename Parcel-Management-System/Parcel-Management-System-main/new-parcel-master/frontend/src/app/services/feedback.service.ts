import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback, FeedbackResponse, FeedbackPage } from '../models/feedback.model';

/**
 * Feedback Service
 * 
 * This service handles all feedback-related operations in the frontend application.
 * It communicates with the backend API to manage customer feedback, ratings,
 * and reviews for the courier service.
 * 
 * Key Concepts:
 * - @Injectable: Marks this class as a service that can be injected into components
 * - providedIn: 'root' - Makes this service available throughout the entire application
 * - HttpClient: Angular service for making HTTP requests to the backend
 * - Observable: RxJS concept for handling asynchronous data streams
 * - Pagination: Handles large lists of feedback with page-based navigation
 * 
 * Service Responsibilities:
 * 1. Retrieve all feedback for officers to review
 * 2. Add new feedback from customers
 * 3. Manage feedback pagination
 * 4. Handle authentication headers for API calls
 * 5. Process feedback submission and retrieval
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  /**
   * Base URL for feedback API endpoints
   * Points to the Spring Boot backend server
   */
  private baseUrl = 'http://localhost:8080/api/feedback';

  /**
   * Constructor - injects HttpClient for making API calls
   * 
   * @param http Angular's HTTP client for making requests to backend
   */
  constructor(private http: HttpClient) { }

  /**
   * Creates HTTP headers for API requests with authentication
   * 
   * This method:
   * 1. Checks for customer token first
   * 2. Falls back to officer token if customer token not found
   * 3. Creates headers with the appropriate authentication token
   * 
   * @returns HttpHeaders object with JSON content type and authorization token
   */
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

  /**
   * Get all feedback with pagination (for officers)
   * 
   * Retrieves all feedback in the system with pagination support.
   * This allows officers to review customer feedback and ratings.
   * 
   * @param page Page number (0-based)
   * @param size Number of feedback items per page
   * @returns Observable that emits paginated feedback data
   */
  getAllFeedbacks(page: number, size: number): Observable<FeedbackPage> {
    const url = `${this.baseUrl}/officer/all?page=${page}&size=${size}`;
    return this.http.get<FeedbackPage>(url, { headers: this.getHeaders() });
  }

  /**
   * Add new feedback from a customer
   * 
   * Submits new feedback including rating, comments, and booking reference.
   * This allows customers to provide their experience and ratings.
   * 
   * @param feedbackRequest Feedback data including rating, comments, booking ID, etc.
   * @returns Observable that emits the feedback submission response
   */
  addFeedback(feedbackRequest: any): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(`${this.baseUrl}/add`, feedbackRequest, { headers: this.getHeaders() });
  }
} 