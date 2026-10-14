import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Trade() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(!isNew);

    useEffect(() => {
        if (!isNew) {
            axios.get(`http://localhost:8000/api/products/${id}`)
                .then(res => {
                    setFormData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id, isNew]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isNew 
            ? 'http://localhost:8000/api/products' 
            : `http://localhost:8000/api/products/${id}`;
        const method = isNew ? 'post' : 'put';

        axios[method](url, formData)
            .then(() => navigate('/list'))
            .catch(err => console.error(err));
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{isNew ? 'List New Product' : 'Trade / Update Product'}</h2>
                <p className="text-gray-500 mb-8">{isNew ? 'Fill in the details to list your product.' : 'Update the details of your product.'}</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="e.g. Vintage Camera" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="Describe the product condition and details..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                            <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                            <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="0" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (Optional)</label>
                        <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">{isNew ? 'Create Product' : 'Save Changes'}</button>
                        <button type="button" onClick={() => navigate('/list')} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}