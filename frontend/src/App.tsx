import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/login" element={<>Login Page</>} />
      </Routes>
      <Footer />
    </Layout>
  );
};

export default App;
