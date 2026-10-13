import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#e11d48', '#8b5cf6', '#06b6d4', '#f97316'];
const STATUS_COLORS = ['#10b981', '#94a3b8'];

export default function Reports() {
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

  // Process data for Department Bar Chart
  const departmentData = employees.reduce((acc, emp) => {
    const existing = acc.find(item => item.name === emp.department);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: emp.department, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count);

  // Process data for Status Pie Chart
  const statusData = [
    { name: 'Active', value: employees.filter(e => e.status === 'Active').length },
    { name: 'Inactive', value: employees.filter(e => e.status === 'Inactive').length }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-medium text-slate-400 mb-1">
          Overview <span className="mx-1">›</span> <span className="text-slate-600">Reports</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Workforce Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Visualize your employee data and organizational distribution.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500 text-sm">
          Generating reports...
        </div>
      ) : employees.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-slate-500 text-sm">
          Not enough data to generate reports. Please add employees.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Headcount Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">Headcount by Department</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: '500' }}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={50}>
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution Donut Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">Employment Status</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: '500' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#475569' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}