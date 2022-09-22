import Layout from "../../../../components/layout/Layout";
import EditCourse from "../../../../components/forms/EditCourseForm";
import InstructorRoute from "../../../../components/routes/InstructorRoute";

const EditCoursePage = () => {
  return (
    <Layout title="Course Name">
      <InstructorRoute>
        <EditCourse />
      </InstructorRoute>
    </Layout>
  );
};

export default EditCoursePage;
