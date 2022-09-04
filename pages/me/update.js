import React from "react";
import { getSession } from "next-auth/client";
import Profile from "../../components/user/Profile";
import UserRoute from "../../components/routes/UserRoute";
import Layout from "../../components/layout/Layout";

const UpdatePage = () => {
  return (
    <Layout title="Update Profile">
      <UserRoute>
        <Profile />
      </UserRoute>
    </Layout>
  );
};

export default UpdatePage;

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
    props: { session },
  };
}
