import Layout from "../../../../components/layout/Layout";
import SingleCourse from "../../../../components/course/SingleCourse";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";

const SingleCoursePage = () => {
  return (
    <Layout title="Course Name">
      <InstructorRoute>
        <SingleCourse />
      </InstructorRoute>
    </Layout>
  );
};

export default SingleCoursePage;
