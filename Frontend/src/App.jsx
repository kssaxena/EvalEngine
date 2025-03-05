import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/pages/Hero";
import Header from "./general/Header";
import Footer from "./general/Footer";
import Questioner from "./components/pages/Questioner";
import LoginStudent from "./components/Login";
import RegisterStudent from "./components/Register";
import Respondent from "./components/pages/Respondent";
import Profile from "./components/pages/Profile";
import { useEffect } from "react";
import RespondentAnswer from "./components/RespondentAnswerInput";
import RespondentAnswerInput from "./components/RespondentAnswerInput";
import { parseErrorMessage } from "./utils/ErrorMessageParser";
import { FetchData } from "./utils/FetchFromApi";
import { clearUser, setUser } from "./utils/UserSlice";
import { useDispatch } from "react-redux";

function App() {
  const Dispatch = useDispatch();

  useEffect(() => {
    const reLogin = async () => {
      // Fetching the user data from the local storage
      const userType = localStorage.getItem("userType");
      const refreshToken = localStorage.getItem("refreshToken");

      // If the user is not logged in, then redirect to the login page
      if (!refreshToken || !userType) {
        window.location.href = "/login";
      }
      try {
        if (userType === "student") {

          const response = await FetchData(
            "respondent/student/re-login",
            "post",
            {
              refreshToken,
            }
          );
          console.log(response);
          localStorage.clear(); // will clear the all the data from localStorage
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("userType", userType);

          Dispatch(clearUser());
          Dispatch(setUser(response.data.data.user));
          Dispatch(setUser(userType));
        } else {
          const response = await FetchData(
            "questioner/teacher/re-login",
            "post",
            {
              refreshToken,
            }
          );
          console.log(response);
          localStorage.clear(); // will clear the all the data from localStorage
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("userType", userType);

          Dispatch(clearUser());
          Dispatch(setUser(response.data.data.user));
          Dispatch(setUser(userType));
        }
      } catch(error) {
        console.log(error);
        // alert(parseErrorMessage(error.response.data));
        window.location.href = "/login";
      }
    };

    reLogin();
  }, []);

  return (
    <div className=" text-neutral-300 antialiased selection:bg-cyan-500 selection:text-cyan-900 bg-[#1F222B]">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/register" element={<RegisterStudent />} />

        <Route path="/" element={<Hero />} />
        <Route path="/add-question/:testId" element={<Questioner />} />
        <Route path="/respondent" element={<Respondent />} />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/answers-page/:testId"
          element={<RespondentAnswerInput />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
