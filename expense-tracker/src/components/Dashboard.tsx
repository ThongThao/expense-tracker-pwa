import React from 'react';
import { ExpenseStats, DEFAULT_CATEGORIES } from '../types';

interface DashboardProps {
  stats: ExpenseStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getCategoryInfo = (categoryId: string) => {
    return DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[7];
  };

  const topCategories = Object.entries(stats.categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Tổng Chi Tiêu</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalExpenses)}</p>
            </div>
            <div className="text-4xl opacity-80">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Chi Tiêu Tháng Này</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.monthlyTotal)}</p>
            </div>
            <div className="text-4xl opacity-80">📅</div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📊</span>
          Top Danh Mục Chi Tiêu
        </h3>
        
        {topCategories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📈</div>
            <p>Chưa có dữ liệu chi tiêu</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topCategories.map(([categoryId, amount]) => {
              const category = getCategoryInfo(categoryId);
              const percentage = (amount / stats.totalExpenses) * 100;
              
              return (
                <div key={categoryId} className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{category.name}</span>
                      <span className="text-sm text-gray-600">{formatCurrency(amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: category.color 
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">⏱️</span>
          Hoạt Động Gần Đây
        </h3>
        
        {Object.keys(stats.dailyExpenses).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <p>Chưa có hoạt động nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(stats.dailyExpenses)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .slice(0, 7)
              .map(([date, amount]) => {
                const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit',
                });
                
                return (
                  <div key={date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{formattedDate}</span>
                    <span className="font-bold text-red-600">{formatCurrency(amount)}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
