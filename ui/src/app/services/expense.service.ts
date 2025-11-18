import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = '/api/';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl + 'expenses/');
  }

  addExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl + 'expenses/', expense);
  }

  updateExpense(id: number, expense: Partial<Expense>): Observable<Expense> {
    return this.http.put<Expense>(this.apiUrl + `expenses/${id}/`, expense);
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