import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { PRIMENG_MODULES } from '../../primeng-modules';
import { DialogService } from 'primeng/dynamicdialog';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  imports: [CommonModule, PRIMENG_MODULES],
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[]=[];
  selectedItem?: Expense;

  constructor(
    private expenseService: ExpenseService,
    private dialog: DialogService,
  ) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

  editExpense(expense: Expense) {
    const dialog = this.dialog.open(ExpenseFormComponent, {
      header: 'hi',
      data: {expense},
    })
  } 
// up to here thinking about opening a dialog to edit the items wanted to reuse the form but dont think we can
  deleteExpense(id: number) {
  this.expenseService.deleteExpense(id).subscribe(() => {
    this.loadExpenses();
    });
  }
}