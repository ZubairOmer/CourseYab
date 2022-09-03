import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import absoluteURL from "next-absolute-url";
import { toast } from "react-toastify";
import axios from "axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { origin } = absoluteURL();
      const token = router.query.token;
      const { data } = await axios.put(
        `${origin}/api/password/reset/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      toast.success("password reseted  successfully");
      router.push("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
