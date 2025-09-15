import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./Layout/RootLayout";
import Services from "./pages/Services";
import Gemstone from "./pages/Gemstone";
import Astrologers from "./pages/Astrologers";
import BlogArticles from "./pages/BlogArticles";
import BlogArticle from "./pages/BlogArticle";
import WriteArticle from "./pages/WriteArticle";
import BecomeAuthor from "./pages/BecomeAuthor";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Horoscope from "./pages/Horoscope";
import Kundli from "./pages/Kundli";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import GemstonesPage from "./pages/GemstonesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/gemstones" element={<GemstonesPage/>} />
          <Route path="/gemstone-old" element={<Gemstone/>} />
          <Route path="/astrologers" element={<Astrologers/>} />
          <Route path="/blog" element={<BlogArticles/>} />
          <Route path="/blog/:id" element={<BlogArticle/>} />
          <Route path="/write-article" element={<WriteArticle/>} />
          <Route path="/become-author" element={<BecomeAuthor/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/horoscope" element={<Horoscope/>} />
          <Route path="/kundli" element={<Kundli/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/about" element={<AboutUs/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;