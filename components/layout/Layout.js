import React, { Fragment } from "react";
import Head from "next/head";
import TopNav from "./TopNav";

const Layout = ({ title, children }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <TopNav />
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
