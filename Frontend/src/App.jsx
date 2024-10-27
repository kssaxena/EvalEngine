import { Route, Routes } from "react-router-dom";
import Hero from "./components/pages/Hero";
import Header from "./general/Header";
import Footer from "./general/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
