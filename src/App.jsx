import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navabar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import Contact from "./pages/contact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/about";
import Programs from "./pages/programs";
import Sponsorship from "./pages/Sponsorship";
import Admin from "./Admin/Admin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext.jsx";
import News from "./pages/News.jsx";

function App() {
  const { initializing } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen relative overflow-hidden">
        <Navbar />
        <ToastContainer />
        <div className="mt-20">
          {initializing ? (
            <div className="w-full py-16 flex items-center justify-center text-white">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-emerald-200/30 border-t-emerald-400 rounded-full animate-spin"></div>
                </div>
                <p className="text-sm font-medium">Checking session…</p>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/news" element={<News />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          )}
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
