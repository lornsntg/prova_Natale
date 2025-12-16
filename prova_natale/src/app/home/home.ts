import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
AuthService

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,    // Per *ngIf, *ngFor
    FormsModule,     // Per [(ngModel)]
    RouterLink       // Per routerLink se necessario
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  userEmail: string | null = null;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userEmail = user.email;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.loading = true;
    
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Errore durante il logout:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  refreshUser() {
    const user = this.authService.getCurrentUser();
    this.userEmail = user ? user.email : null;
  }
}