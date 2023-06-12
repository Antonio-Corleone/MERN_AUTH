import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="py-5 bg-dark fixed-bottom">
      <p className="text-center text-white mb-0">
        Copyright &copy; {new Date().getFullYear()}; Powered by Antonio Corleone
      </p>
    </div>
  );
};

export default Footer;
