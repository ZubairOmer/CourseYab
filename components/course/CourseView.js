import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../modal/PreviewModal";
import SingleCourseLessons from "../cards/SingleCourseLessons";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import absoluteURL from "next-absolute-url";

const CourseView = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if ((user, course)) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    try {
      const { origin } = absoluteURL();
      const { data } = await axios.get(
        `${origin}/api/check-enrollment/${course.course._id}`
      );
      setEnrolled(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaidEnrollment = () => {
    console.log("paid enrollment");
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      // check if user is logged in
      const { origin } = absoluteURL();
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(
        `${origin}/api/free-enrollment/${course.course._id}`,
        {}
      );
      toast.success(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <SingleCourseJumbotron
        course={course.course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        preview={preview}
        setShowModal={setShowModal}
      />

      {course.course.lessons && (
        <SingleCourseLessons
          lessons={course.course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default CourseView;
