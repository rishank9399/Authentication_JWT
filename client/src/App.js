import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Hero from "./pages/Hero";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;