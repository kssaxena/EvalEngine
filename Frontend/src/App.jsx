import { Route, Routes } from "react-router-dom";
import Hero from "./components/pages/Hero";
import Header from "./general/Header";
import Footer from "./general/Footer";
import Questioner from "./components/pages/Questioner";
import LoginStudent from "./components/Login";
import RegisterStudent from "./components/Register";
import Respondent from "./components/pages/Respondent";
import Profile from "./components/pages/Profile";
import RespondentAnswerInput from "./components/RespondentAnswerInput";

function App() {
  return (
    <>
      <div className=" text-neutral-300 antialiased selection:bg-cyan-500 selection:text-cyan-900 bg-[#1F222B]">
        <Header />
        <Routes>
          <Route path="/login-Student" element={<LoginStudent />} />
          <Route path="/register-Student" element={<RegisterStudent />} />

          <Route path="/" element={<Hero />} />
          <Route path="/questioner" element={<Questioner />} />
          <Route path="/respondent" element={<Respondent />} />

          <Route path="/profile-student" element={<Profile />} />
          <Route path="/answers" element={<RespondentAnswerInput />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
