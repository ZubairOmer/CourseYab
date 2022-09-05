import React from "react";
import Layout from "../../components/layout/Layout";
import Instructor from "../../components/instructor/Instructor";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorPage = () => {
  return (
    <Layout title="Instructor Page">
      <InstructorRoute>
        <Instructor />
      </InstructorRoute>
    </Layout>
  );
};

export default InstructorPage;
