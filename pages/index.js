import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import absoluteURL from "next-absolute-url";
import { toast } from "react-toastify";
import CourseCard from "../components/cards/CourseCard";

const IndexPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { origin } = absoluteURL();
        const { data } = await axios.get(
          `${origin}/api/course/published-courses`
        );
        setCourses(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Layout title="Edemy">
      <h1 className="jumbotron text-center bg-danger square">
        Online education marketplace
      </h1>
      <div className="container-fluid">
        <div className="row pt-2">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard key={course._id} course={course} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
