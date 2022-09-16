import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../routes/InstructorRoute";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../forms/AddLessonForm";
import Item from "antd/lib/list/Item";

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
    vedio: "",
  });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const { origin } = absoluteURL();
        const { data } = await axios.get(`${origin}/api/course/${slug}`);
        setCourse(data.course);
        setLoading(false);
      } catch (error) {
        // toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    loadCourse();
  }, [slug]);

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = async (e) => {
    e.preventDefault();

    try {
      const { origin } = absoluteURL();
      const { data } = await axios.post(
        `${origin}/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "" });
      setVisible(false);
      setUploadButtonText("Upload Vedio");
      console.log("course", course);
      setCourse(data.updated);

      toast.success("Lesson added");
    } catch (error) {
      return toast.error(error.response.data.message);
      setUploadButtonText("Upload Vedio");
    }
  };

  // upload vedio to cloudinary after selecting vedio
  const onChange = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("inputFile", file);

    try {
      setUploading(true);
      setUploadButtonText(file.name);
      const { data } = await axios.post(
        `${origin}/api/course/upload-vedio/${course.instructor._id}`,
        formData,
        {
          onUploadProgress: (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round(100 * e.loaded) / e.total);
            }
          },
        }
      );
      setUploading(false);
      setValues({ ...values, vedio: data });
    } catch (error) {
      toast.error(error.response.data.message);
      setUploading(false);
    }
  };

  // remove from cloudinary if clicked on X
  const handleVideoRemove = async () => {
    try {
      const { origin } = absoluteURL();
      const { data } = await axios.delete(
        `${origin}/api/course/deleteVedio/${course.instructor._id}`,
        {
          data: {
            public_id: values.vedio.public_id,
          },
        }
      );
    } catch (error) {
      // toast.error(error);
      return;
    }
  };

  return (
    <div className="contianer-fluid pt-3">
      {course && (
        <div className="container-fluid pt-1">
          <div className="media pt-2">
            <Avatar
              size={80}
              shape="square"
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
                    <EditOutlined
                      onClick={() =>
                        router.push(`/instructor/course/edit/${slug}`)
                      }
                      className="h5 pointer text-warning mr-5"
                    />
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
              handleAddLesson={handleAddLesson}
              onChange={onChange}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideoRemove={handleVideoRemove}
              progress={progress}
            />
          </Modal>

          <div className="row pb-5">
            <div className="col lesson-list">
              <h4>
                {course && course.lessons && course.lessons.length} Lessons
              </h4>
              <List
                itemLayout="horizontal"
                dataSource={course && course.lessons}
                renderItem={(item, index) => (
                  <Item>
                    <Item.Meta
                      avatar={<Avatar>{index + 1}</Avatar>}
                      title={item.title}
                    ></Item.Meta>
                  </Item>
                )}
              ></List>
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
