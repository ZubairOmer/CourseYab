import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import axios from "axios";
import absoluteURL from "next-absolute-url";
import { UserContext } from "../../context/userContext";

const ForgotPassword = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState(state.user ? state.user.email : "");

  const router = useRouter();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { origin } = absoluteURL();

      const { data } = await axios.post(`${origin}/api/password/forgot`, {
        email,
      });

      router.push("/");
      toast("Email sent successfully");
    } catch (err) {
      toast("could not send email try later");
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            // disabled={loading ? true : false}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
