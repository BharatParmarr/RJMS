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
import Inventory from "./templates/Inventory";
import HostelList from './templates/HostelList';
import HostelForm from './templates/HostelForm';
import RoomList from './templates/RoomList';
import RoomForm from './templates/RoomForm';
import StudentList from './templates/StudentList';
import StudentForm from './templates/StudentForm';
import Hostel_view from "./templates/Hostel_view";

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
          <Route path="/inventory/:id" element={<Inventory />} />
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/create" element={<HostelForm />} />
          <Route path="/hostels/:id" element={<Hostel_view />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/create" element={<RoomForm />} />
          {/* <Route path="/rooms/:id" element={<RoomForm />} /> */}
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/create" element={<StudentForm />} />
          {/* <Route path="/students/:id" element={<StudentForm />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);