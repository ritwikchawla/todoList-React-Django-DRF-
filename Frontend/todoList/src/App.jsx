import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="site-wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
