import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../routes/InstructorRoute";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Tooltip, Button, Modal } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../forms/AddLessonForm";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [image, setImage] = useState("");

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

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      const { origin } = absoluteURL();
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `${origin}/api/course/upload-vedio`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

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
          <div className="row">
            <Button
              onClick={() => setVisible(true)}
              className="col-md-6 offset-md-3 text-center"
              type="primary"
              shape="round"
              icon={<UploadOutlined />}
              size="large"
            >
              Add Lesson
            </Button>
          </div>
          <br />
          <Modal
            title="Add Lesson"
            centered
            visible={visible}
            onCancel={() => {
              setVisible(false);
              setUploadButtonText("Upload Vedio");
            }}
            footer={null}
          >
            <AddLessonForm
              values={values}
              setValues={setValues}
              // handleChange={handleChange}
              handleAddLesson={handleAddLesson}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideo={handleVideo}
            />
          </Modal>
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
