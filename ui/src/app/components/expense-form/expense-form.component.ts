import { Component, OnInit, Input, Optional } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./expense-form.component.css']
  
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense?: Expense;
  categories: any[] = [];
  selectedFile: File | null = null;
  form: FormGroup;
  
  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private fb: FormBuilder,
    @Optional() private config?: DynamicDialogConfig,
    @Optional() private dialogRef?: DynamicDialogRef,
  ) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      category: [null, Validators.required],
      description: [''],
      receipt: [null]
    });
  }

  ngOnInit() {
    this.loadCategories();
    // Support both router-driven usage (expense passed as @Input)
    // and DialogService usage (data passed via DynamicDialogConfig.data)
    const dialogExpense = this.config?.data?.expense;
    const sourceExpense = this.expense ?? dialogExpense;
    if (sourceExpense) {
      const e = sourceExpense as Expense;
      this.expense = e;
      // Patch form with existing expense when editing
      this.form.patchValue({
        amount: e.amount,
        date: e.date,
        category: e.category,
        description: e.description,
      });
    }
  }

  loadCategories(){
    this.expenseService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories)
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // store filename / placeholder in form control; actual upload handled in service
      this.form.patchValue({ receipt: this.selectedFile.name });
    }
  }
  saveExpense() {
    const payload = { ...(this.expense ?? {}), ...this.form.value } as Expense;
    if (this.expense && this.expense.id) {
      this.expenseService.updateExpense(this.expense.id, payload).subscribe(() => {
        if (this.dialogRef) {
          this.dialogRef.close(payload);
        } else {
          this.router.navigate(['/expenses']);
        }
      });
    } else {
      this.expenseService.addExpense(payload).subscribe((created) => {
        if (this.dialogRef) {
          this.dialogRef.close(created);
        } else {
          this.router.navigate(['/expenses']);
        }
      });
    }
  }
}