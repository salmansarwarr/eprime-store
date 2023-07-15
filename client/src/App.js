import React from "react";
import Header from "./Containers/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./Containers/ProductListing";
import ProductDetail from "./Containers/ProductDetail";
import Create from "./Containers/Create";
import AdminPage from "./Containers/Admin";
import Edit from "./Containers/Edit";
import Orders from "./Containers/Orders";
import CreateOrder from "./Containers/CreateOrder";

function App() {
    return (
        <div className="App bg min-h-screen">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductListing />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductDetail />}
                    />
                    <Route path="/create" element={<Create />} />
                    <Route
                        path="*"
                        element={<h1>Error 404! page not found</h1>}
                    />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/edit/:productId" element={<Edit />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/create-order/:productId" element={<CreateOrder />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
