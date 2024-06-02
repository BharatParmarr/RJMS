// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App'
import { Login, Signup } from './templates/login'
import Otp_verification from "./templates/Otp_verification";
import HomePage from "./templates/index";
import Create_restorant from "./templates/create_restorant";
import React from "react";
import Create_table from "./templates/create_table";
import Restroant_view from "./templates/Table_view_restoratn";
import Restorant_table_list from "./templates/Restoratn_table_list";
import Orders_view from "./templates/Orders_view";
import { ThemeProvider } from "./templates/styles/theme";
import Data_anlysis from "./templates/data_anlysis";
import Pricing_page from "./templates/pricing_page";
import Order_history from "./templates/Order_history";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<Otp_verification />} />
          <Route path="/create-restaurant" element={<Create_restorant />} />
          <Route path="/restorant/:id" element={<Restorant_table_list />} />
          <Route path="/restorant/table/:id/:table_id" element={<Restroant_view />} />
          <Route path="/restorant/Manage/:id" element={<Create_table />} />
          <Route path="/Orders_view/:id" element={<Orders_view />} />
          <Route path="/data-analysis/:id" element={<Data_anlysis />} />
          <Route path="/pricing" element={<Pricing_page />} />
          <Route path="/order-history/:id" element={<Order_history />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);