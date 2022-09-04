import React from "react";
import Layout from "../../components/layout/Layout";
import BecomeInstructor from "../../components/user/BecomeInstructor";
import { getSession } from "next-auth/client";

const BecomeInstructorPage = () => {
  return (
    <Layout title="Become Instructor">
      <BecomeInstructor />
    </Layout>
  );
};

export default BecomeInstructorPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
