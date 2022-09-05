import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
import absoluteURL from "next-absolute-url";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const { origin } = await absoluteURL();
        const { data } = await axios.get(
          `${origin}/api/instructor/current-instructor`
        );
        if (data.success) setOk(true);
      } catch (err) {
        setOk(false);
        router.push("/");
      }
    };
    fetchInstructor();
  }, [router]);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
