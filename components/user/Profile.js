import React, { useState, useEffect } from "react";
import { useRouter, Router } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import absoluteUrl from "next-absolute-url";
import { useSession } from "next-auth/client";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session);

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

  useEffect(() => {
    if (session) {
      setUser({
        name: session[0].user.name,
        email: session[0].user.email,
      });
      setAvatarPreview(session[0].user.avatar.url);
    }
  }, [session]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { origin } = absoluteUrl();
      const { data } = await axios.put(`${origin}/api/user/update-profile`, {
        name,
        email,
        password,
        avatar,
      });

      toast.success("Profile updated successfully");
      // window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
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
    <>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 d-flex justify-content-center align-items-center mt-4">
            <form className="shadow-lg py-4 px-5" onSubmit={submitHandler}>
              <h1 className="mb-3">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="write your new password"
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="avatar_upload">Avatar</label> */}
                <div className="d-flex align-items-center justify-content-center">
                  <figure className="avatar mr-3 mt-3 item-rtl">
                    <Image
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                      width={70}
                      height={70}
                    />
                  </figure>
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
                      Update Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-primary btn-block py-1"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
