import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navabar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import Contact from "./pages/contact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/about";
import Programs from "./pages/programs";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
        <Navbar />
        <ToastContainer />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/programs" element={<Programs />} />
          </Routes>
        </div>
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
