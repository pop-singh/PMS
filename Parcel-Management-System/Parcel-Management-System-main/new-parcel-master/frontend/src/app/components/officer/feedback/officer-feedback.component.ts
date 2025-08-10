import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback, FeedbackPage } from '../../../models/feedback.model';
import { NavbarComponent } from '../../shared/navbar.component';

@Component({
  selector: 'app-officer-feedback',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NavbarComponent
  ],
  template: `
    <!-- Navigation -->
    <app-navbar type="officer" theme="officer"></app-navbar>

    <div class="feedback-container">
      <div class="feedback-content">
        <div class="feedback-header">
          <h1 class="feedback-title">View Feedback</h1>
          <p class="feedback-subtitle">View and manage customer feedback</p>
        </div>

        <mat-card class="feedback-card">
          <mat-card-header>
            <mat-card-title>Customer Feedback</mat-card-title>
            <mat-card-subtitle>View all customer feedback and ratings</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <!-- Feedback Table -->
            <div class="table-container">
              <table mat-table [dataSource]="feedbacks" class="feedback-table">
                <ng-container matColumnDef="orderId">
                  <th mat-header-cell *matHeaderCellDef>Order ID</th>
                  <td mat-cell *matCellDef="let feedback">{{ feedback.booking?.bookingId }}</td>
                </ng-container>

                <ng-container matColumnDef="customerName">
                  <th mat-header-cell *matHeaderCellDef>Customer Name</th>
                  <td mat-cell *matCellDef="let feedback">{{ feedback.customer?.customerName }}</td>
                </ng-container>

                <ng-container matColumnDef="description">
                  <th mat-header-cell *matHeaderCellDef>Feedback Description</th>
                  <td mat-cell *matCellDef="let feedback">
                    <div class="description-cell">
                      {{ feedback.feedbackDescription }}
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef>Rating</th>
                  <td mat-cell *matCellDef="let feedback">
                    <div class="rating-display">
                      <mat-icon *ngFor="let star of getStars(feedback.rating)" class="star-icon">
                        star
                      </mat-icon>
                      <span class="rating-text">{{ feedback.rating }}/5</span>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="dateTime">
                  <th mat-header-cell *matHeaderCellDef>Date & Time</th>
                  <td mat-cell *matCellDef="let feedback">{{ feedback.createdAt | date:'medium' }}</td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let feedback">
                    <button mat-button class="action-btn view-btn" (click)="viewFeedback(feedback)">
                      <mat-icon>visibility</mat-icon>
                      View
                    </button>
                    <button mat-button class="action-btn respond-btn" (click)="respondToFeedback(feedback)">
                      <mat-icon>reply</mat-icon>
                      Respond
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>

              <mat-paginator 
                [length]="totalElements"
                [pageSize]="pageSize"
                [pageIndex]="currentPage"
                [pageSizeOptions]="[5, 10, 25, 50]"
                (page)="onPageChange($event)">
              </mat-paginator>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .feedback-container {
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%);
      padding: 80px 20px 20px;
      position: relative;
    }

    .feedback-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .feedback-content {
      width: 100%;
      max-width: 1400px;
      position: relative;
      z-index: 2;
    }

    .feedback-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .feedback-title {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .feedback-subtitle {
      font-size: 1.1rem;
      color: #a0a0a0;
      margin: 0;
    }

    .feedback-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .feedback-card ::ng-deep .mat-mdc-card-header {
      margin-bottom: 30px;
    }

    .feedback-card ::ng-deep .mat-mdc-card-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .feedback-card ::ng-deep .mat-mdc-card-subtitle {
      font-size: 1.1rem;
      color: #a0a0a0;
      margin: 0;
    }

    .table-container {
      margin-top: 20px;
    }

    .feedback-table {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
    }

    .feedback-table ::ng-deep .mat-mdc-header-row {
      background: rgba(255, 107, 53, 0.1);
      border-bottom: 2px solid rgba(255, 107, 53, 0.2);
    }

    .feedback-table ::ng-deep .mat-mdc-header-cell {
      color: #ff6b35;
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .feedback-table ::ng-deep .mat-mdc-row {
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .feedback-table ::ng-deep .mat-mdc-row:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .feedback-table ::ng-deep .mat-mdc-cell {
      color: #e0e0e0;
      font-size: 0.9rem;
      padding: 16px 12px;
    }

    .feedback-table ::ng-deep .mat-mdc-cell:first-child {
      padding-left: 24px;
    }

    .feedback-table ::ng-deep .mat-mdc-cell:last-child {
      padding-right: 24px;
    }

    .rating-display {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star-icon {
      color: #ffd700;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .rating-text {
      margin-left: 8px;
      font-weight: 600;
      color: #ffd700;
    }

    .description-cell {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .action-btn {
      margin: 0 4px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .action-btn mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .view-btn {
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: #fff;
      border: none;
    }

    .view-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    }

    .respond-btn {
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      color: #fff;
      border: none;
    }

    .respond-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
    }

    .feedback-table ::ng-deep .mat-mdc-paginator {
      background: rgba(255, 255, 255, 0.05);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #e0e0e0;
    }

    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-page-size-label {
      color: #a0a0a0;
    }

    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-range-label {
      color: #a0a0a0;
    }

    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-navigation-previous,
    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-navigation-next {
      color: #ff6b35;
    }

    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-navigation-previous:hover,
    .feedback-table ::ng-deep .mat-mdc-paginator .mat-mdc-paginator-navigation-next:hover {
      background: rgba(255, 107, 53, 0.1);
    }

    @media (max-width: 768px) {
      .feedback-container {
        padding: 60px 20px 20px;
      }

      .feedback-card {
        padding: 30px 20px;
      }

      .feedback-title {
        font-size: 2rem;
      }

      .feedback-table ::ng-deep .mat-mdc-cell {
        padding: 12px 8px;
        font-size: 0.8rem;
      }

      .action-btn {
        margin: 2px;
        font-size: 0.7rem;
      }

      .description-cell {
        max-width: 200px;
      }
    }

    @media (max-width: 480px) {
      .feedback-title {
        font-size: 1.8rem;
      }

      .feedback-card {
        padding: 20px 15px;
      }
    }
  `]
})
export class OfficerFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  displayedColumns: string[] = ['orderId', 'customerName', 'description', 'rating', 'dateTime', 'actions'];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getAllFeedbacks(this.currentPage, this.pageSize).subscribe({
      next: (response: FeedbackPage) => {
        this.feedbacks = response.content || [];
        this.totalElements = response.totalElements || 0;
        this.currentPage = response.currentPage || 0;
      },
      error: (error) => {
        console.error('Error loading feedbacks:', error);
        this.snackBar.open('Failed to load feedbacks', 'Close', { duration: 3000 });
      }
    });
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadFeedbacks();
  }

  viewFeedback(feedback: any) {
    console.log('Viewing feedback:', feedback);
    this.snackBar.open(`Viewing feedback for booking ${feedback.booking?.bookingId}`, 'Close', { duration: 2000 });
  }

  respondToFeedback(feedback: any) {
    console.log('Responding to feedback:', feedback);
    this.snackBar.open(`Responding to feedback for booking ${feedback.booking?.bookingId}`, 'Close', { duration: 2000 });
  }
} 