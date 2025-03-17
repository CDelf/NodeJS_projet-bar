import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
//import axios from "axios";

import Home from "./pages/Home";
import Bars from "./pages/Bars";
import Bieres from "./pages/Bieres";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/bieres" element={<Bieres />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;