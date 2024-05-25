// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegisterRestaurant() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // data
  type Restorant = {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  const [restorants, setRestorants] = useState<Restorant[]>([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/restorants/', {
        name: name,
        address: address,
        phone: phone,
        email: email,
      });

      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    try {
      axios.get('http://127.0.0.1:8000/restorants/').then(response => {
        console.log(response.data.results);
        setRestorants(response.data.results);
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }, []);

  return (<>
    <p>
      {restorants.map((restorant) => (
        <div key={restorant.id}>
          <p>{restorant.name}</p>
          <p>{restorant.address}</p>
          <p>{restorant.phone}</p>
          <p>{restorant.email}</p>
        </div>
      ))}
    </p>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      {/* phone, email, website, logo */}
      <label >
        Phone:
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </label>
      <label >
        Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </>
  );
}

export default RegisterRestaurant;