import React, { Fragment } from "react";
import Layout from "../components/layout/Layout";
import { getSession, useSession } from "next-auth/client";

const IndexPage = () => {
  const [session] = useSession();

  return (
    <Layout title="Edemy">
      <Fragment>
        <h1 className="jumbotron text-center bg-danger square">
          Find Cute Courses Here {session && session.user.email}
        </h1>
        {/* <main className="flex h-screen justify-center items-center text-white ">
          <div className="text-center bg-blue-500 p-10 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold">
              Next.js Video Upload to Cloudinary Demo
            </h1> */}
        {/* <Upload /> */}
        {/* <p className="pt-5 text-xl">
              Demo by{" "}
              <a href="https://tpiros.dev" className="underline">
                Tamas Piros
              </a>
            </p>
          </div>
        </main> */}
      </Fragment>
    </Layout>
  );
};

export default IndexPage;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
