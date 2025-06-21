import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  // Sign In
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // Sign Up
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Get Token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Save Token
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Remove Token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Refresh Token (if you have refresh token API)
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {});
  }
}
