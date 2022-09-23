import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const IndexPage = ({ courses }) => {
  return (
    <Layout title="Edemy">
      <h1 className="jumbotron text-center bg-primary square">
        Online Education Marketplace
      </h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-3">
              <CourseCard key={course._id} course={course} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.API}/course/published-courses`
  );

  return {
    props: {
      courses: data,
    },
  };
}

export default IndexPage;
