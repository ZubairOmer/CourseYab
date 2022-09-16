import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../modal/PreviewModal";
import SingleCourseLessons from "../cards/SingleCourseLessons";

const CourseView = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const router = useRouter();
  const { slug } = router.query;

  // console.log("LOGIING", course.course);

  return (
    <>
      <SingleCourseJumbotron
        course={course.course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
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
