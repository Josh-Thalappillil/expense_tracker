import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ExpenseService } from '../services/expense.service';
import { PRIMENG_MODULES } from '../primeng-modules';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIMENG_MODULES, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  totalThisMonth = 0;
  topCategory = '';

  constructor(
    private authService: AuthService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((expenses: any[]) => {
      const now = new Date();
      const thisMonth = expenses.filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const summary: { [key: string]: number } = {};
      for (const exp of thisMonth) {
        const cat = exp.category_name || 'Uncategorized';
        summary[cat] = (summary[cat] || 0) + Number(exp.amount);
      }
      const labels = Object.keys(summary);
      const data = Object.values(summary);

      this.chartData = {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#3182ce', '#38b2ac', '#f6ad55', '#e53e3e', '#805ad5', '#ecc94b', '#319795', '#718096']
          }
        ]
      };

      this.chartOptions = {
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        responsive: true
      };

      this.totalThisMonth = data.reduce((a, b) => a + b, 0);
      const maxIdx = data.indexOf(Math.max(...data));
      this.topCategory = labels[maxIdx] || '';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}