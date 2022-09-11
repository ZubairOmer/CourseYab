import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">{children}</div>
      </div>
    </div>
  );
};

export default UserRoute;
