import React from "react";
import Hero from "../components/Hero";
const HomePage: React.FC = () => {
  console.log("render");

  return (
    <div className="vh-100">
      <Hero />
    </div>
  );
};
export default HomePage;
