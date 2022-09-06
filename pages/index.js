import React, { Fragment } from "react";
import Layout from "../components/layout/Layout";
import { getSession, useSession } from "next-auth/client";

const IndexPage = () => {
  // const [session] = useSession();

  // console.log("YAMI KHAW RA GYM", session);

  return (
    <Layout title="Edemy">
      <Fragment>
        <h1 className="jumbotron text-center bg-danger square">
          {/* Find Cute Courses Here {session && session.user.email} */}
        </h1>
      </Fragment>
    </Layout>
  );
};

export default IndexPage;
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: { session },
//   };
// }
