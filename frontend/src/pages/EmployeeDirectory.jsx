import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, RotateCcw, Plus, Eye, Edit2, Trash2, X, Mail, Phone, Building2, Briefcase, Calendar, MapPin } from 'lucide-react';

const DEPARTMENT_BADGES = {
  Engineering: 'bg-blue-50 text-blue-700 border-blue-200',
  Marketing: 'bg-rose-50 text-rose-700 border-rose-200',
  'Human Resources': 'bg-amber-50 text-amber-700 border-amber-200',
  Finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Sales: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  Operations: 'bg-purple-50 text-purple-700 border-purple-200',
  IT: 'bg-cyan-50 text-cyan-700 border-cyan-200'
};

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

export default function EmployeeDirectory({ onAddEmployeeClick }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states for View, Edit, and Delete
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/employees', {
        params: { search, department }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees();
    }, 250);
    return () => clearTimeout(delayDebounceFn);
  }, [search, department]);

  // Reset page to 1 whenever filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, statusFilter, itemsPerPage]);

  const handleReset = () => {
    setSearch('');
    setDepartment('All Departments');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle Edit Save
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setEditError('');
    try {
      await axios.put(`http://localhost:8000/api/employees/${editingEmployee.id}`, editingEmployee);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      setEditError(err.response?.data?.detail || 'Failed to update employee.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deletingEmployee) return;
    setActionLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/employees/${deletingEmployee.id}`);
      setDeletingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    statusFilter === 'All Status' ? true : emp.status === statusFilter
  );

  // Pagination calculations
  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs font-medium text-slate-400 mb-1">
            Employees <span className="mx-1">›</span> <span className="text-slate-600">Employee Directory</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">Search, filter and view all employee records.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onAddEmployeeClick}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add New Employee
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, job title or phone..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Department:</span>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="All Departments">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Total Employees: {totalItems}</span>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            Show
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-slate-200 rounded px-2 py-0.5 text-xs bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            per page
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Hire Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-slate-400">Loading records...</td>
                </tr>
              ) : paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-slate-400">No employees found matching criteria.</td>
                </tr>
              ) : (
                paginatedEmployees.map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-medium">{startIndex + idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                          {getInitials(emp.full_name)}
                        </div>
                        <span className="font-semibold text-slate-900">{emp.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{emp.email}</td>
                    <td className="py-3 px-4 text-slate-600">{emp.phone_number}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md font-medium text-[11px] border ${DEPARTMENT_BADGES[emp.department] || 'bg-slate-100 text-slate-600'}`}>
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-800">{emp.job_title}</td>
                    <td className="py-3 px-4 text-slate-600">{formatDate(emp.hire_date)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md border font-semibold text-[11px] ${
                        emp.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <button
                          onClick={() => setViewingEmployee(emp)}
                          title="View Details"
                          className="hover:text-blue-600 hover:bg-blue-50 rounded p-1.5 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditError('');
                            setEditingEmployee({ ...emp });
                          }}
                          title="Edit Employee"
                          className="hover:text-amber-600 hover:bg-amber-50 rounded p-1.5 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingEmployee(emp)}
                          title="Delete Employee"
                          className="hover:text-rose-600 hover:bg-rose-50 rounded p-1.5 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of {totalItems} employees
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
            >
              ‹
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ==================== 1. VIEW MODAL ==================== */}
      {viewingEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Employee Details</h3>
              <button onClick={() => setViewingEmployee(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center">
                  {getInitials(viewingEmployee.full_name)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{viewingEmployee.full_name}</h4>
                  <p className="text-slate-500">{viewingEmployee.job_title}</p>
                </div>
                <span className={`ml-auto px-2.5 py-0.5 rounded-md border font-semibold text-[11px] ${
                  viewingEmployee.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {viewingEmployee.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 font-medium">Email</p>
                    <p className="text-slate-800 font-semibold break-all">{viewingEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 font-medium">Phone</p>
                    <p className="text-slate-800 font-semibold">{viewingEmployee.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 font-medium">Department</p>
                    <p className="text-slate-800 font-semibold">{viewingEmployee.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 font-medium">Hire Date</p>
                    <p className="text-slate-800 font-semibold">{formatDate(viewingEmployee.hire_date)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium">Address</p>
                  <p className="text-slate-800 font-semibold">{viewingEmployee.address || 'No address provided'}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingEmployee(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. EDIT MODAL ==================== */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Edit Employee</h3>
              <button onClick={() => setEditingEmployee(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4 text-xs">
              {editError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                  {editError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.full_name}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.phone_number}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, phone_number: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    required
                    value={editingEmployee.department}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.job_title}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, job_title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hire Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEmployee.hire_date}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, hire_date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={editingEmployee.address || ''}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 3. DELETE CONFIRMATION MODAL ==================== */}
      {deletingEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Delete Employee Record?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to remove <span className="font-semibold text-slate-800">{deletingEmployee.full_name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <button
                onClick={() => setDeletingEmployee(null)}
                className="flex-1 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="flex-1 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}