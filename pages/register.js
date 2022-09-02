import React from "react";
import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";
import { getSession } from "next-auth/client";

const RegisterPage = () => {
  return (
    <Layout title="Register Page">
      <Register />
    </Layout>
  );
};

export default RegisterPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
