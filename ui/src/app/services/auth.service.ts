import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private readonly baseURL = environment.baseUrl;

    constructor(
        private http: HttpClient, 
        private router: Router
    ) {
    }

    login(username: string, password: string): Observable<any> {
        const loginData = { username, password };
        return this.http.post(`${this.baseURL}/api/token/`, loginData);
    }
    saveTokens(access: string, refresh: string): void {
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);
      }
    
      logout(): void {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);
      }
    
      isLoggedIn(): boolean {
        return !!sessionStorage.getItem('access_token');
      }
    
}