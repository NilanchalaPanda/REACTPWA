import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="add_user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
