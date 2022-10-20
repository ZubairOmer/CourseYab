import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const IndexPage = ({ courses }) => {
  return (
    <Layout title="CourseYab">
      <h1 className=" text-center bg-[#03a9f4] text-white p-5">
        Online Education Marketplace
      </h1>
      <div className="flex justify-center align-center flex-wrap space-x-12 ">
        {courses &&
          courses.map((course) => (
            <div key={course._id}>
              <CourseCard key={course._id} course={course} />
            </div>
          ))}
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
