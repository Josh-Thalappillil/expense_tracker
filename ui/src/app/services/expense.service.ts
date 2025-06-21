import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl + 'expenses/');
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl + 'expenses/', expense);
  }

  updateExpense(id: number, expense: any): Observable<any> {
    return this.http.put(this.apiUrl + `expenses/${id}/`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `expenses/${id}/`);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'categories/');
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl + 'categories/', category);
  }
}