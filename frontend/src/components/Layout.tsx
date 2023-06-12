import React from "react";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return <div className="my-2">{children}</div>;
};
export default Layout;
