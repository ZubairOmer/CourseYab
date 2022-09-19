import Dashboard from "../../components/user/Dashboard";
import UserRoute from "../../components/routes/UserRoute";
import Layout from "../../components/layout/Layout";

const DashboardPage = () => {
  return (
    <Layout title="User Dashboard">
      <UserRoute>
        <Dashboard />
      </UserRoute>
    </Layout>
  );
};

export default DashboardPage;
