import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "../styles/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";
import { Provider } from "next-auth/client";
import TopNav from "../components/layout/TopNav";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <TopNav />
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
