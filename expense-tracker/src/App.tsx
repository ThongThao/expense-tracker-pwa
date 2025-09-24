import React, { useState, useEffect } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { ExpenseChart } from './components/ExpenseChart';
import { InstallPrompt } from './components/InstallPrompt';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const { expenses, addExpense, deleteExpense, stats } = useExpenses();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const tabs = [
    { id: 'dashboard', name: 'Tổng Quan', icon: '📊' },
    { id: 'add', name: 'Thêm Chi Tiêu', icon: '➕' },
    { id: 'list', name: 'Danh Sách', icon: '📋' },
    { id: 'charts', name: 'Biểu Đồ', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                💰 Expense Tracker
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              PWA • Offline Ready
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}
        
        {activeTab === 'add' && (
          <ExpenseForm onAddExpense={addExpense} />
        )}
        
        {activeTab === 'list' && (
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={deleteExpense} 
          />
        )}
        
        {activeTab === 'charts' && (
          <ExpenseChart stats={stats} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 Expense Tracker PWA. Hoạt động offline với Service Worker.
          </p>
        </div>
      </footer>

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}

export default App;
