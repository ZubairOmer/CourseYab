import React from "react";
import { getSession } from "next-auth/client";
import ForgotPassword from "../../components/user/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;

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
    props: { session },
  };
}
