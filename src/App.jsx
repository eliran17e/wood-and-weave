import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/living-room-sets"  element={<ProductListing category="living-room-sets" />} />
            <Route path="/beds"              element={<ProductListing category="beds" />} />
            <Route path="/coffee-tables"     element={<ProductListing category="coffee-tables" />} />
            <Route path="/dining-tables"     element={<ProductListing category="dining-tables" />} />
            <Route path="/outdoor-furniture" element={<ProductListing category="outdoor-furniture" />} />
            <Route path="/chairs"            element={<ProductListing category="chairs" />} />
            <Route path="/bar-stools"        element={<ProductListing category="bar-stools" />} />
            <Route path="/product/:slug"     element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
