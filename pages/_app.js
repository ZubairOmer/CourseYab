import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { UserProvider } from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />;
    </UserProvider>
  );
}

export default MyApp;
