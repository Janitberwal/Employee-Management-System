import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Users, Briefcase } from 'lucide-react';

const DEPARTMENT_COLORS = {
  Engineering: 'bg-blue-50 text-blue-600 border-blue-200',
  Marketing: 'bg-rose-50 text-rose-600 border-rose-200',
  'Human Resources': 'bg-amber-50 text-amber-600 border-amber-200',
  Finance: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Sales: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  Operations: 'bg-purple-50 text-purple-600 border-purple-200',
  IT: 'bg-cyan-50 text-cyan-600 border-cyan-200'
};

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

export default function Departments() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  };

  // Group employees by their department
  const departmentsData = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {});

  // Define the standard departments to ensure they show up even if empty
  const standardDepartments = [
    'Engineering', 'Marketing', 'Human Resources', 
    'Finance', 'Sales', 'Operations', 'IT'
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-medium text-slate-400 mb-1">
          Overview <span className="mx-1">›</span> <span className="text-slate-600">Departments</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Departments Overview</h2>
        <p className="text-xs text-slate-500 mt-0.5">View and manage teams across your organization.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          Loading departments data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardDepartments.map((deptName) => {
            const deptEmployees = departmentsData[deptName] || [];
            const activeCount = deptEmployees.filter(e => e.status === 'Active').length;

            return (
              <div key={deptName} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                {/* Card Header */}
                <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${DEPARTMENT_COLORS[deptName] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{deptName}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {deptEmployees.length} Total</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-600 font-medium">{activeCount} Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body - Employee List */}
                <div className="p-0 flex-1 overflow-y-auto max-h-[280px]">
                  {deptEmployees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-slate-400 text-xs">
                      <Briefcase className="w-6 h-6 mb-2 opacity-20" />
                      No employees assigned
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {deptEmployees.map((emp, idx) => (
                        <li key={emp.id} className="px-5 py-3 hover:bg-slate-50/80 transition flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                              {getInitials(emp.full_name)}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{emp.full_name}</p>
                              <p className="text-[11px] text-slate-500">{emp.job_title}</p>
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-300'}`} title={emp.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}