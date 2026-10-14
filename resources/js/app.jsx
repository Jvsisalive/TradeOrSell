import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ListItems from './pages/ListItems';
import Trade from './pages/Trade';
import DeleteItem from './pages/DeleteItem';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/list" element={<ListItems />} />
                <Route path="/trade/:id" element={<Trade />} />
                <Route path="/delete" element={<DeleteItem />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);