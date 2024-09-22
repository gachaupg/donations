import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navabar";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
        <Navbar /> 
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
