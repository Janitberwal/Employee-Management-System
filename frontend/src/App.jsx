import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddEmployee from './pages/AddEmployee';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Departments from './pages/Departments';
import Overview from './pages/Overview';
import Reports from './pages/Reports';
import Settings from './pages/Settings';


export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); 
  const [currentView, setCurrentView] = useState('directory'); // 'directory' or 'add' for the Employees tab

  // Navigation handler to allow child components to switch tabs
  const handleNavigate = (tab, view = 'directory') => {
    setActiveTab(tab);
    setCurrentView(view);
  };

  // Placeholder for modules that are not fully built yet
  const renderPlaceholder = (title, Icon) => (
    <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-120px)] animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{title} Dashboard</h2>
      <p className="text-sm text-slate-500 max-w-md text-center">
        The {title.toLowerCase()} module is currently under development. Please check back later or navigate to the Overview tab.
      </p>
      <button 
        onClick={() => handleNavigate('overview')}
        className="mt-8 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
      >
        Go to Overview
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => handleNavigate(tab)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'overview' ? (
            <Overview onNavigate={handleNavigate} />
          ) : activeTab === 'employees' ? (
            currentView === 'add' ? (
              <AddEmployee onViewDirectory={() => setCurrentView('directory')} />
            ) : (
              <EmployeeDirectory onAddEmployeeClick={() => setCurrentView('add')} />
            )
          ) : activeTab === 'departments' ? (
            <Departments />
          ) : activeTab === 'reports' ? (
            <Reports />
          ) : activeTab === 'settings' ? (
            <Settings />
          ) : null}
        </main>
      </div>
    </div>
  );
}