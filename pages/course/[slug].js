import Layout from "../../components/layout/Layout";
import CourseView from "../../components/course/CourseView";
import axios from "axios";

const CourseViewPage = ({ course }) => {
  return (
    <Layout title={course.name}>
      <CourseView course={course} />
    </Layout>
  );
};

export default CourseViewPage;

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data.course,
    },
  };
}
