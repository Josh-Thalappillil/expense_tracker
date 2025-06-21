import { Component, OnInit, Input } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  imports: [CommonModule, FormsModule, NavbarComponent],
  styleUrls: ['./expense-form.component.css']
  
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense: any = {};
  categories: any[] = [];
  selectedFile: File | null = null;
  
  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit() {
    this.expenseService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  saveExpense() {
    if (this.expense.id) {
      this.expenseService.updateExpense(this.expense.id, this.expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    } else {
      this.expenseService.addExpense(this.expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    }
  }
}