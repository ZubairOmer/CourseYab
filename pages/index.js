import React, { Fragment } from "react";
import Layout from "../components/layout/Layout";

const index = () => {
  return (
    <Layout title="Edemy">
      <Fragment>
        <h1 className="jumbotron text-center bg-danger square mt-5">
          Find Cute Courses Here
        </h1>
      </Fragment>
    </Layout>
  );
};

export default index;
