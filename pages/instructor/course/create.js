import React from "react";
import Layout from "../../../components/layout/Layout";
import CreateCourse from "../../../components/instructor/CreateCourse";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CreateCoursePage = () => {
  return (
    <Layout title="Create Course">
      <InstructorRoute>
        <CreateCourse />
      </InstructorRoute>
    </Layout>
  );
};

export default CreateCoursePage;
