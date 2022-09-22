import React from "react";
import Layout from "../../components/layout/Layout";
import InstructorRevenue from "../../components/instructor/Revenue";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorPageRevenue = () => {
  return (
    <Layout title="Instructor Revenue">
      <InstructorRoute>
        <InstructorRevenue />
      </InstructorRoute>
    </Layout>
  );
};

export default InstructorPageRevenue;
