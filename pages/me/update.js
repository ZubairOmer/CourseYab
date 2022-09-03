import React from "react";
import { getSession } from "next-auth/client";
import Profile from "../../components/user/Profile";

const UpdatePage = () => {
  return (
    <div>
      <Profile />
    </div>
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
