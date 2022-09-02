import { Fragment, useState } from "react";
import absoluteURL from "next-absolute-url";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { origin } = absoluteURL();
      const { data } = await axios.post(`${origin}/api/auth/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Register user successfully");
      ReadableStreamDefaultController.push("/login");
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Register;
