import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../routes/InstructorRoute";
import CourseCreateForm from "../forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import absoluteURL from "next-absolute-url";

const EditCourse = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    paid: true,
    loading: false,
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
      router.push("/instructor");
    } catch (error) {
      setValues({ ...values, loading: false });
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
    </>
  );
};

export default EditCourse;
