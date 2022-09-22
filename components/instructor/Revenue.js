import { useState, useEffect, useContext } from "react";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });

  return (
    <div className="container">
      <div className="row pt-2">
        <div className="col-md-8 offset-md-2 bg-light p-5">
          <h2>
            Revenue report <DollarOutlined className="float-right" />{" "}
          </h2>
          <small>
            You get paid directly from stripe to your bank account every 48 hour
          </small>
          <hr />
          <h4>
            Pending balance
            <span className="float-right">$0.00</span>
          </h4>
          <small>For last 48 hours</small>
          <hr />
          <h4>
            Payouts <SettingOutlined className="float-right pointer" />
          </h4>
          <small>
            Update your stripe account details or view previous payouts.
          </small>
        </div>
      </div>
    </div>
  );
};

export default InstructorRevenue;
