import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Login from "layouts/admin/login";
import NewProduct from "views/admin/newProduct";

const App = () => {
  const isUserSignedIn = !!localStorage.getItem('token');
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute beranda */}
        <Route path="/" element={<Navigate to={isUserSignedIn ? "/admin" : "/login"} />} />
        
        {/* Rute login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rute admin */}
        <Route path="/admin/*" element={isUserSignedIn ? <AdminLayout /> : <Navigate to="/login" />} />
        
        {/* Rute auth */}
        <Route path="/auth/*" element={<AuthLayout />} />
        
        {/* Rute RTL */}
        <Route path="/rtl/*" element={<RtlLayout />} />
        
        {/* Redirect rute beranda */}
        {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
