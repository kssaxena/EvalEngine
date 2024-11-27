import { Route, Routes } from "react-router-dom";
import Hero from "./components/pages/Hero";
import Header from "./general/Header";
import Footer from "./general/Footer";
import Questioner from "./components/pages/Questioner";
import LoginStudent from "./components/Login";
import RegisterStudent from "./components/Register";
import Respondent from "./components/pages/Respondent";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <>
      <div className="h-screen text-neutral-300 antialiased selection:bg-cyan-500 selection:text-cyan-900 bg-[#1F222B]">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginStudent />} />
          <Route path="/register" element={<RegisterStudent />} />

          <Route path="/" element={<Hero />} />
          <Route path="/questioner" element={<Questioner />} />
          <Route path="/respondent" element={<Respondent />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
