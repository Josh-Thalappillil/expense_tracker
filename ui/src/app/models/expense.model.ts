export interface Expense {
  id: number;
  amount: string;
  category: number;
  category_color: string;
  category_name: string;
  created_at: string;
  updated_at: string;
  currency: string;
  date: string;
  description: string;
  is_recurring: boolean;
  payment_method: string;
  receipt: string | null;
}