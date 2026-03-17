import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../CustomNavbar/CustomNavbar";
import ToTopButton from "../../ToTopButton/ToTopButton";

type PropTypes = {
  children: JSX.Element;
};

function MainLayout(props: PropTypes) {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ToTopButton />
      <Footer />
    </>
  );
}

export default MainLayout;
