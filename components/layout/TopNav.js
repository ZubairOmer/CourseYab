import { useState, useEffect, useContext } from "react";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/client";
import Image from "next/image";

import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context/userContext";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  console.log("KHAR SAG", user);

  const handleLogout = () => {
    signOut();
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process.browser]);

  return (
    <div className="py-2">
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>
        {user === null && (
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>

            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}

        {user !== null && (
          <div className="ml-auto">
            <SubMenu
              icon={
                <Avatar
                  shape="circle"
                  size={50}
                  src={user.avatar && user.avatar.url}
                />
              }
              title={user && user.name}
              className="float-right"
            >
              <ItemGroup>
                <Item key="/user">
                  <Link href="/user">
                    <a>Dashboard</a>
                  </Link>
                </Item>
                <Item onClick={handleLogout}>Logout</Item>
              </ItemGroup>
            </SubMenu>
          </div>
        )}
      </Menu>
    </div>
  );
};
export default TopNav;
