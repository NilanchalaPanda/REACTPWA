import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Register from "./pages/register";
import AddUserForm  from "./pages/AddUserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="add_user" element={<AddUser />} />
        <Route path="form" element={<AddUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
