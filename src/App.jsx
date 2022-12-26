import { Route, Routes, Link } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Update from "./pages/Update";

export default function App() {
  return (
    <>
      <nav className="nav">
        <h1>Supa Smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  );
}
