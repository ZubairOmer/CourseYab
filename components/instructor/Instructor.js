import { useEffect, useState } from "react";
import absoluteURL from "next-absolute-url";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const Instructor = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { origin } = absoluteURL();
        const { data } = await axios.get(
          `${origin}/api/instructor/instructor-courses`
        );
        setCourses(data.courses);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <>
      <h1 className="jumbotron bg-primary text-center square">
        Instructor Dashboard
      </h1>

      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image : "/images/default_avatar.jpg"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="pointer"
                    >
                      <a className="mt-2 text-primary">
                        <h5 className="pt-2">{course.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} Lessons
                    </p>

                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-warning">
                        At least 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>

                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined
                          className="h5 text-success"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined
                          className="h5 text-warning"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        ))
      ) : loading ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <p className="d-flex justify-content-center align-items-center ">
          No course created by this onstructor now
        </p>
      )}
    </>
  );
};

export default Instructor;
