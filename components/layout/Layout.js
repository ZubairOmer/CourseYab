import React, { Fragment, useEffect } from "react";
import Head from "next/head";
// import TopNav from "./TopNav";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title, children }) => {
  console.log("FUCKING LAYOUT.JS");
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {/* <TopNav /> */}
        <ToastContainer position="bottom-right" />
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
