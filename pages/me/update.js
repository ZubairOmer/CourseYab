import React from "react";
import { getSession } from "next-auth/client";

const update = () => {
  return <div>Fucking Me</div>;
};

export default update;

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
