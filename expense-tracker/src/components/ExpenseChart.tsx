import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ExpenseStats, DEFAULT_CATEGORIES } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  stats: ExpenseStats;
}

export function ExpenseChart({ stats }: ExpenseChartProps) {
  const getCategoryInfo = (categoryId: string) => {
    return DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[7];
  };

  // Prepare data for category pie chart
  const categoryData = {
    labels: Object.keys(stats.categoryTotals).map(id => {
      const category = getCategoryInfo(id);
      return `${category.icon} ${category.name}`;
    }),
    datasets: [
      {
        data: Object.values(stats.categoryTotals),
        backgroundColor: Object.keys(stats.categoryTotals).map(id => {
          const category = getCategoryInfo(id);
          return category.color;
        }),
        borderWidth: 0,
      },
    ],
  };

  // Prepare data for daily spending bar chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyData = {
    labels: last7Days.map(date => {
      return new Date(date).toLocaleDateString('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
      });
    }),
    datasets: [
      {
        label: 'Chi tiêu (VNĐ)',
        data: last7Days.map(date => stats.dailyExpenses[date] || 0),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed || context.raw;
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(value);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              notation: 'compact',
            }).format(value);
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (Object.keys(stats.categoryTotals).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Chưa có dữ liệu biểu đồ</h3>
        <p className="text-gray-500">Thêm một số chi tiêu để xem biểu đồ!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Distribution Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🥧</span>
          Phân Bố Chi Tiêu Theo Danh Mục
        </h3>
        <div className="w-full h-64">
          <Doughnut data={categoryData} options={doughnutOptions} />
        </div>
      </div>

      {/* Daily Spending Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📈</span>
          Chi Tiêu 7 Ngày Gần Đây
        </h3>
        <div className="w-full h-64">
          <Bar data={dailyData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
