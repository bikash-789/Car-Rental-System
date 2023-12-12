import React from "react";
import Footer from "./Footer";

function Layout({ className, children, bgImg }) {
  return (
    <>
      <article
        className={className}
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {children}
      </article>
    </>
  );
}

export default Layout;
