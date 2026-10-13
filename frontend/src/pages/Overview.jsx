import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserPlus, Building2 } from 'lucide-react';

export default function Overview({ onNavigate }) {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    departments: 0,
    recent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees');
        const employees = res.data;
        
        // Calculate metrics
        const activeCount = employees.filter(e => e.status === 'Active').length;
        const uniqueDepts = new Set(employees.map(e => e.department)).size;
        
        // Get 5 most recently hired employees
        const recentHires = [...employees]
          .sort((a, b) => new Date(b.hire_date) - new Date(a.hire_date))
          .slice(0, 5);

        setStats({
          total: employees.length,
          active: activeCount,
          departments: uniqueDepts,
          recent: recentHires
        });
      } catch (err) {
        console.error("Failed to fetch overview stats:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back!</h2>
        <p className="text-sm text-slate-500 mt-1">Here is what's happening across your organization today.</p>
      </div>

      {loading ? (
        <div className="text-slate-400 text-sm">Loading dashboard data...</div>
      ) : (
        <>
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Employees</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCheck className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Active Staff</p>
                <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Building2 className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Departments</p>
                <p className="text-2xl font-bold text-slate-900">{stats.departments}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl border border-blue-500 shadow-sm flex flex-col justify-center text-white relative overflow-hidden">
              <UserPlus className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10" />
              <p className="text-sm font-medium text-blue-100 relative z-10">Quick Action</p>
              <button 
                onClick={() => onNavigate('employees', 'add')}
                className="mt-2 w-fit px-4 py-2 bg-white text-blue-700 text-xs font-bold rounded-lg shadow-sm hover:bg-blue-50 transition relative z-10"
              >
                + Add Employee
              </button>
            </div>
          </div>

          {/* Recent Hires Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:w-2/3">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Recent Hires</h3>
              <button onClick={() => onNavigate('employees', 'directory')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
            </div>
            <div className="divide-y divide-slate-100">
              {stats.recent.map((emp) => (
                <div key={emp.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {getInitials(emp.full_name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{emp.full_name}</p>
                      <p className="text-xs text-slate-500">{emp.job_title} • {emp.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">Hired</p>
                    <p className="text-xs text-slate-500">{formatDate(emp.hire_date)}</p>
                  </div>
                </div>
              ))}
              {stats.recent.length === 0 && (
                <div className="px-6 py-8 text-center text-slate-500 text-sm">No recent hires found.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}