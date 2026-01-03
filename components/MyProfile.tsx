
import React from 'react';
import { Mail, Phone, Building, BadgeCheck, Calendar, Camera } from 'lucide-react';

const MyProfile: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-light text-gray-900 tracking-tight">MY <span className="font-bold">PROFILE</span></h1>
            <p className="text-gray-500 mt-2">Manage your account details and organization settings.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Cover/Avatar Section */}
            <div className="h-40 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative">
                <div className="absolute -bottom-14 left-8 group cursor-pointer">
                    <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold relative overflow-hidden">
                        DC
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-20 pb-10 px-8">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Dan Connerty</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-blue-600 font-semibold">Head Coach</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">Future Stars Series</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                         <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-colors">
                            Change Password
                        </button>
                        <button className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Information</h3>
                             <div className="flex-grow h-px bg-gray-100"></div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-5 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                                <div className="p-3 bg-white rounded-lg text-gray-400 shadow-sm border border-gray-100">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Email Address</p>
                                    <p className="text-sm font-semibold text-gray-900">dan.connerty@futurestarsseries.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                                <div className="p-3 bg-white rounded-lg text-gray-400 shadow-sm border border-gray-100">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Phone Number</p>
                                    <p className="text-sm font-semibold text-gray-900">(555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                                <div className="p-3 bg-white rounded-lg text-gray-400 shadow-sm border border-gray-100">
                                    <Building size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Organization</p>
                                    <p className="text-sm font-semibold text-gray-900">Future Stars Series HQ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="space-y-8">
                         <div className="flex items-center gap-2">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Status</h3>
                             <div className="flex-grow h-px bg-gray-100"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl border border-blue-100 bg-blue-50/50 flex flex-col justify-between h-32">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg w-fit">
                                        <BadgeCheck size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-400 bg-white px-2 py-1 rounded-full">ACTIVE</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-blue-400 uppercase font-bold tracking-wider mb-1">Current Plan</p>
                                    <p className="text-lg font-bold text-gray-900">Professional Scout</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between h-32">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-white text-gray-400 rounded-lg w-fit border border-gray-100">
                                        <Calendar size={20} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Member Since</p>
                                    <p className="text-lg font-bold text-gray-900">January 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default MyProfile;
