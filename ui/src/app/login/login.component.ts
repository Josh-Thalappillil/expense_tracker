import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { PRIMENG_MODULES } from '../primeng-modules';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PRIMENG_MODULES], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveTokens(response.access, response.refresh);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}