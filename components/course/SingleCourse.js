import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../routes/InstructorRoute";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import { toast } from "react-toastify";

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
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    loadCourse();
  }, [slug]);

  return (
    <InstructorRoute>
      <div className="contianer-fluid pt-3">
        <p>{course.instructor.name}</p>
        <p>{course.description}</p>
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
