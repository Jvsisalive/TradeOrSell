import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            localStorage.setItem('user', formData.email);
        } else {
            localStorage.setItem('user', formData.name);
        }
        navigate('/list');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
                <div className="w-1/2 bg-indigo-700 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -ml-20 -mt-20 opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-600 rounded-full -mr-16 -mb-16 opacity-50"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold mb-4">TradeApp</h1>
                        <p className="text-indigo-200 text-lg mb-8">Buy, Sell, and Manage Products Online.</p>
                        <div className="bg-indigo-800/50 p-6 rounded-xl backdrop-blur">
                            <h3 className="font-semibold mb-2">Demo Credentials</h3>
                            <p className="text-sm text-indigo-200">Email: admin@tradeapp.com</p>
                            <p className="text-sm text-indigo-200">Password: password123</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-md font-semibold transition ${isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>Login</button>
                        <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-md font-semibold transition ${!isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>Register</button>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-gray-500 mb-8">{isLogin ? 'Please sign in to continue.' : 'Fill in details to get started.'}</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="John Doe" />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}