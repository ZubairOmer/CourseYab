import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../routes/InstructorRoute";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined, SyncOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const { origin } = absoluteURL();
        const { data } = await axios.get(`${origin}/api/course/${slug}`);
        setCourse(data.course);
        console.log("COURSES SIRE", data.course);
        setLoading(false);
      } catch (error) {
        // toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    loadCourse();
  }, [slug]);

  return (
    <div className="contianer-fluid pt-3">
      {course && (
        <div className="container-fluid pt-1">
          <div className="media pt-2">
            <Avatar
              size={80}
              src={course.image ? course.image : "/images/default_avatar.jpg"}
            />

            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons && course.lessons.length} Lessons
                  </p>
                  <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                    {course.category}
                  </p>
                </div>

                <div className="d-flex align-items-center  pt-4">
                  <Tooltip title="Edit">
                    <EditOutlined className="h5 pointer text-warning mr-5" />
                  </Tooltip>
                  <Tooltip title="Publish">
                    <CheckOutlined className="h5 pointer text-danger mr-5" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      )}
    </div>
  );
};

export default CourseView;
