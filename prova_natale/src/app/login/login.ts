import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,    // Per *ngIf, *ngFor
    FormsModule,     // Per [(ngModel)]
    RouterLink       // Per routerLink se necessario
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email e password sono obbligatorie';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Email non valida';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.errorMessage = 'Email o password errati';
            break;
          case 'auth/too-many-requests':
            this.errorMessage = 'Account temporaneamente bloccato. Riprova più tardi';
            break;
          default:
            this.errorMessage = 'Errore durante il login. Riprova';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onRegister() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email e password sono obbligatorie';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'Email già registrata';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Email non valida';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'Password troppo debole';
            break;
          default:
            this.errorMessage = 'Errore durante la registrazione. Riprova';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
}