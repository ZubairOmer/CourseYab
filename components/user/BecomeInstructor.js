import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Button } from "antd";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import router from "next/router";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(UserContext);

  const becomeInstructor = async () => {
    try {
      const { origin } = absoluteURL();
      setLoading(true);
      const { data } = await axios.put(
        `${origin}/api/instructor/make-instructor`
      );
      toast.success("You become instructor now you can create courese");
      window.location.href = "/instructor/course/create";
    } catch (error) {
      toast.error("Could not become instructor try later");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="jumbotron bg-success text-center square">
        Become Instructor
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup payout to publish courses on Edemy</h2>
              <p className="lead text-warning">
                Edemy partners with stripe to transfer earnings to your bank
                account
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>

              <p className="lead">
                You will be redirected to stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
