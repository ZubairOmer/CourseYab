import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "../styles/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";
import TopNav from "../components/layout/TopNav";
import { UserProvider } from "../context/userContext";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TopNav />
      <Component {...pageProps} />;
    </UserProvider>
  );
}

export default MyApp;
