import React, { useState } from 'react';
import { User, Mail, Building, Bell, Lock, Globe, Shield } from 'lucide-react';

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-medium text-slate-400 mb-1">
          Overview <span className="mx-1">›</span> <span className="text-slate-600">Settings</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage your profile, preferences, and security.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Personal Information</h3>
          </div>
          <div className="p-6 flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-indigo-600 text-white font-bold text-3xl flex items-center justify-center shadow-md border-4 border-indigo-50">
                RK
              </div>
              <button className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                Change Photo
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed">
                  <User className="w-4 h-4 text-slate-400" />
                  Ramesh Kalyanam
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed">
                  <Mail className="w-4 h-4 text-slate-400" />
                  ramesh.kalyanam@brixigo.com
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Job Title</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed">
                  <Shield className="w-4 h-4 text-slate-400" />
                  HR Manager (Administrator)
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Department</label>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed">
                  <Building className="w-4 h-4 text-slate-400" />
                  Human Resources
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Application Preferences</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email Notifications</p>
                  <p className="text-xs text-slate-500 mt-0.5">Receive daily summaries of new hires and employee updates.</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${emailNotifs ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Timezone</p>
                  <p className="text-xs text-slate-500 mt-0.5">Set your local timezone for accurate hire dates.</p>
                </div>
              </div>
              <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500">
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Security</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Password</p>
                  <p className="text-xs text-slate-500 mt-0.5">Last changed 3 months ago.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}