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
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/gemstones" element={<Gemstone/>} />
          <Route path="/astrologers" element={<Astrologers/>} />
          <Route path="/blog" element={<BlogArticles/>} />
          <Route path="/blog/:id" element={<BlogArticle/>} />
          <Route path="/write-article" element={<WriteArticle/>} />
          <Route path="/become-author" element={<BecomeAuthor/>} />
          <Route path="/about" element={<AboutUs/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;