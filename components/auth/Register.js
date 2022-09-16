import { Fragment, useState } from "react";
import absoluteURL from "next-absolute-url";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Image from "next/image";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

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
        avatar,
      });
      setLoading(false);
      toast.success("Register user successfully");
      router.push("/login");
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
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
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter name"
            required
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
          <div className="form-group">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <figure className="avatar mr-2 item-rtl">
                  <Image
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="image"
                    width={70}
                    height={70}
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="images/*"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

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
