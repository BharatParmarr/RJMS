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
import Room_view from "./templates/Room_view";
import PaymentsHistory from "./templates/PaymentsHistory";
import Meals_list from "./templates/Meals_list";
import Notice_bord from "./templates/Notice_bord";
import Settings from "./templates/Settings";
import Settings_restorant from "./templates/Settings_restorant";
import Settings_shop from "./Service_templates.tsx/Service_settings";
import Oauth from './templates/components/Oauth_consent_screen'
import Fandq from "./templates/FandQ";
import Service_home from "./Service_templates.tsx/Service_home";
import Service_shop_create from "./Service_templates.tsx/Service_shop_create";
import Shop_view from "./Service_templates.tsx/shop_view";
import Create_table_shop from "./Service_templates.tsx/create_table_shop";
import Restroant_view_shop from "./Service_templates.tsx/Shop_table_view";
import Services_Orders_view from "./Service_templates.tsx/Service_Orders";
import NotFound from "./Static/404";
import Coustemer_view_Home from "./Coustemer_view/Coustemer_view_Home";
import Restorant_home_view from "./templates/Restoratn_home_view";
import MenuBook from "./templates/components/MenuBook";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<App />} />
          <Route path="/auth" element={<Oauth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<Otp_verification />} />
          <Route path="/create-restaurant" element={<Create_restorant />} />
          <Route path="/restorant/:id" element={<Restorant_table_list />} />
          <Route path="/restorant/home/:id" element={<Restorant_home_view />} />
          <Route path="/restorant/table/:id/:table_id" element={<Restroant_view />} />
          <Route path="/Shop/table/:id/:table_id" element={<Restroant_view_shop />} />
          <Route path="/restorant/Manage/:id" element={<Create_table />} />
          <Route path="/Shop/Manage/:id" element={<Create_table_shop />} />
          <Route path="/Orders_view/:id" element={<Orders_view />} />
          <Route path="/Shop/Orders/:id" element={<Services_Orders_view />} />
          <Route path="/data-analysis/:id" element={<Data_anlysis />} />
          <Route path="/pricing" element={<Pricing_page />} />
          <Route path="/order-history/:id" element={<Order_history />} />
          <Route path="/inventory/:id" element={<Inventory />} />
          <Route path="/restorant/Settings/:id" element={<Settings_restorant />} />
          <Route path="/Shop/Settings/:id" element={<Settings_shop />} />
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/create" element={<HostelForm />} />
          <Route path="/hostels/room/:id/:roomid/:room_name" element={<Room_view />} />
          <Route path="/hostels/:id" element={<Hostel_view />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/create" element={<RoomForm />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/create" element={<StudentForm />} />
          <Route path="/hostels/pyments/:id" element={<PaymentsHistory />} />
          <Route path="/hostels/Meals/:id" element={<Meals_list />} />
          <Route path="/hostels/NoticeBord/:id" element={<Notice_bord />} />
          <Route path="/hostels/Settings/:id" element={<Settings />} />
          <Route path="/Service-shop" element={<Service_home />} />
          <Route path="/Service-shop/:id" element={<Shop_view />} />
          <Route path="/Service-shop/create" element={<Service_shop_create />} />
          {/* coustemer views */}
          <Route path="/Coustemer" element={<Coustemer_view_Home />} />
          <Route path="/MenuPage" element={<MenuBook />} />
          {/* pages */}
          <Route path="/F&Q" element={<Fandq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);