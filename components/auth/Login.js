import { Fragment, useState, useContext } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import absoluteURL from "next-absolute-url";

const Login = () => {
  const [email, setEmail] = useState("omer.zubair01@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("User logged in successfully");
      const { origin } = absoluteURL();
      const { data: session } = await axios.get(`${origin}/api/me`);
      dispatch({ type: "LOGIN", payload: session.user });
      router.push("/");
    }
  };

  return (
    <Fragment>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <Link href="/password/forgotPage">forgot password</Link>
        <p className="text-center p-3">
          Not yet registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
