export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  monthlyTotal: number;
  categoryTotals: { [key: string]: number };
  dailyExpenses: { [key: string]: number };
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Ăn uống', color: '#ef4444', icon: '🍽️' },
  { id: '2', name: 'Giao thông', color: '#3b82f6', icon: '🚗' },
  { id: '3', name: 'Mua sắm', color: '#8b5cf6', icon: '🛍️' },
  { id: '4', name: 'Giải trí', color: '#f59e0b', icon: '🎬' },
  { id: '5', name: 'Sức khỏe', color: '#10b981', icon: '💊' },
  { id: '6', name: 'Giáo dục', color: '#06b6d4', icon: '📚' },
  { id: '7', name: 'Nhà cửa', color: '#84cc16', icon: '🏠' },
  { id: '8', name: 'Khác', color: '#6b7280', icon: '💼' },
];
