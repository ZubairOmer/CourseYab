import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../routes/InstructorRoute";
import CourseCreateForm from "../forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import absoluteURL from "next-absolute-url";
import { Avatar, List } from "antd";
import Item from "antd/lib/list/Item";
import { DeleteOutlined } from "@ant-design/icons";

const EditCourse = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    paid: true,
    loading: false,
    category: "",
    lessons: [],
  });

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const router = useRouter();

  const { slug } = router.query;

  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await axios.get(`${origin}/api/course/${slug}`);
        setValues(data.course);
      } catch (error) {
        toast.error("Cant get the course details");
      }
    };

    getCourse();
  }, [slug]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      // upload the fucking image to the cloudinary server
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    try {
      // sending request to create course to database
      const { origin } = absoluteURL();
      const config = {
        headers: {
          "content-cype": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${origin}/api/course/update-course/${slug}`,
        {
          ...values,
          image,
        },
        config
      );
      setValues({ ...values, loading: false });
      toast.success("Course Updated successfully.");
      // router.push("/instructor");
    } catch (error) {
      setValues({ ...values, loading: false });
      toast.error(error.response.data.message);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;

    let allLessons = values.lessons;
    let movingItem = allLessons[movingItemIndex];

    allLessons.splice(movingItemIndex, 1); // item in which other item dragged is removed
    allLessons.splice(targetItemIndex, 0, movingItem); // item added back in other item plac

    setValues({ ...values, lessons: [...allLessons] });

    const { data } = await axios.put(
      `${origin}/api/course/update-course/${slug}`,
      { ...values, image }
    );

    toast.success("Lessons are rearranged");
  };

  // delete lesson
  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete ?");
    if (!answer) return;
    // remove lesson form client side
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, allLessons });
    // remove lesson from server side
    try {
      const { origin } = absoluteURL();
      const { data } = await axios.put(
        `${origin}/api/course/delete-lesson/${slug}/${removed[0]._id}`
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="jumbotron bg-primary text-center square">Update Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          imagePreview={imagePreview}
          uploadButtonText={uploadButtonText}
        />
      </div>

      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>
                <DeleteOutlined
                  className="text-danger"
                  onClick={() => handleDelete(index, item)}
                />
              </Item>
            )}
          ></List>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
