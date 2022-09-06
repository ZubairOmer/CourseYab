import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/nprogress.css";
import { UserProvider } from "../context/userContext";
import nProgress from "nprogress";
import Router from "next/router";
import { Provider } from "next-auth/client";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    // <Provider session={pageProps.session}>
    <UserProvider>
      <Component {...pageProps} />;
    </UserProvider>
    // </Provider>
  );
}

export default MyApp;
