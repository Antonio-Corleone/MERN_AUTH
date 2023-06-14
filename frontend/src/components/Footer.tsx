import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-5 py-5 bg-dark">
      <p className="text-center text-white mb-0">
        Copyright &copy; {new Date().getFullYear()}; Powered by Antonio Corleone
      </p>
    </div>
  );
};

export default Footer;
