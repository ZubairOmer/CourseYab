import axios from "axios";
import absoluteURL from "next-absolute-url";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../context/userContext";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
// import course from "../../../server/models/course";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { origin } = absoluteURL();
      const { data } = await axios.get(`${origin}/api/user/courses`);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      ) : (
        <h1 className="jumbotron bg-primary text-center square">
          User dashboard
        </h1>
      )}
      {/* show list of courses */}

      {courses &&
        courses.map((course) => (
          <div key={course._id} className="media pt-2 pb-1">
            <Avatar
              size={80}
              shape="square"
              src={course.image ? course.image : "/course.png"}
            />

            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link href={`/me/course/${course.slug}`} className="pointer">
                    <a>
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} lessons
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}
                  >
                    By {course.instructor.name}
                  </p>
                </div>
                <div className="col-md-3 mt-3 text-center">
                  <Link href={`/user/course/${course.slug}`}>
                    <a>
                      <PlayCircleOutlined className="h2 pointer text-primary" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default Dashboard;
