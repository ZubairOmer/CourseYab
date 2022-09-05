import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../routes/InstructorRoute";
import CourseCreateForm from "../forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const CourseCreate = () => {
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
      let { data } = await axios.post("/api/course/upload-image", {
        image,
      });
      setValues({ ...values, loading: false });
      toast.success("Image upoaded to cloudinary sire.");
    } catch (error) {
      setValues({ ...values, loading: false });
      toast.error("Image upload failed. Try later.");
    }
  };

  return (
    <>
      <h1 className="jumbotron bg-warning text-center square">Create Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          // handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          imagePreview={imagePreview}
          uploadButtonText={uploadButtonText}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </>
  );
};

export default CourseCreate;
