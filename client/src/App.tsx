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
import VerifyOtp from "./pages/VerifyOtp";
import AboutUs from "./pages/AboutUs";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import GemstonesPage from "./pages/GemstonesPage";
import CalculatorsIndex from "./pages/calculators/CalculatorsIndex";
import LoveCalculator from "./pages/calculators/LoveCalculator";
import NumerologyCalculator from "./pages/calculators/NumerologyCalculator";
import RashiCalculator from "./pages/calculators/RashiCalculator";
import MangalDoshaCalculator from "./pages/calculators/MangalDoshaCalculator";
import LuckyNameNumberCalculator from "./pages/calculators/LuckyNameNumberCalculator";
import TalkToAstrologer from "./pages/TalkToAstrologer";
import CallingPage from "./pages/CallingPage";
import PujaBooking from "./pages/PujaBooking";
import RequireAuth from "./auth/RequireAuth";
import RequireAdmin from "./auth/RequireAdmin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAstrologers from "./pages/admin/AdminAstrologers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminNotifications from "./pages/admin/AdminNotifications";
import WeeklyHoroscope from "./pages/WeeklyHoroscope";
import MonthlyHoroscope from "./pages/MonthlyHoroscope";
import YearlyHoroscope from "./pages/YearlyHoroscope";
import AstrologerLayout from "./pages/astrologer/AstrologerLayout";
import AstrologerLogin from "./pages/astrologer/AstrologerLogin";
import AstrologerDashboard from "./pages/astrologer/AstrologerDashboard";
import UserContacts from "./pages/astrologer/UserContacts";
import ChatHistory from "./pages/astrologer/ChatHistory";
import CallHistory from "./pages/astrologer/CallHistory";
import Schedule from "./pages/astrologer/Schedule";
import AstrologerSettings from "./pages/astrologer/AstrologerSettings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<RequireAuth><Services/></RequireAuth>} />
          <Route path="/store" element={<RequireAuth><Store/></RequireAuth>} />
          <Route path="/product/:id" element={<RequireAuth><ProductDetail/></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><Checkout/></RequireAuth>} />
          <Route path="/gemstones" element={<RequireAuth><GemstonesPage/></RequireAuth>} />
          <Route path="/gemstone-old" element={<Gemstone/>} />
          <Route path="/astrologers" element={<RequireAuth><Astrologers/></RequireAuth>} />
          <Route path="/blog" element={<BlogArticles/>} />
          <Route path="/blog/:id" element={<BlogArticle/>} />
          <Route path="/write-article" element={<WriteArticle/>} />
          <Route path="/become-author" element={<BecomeAuthor/>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
          <Route path="/chat" element={<RequireAuth><Chat/></RequireAuth>} />
          <Route path="/talk-to-astrologer" element={<RequireAuth><TalkToAstrologer/></RequireAuth>} />
          <Route path="/calling" element={<RequireAuth><CallingPage/></RequireAuth>} />
          <Route path="/horoscope" element={<RequireAuth><Horoscope/></RequireAuth>} />
          <Route path="/horoscope/weekly" element={<RequireAuth><WeeklyHoroscope/></RequireAuth>} />
          <Route path="/horoscope/monthly" element={<RequireAuth><MonthlyHoroscope/></RequireAuth>} />
          <Route path="/horoscope/yearly" element={<RequireAuth><YearlyHoroscope/></RequireAuth>} />
          <Route path="/kundli" element={<RequireAuth><Kundli/></RequireAuth>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verify-otp" element={<VerifyOtp/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/about" element={<RequireAuth><AboutUs/></RequireAuth>} />
          <Route path="/calculators" element={<RequireAuth><CalculatorsIndex/></RequireAuth>} />
          <Route path="/calculators/love" element={<RequireAuth><LoveCalculator/></RequireAuth>} />
          <Route path="/calculators/numerology" element={<RequireAuth><NumerologyCalculator/></RequireAuth>} />
          <Route path="/calculators/rashi" element={<RequireAuth><RashiCalculator/></RequireAuth>} />
          <Route path="/calculators/mangal-dosha" element={<RequireAuth><MangalDoshaCalculator/></RequireAuth>} />
          <Route path="/calculators/lucky-name-number" element={<RequireAuth><LuckyNameNumberCalculator/></RequireAuth>} />
          <Route path="/puja-booking" element={<RequireAuth><PujaBooking/></RequireAuth>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<RequireAdmin><AdminLayout/></RequireAdmin>}>
          <Route index element={<AdminDashboard/>} />
          <Route path="astrologers" element={<AdminAstrologers/>} />
          <Route path="products" element={<AdminProducts/>} />
          <Route path="notifications" element={<AdminNotifications/>} />
        </Route>

        {/* Astrologer Routes */}
        <Route path="/astrologer/login" element={<AstrologerLogin/>} />
        <Route path="/astrologer" element={<AstrologerLayout/>}>
          <Route index element={<AstrologerDashboard/>} />
          <Route path="dashboard" element={<AstrologerDashboard/>} />
          <Route path="contacts" element={<UserContacts/>} />
          <Route path="chats" element={<ChatHistory/>} />
          <Route path="calls" element={<CallHistory/>} />
          <Route path="schedule" element={<Schedule/>} />
          <Route path="settings" element={<AstrologerSettings/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;