// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { SyncOutlined } from "@ant-design/icons";
// import absoluteURL from "next-absolute-url";

// const StudentRoute = ({ children }) => {
//   // state
//   const [ok, setOk] = useState(false);
//   // router
//   const router = useRouter();

//   //   useEffect(() => {
//   //     fetchUser();
//   //   }, []);

//   //   const fetchUser = async () => {
//   //     try {
//   //       const { origin } = absoluteURL();
//   //       const { data } = await axios.get(`${origin}/api/me`);
//   //       if (data.ok) return setOk(true);
//   //     } catch (err) {
//   //       console.log(err);
//   //       setOk(false);
//   //       router.push("/login");
//   //     }
//   //   };

//   return (
//     <>
//       {/* {!ok ? (
//         <SyncOutlined
//           spin
//           className="d-flex justify-content-center display-1 text-primary p-5"
//         />
//       ) : ( */}
//       <div className="container-fluid">{children}</div>
//       {/* )} */}
//     </>
//   );
// };

// export default StudentRoute;
