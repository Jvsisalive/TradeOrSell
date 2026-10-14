import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ListItems() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">TradeApp</h1>
                <div className="flex gap-4">
                    <Link to="/trade/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Add Product</Link>
                    <Link to="/delete" className="bg-red-500 text-white px-4 py-2 rounded-lg">Manage</Link>
                    <button onClick={handleLogout} className="text-gray-500">Logout</button>
                </div>
            </nav>
            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h2>
                
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No products available. Add one to get started.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow p-4">
                                <img src={product.image_url || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                                    <Link to={`/trade/${product.id}`} className="text-sm bg-gray-100 px-3 py-1 rounded">Edit</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}