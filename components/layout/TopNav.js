import { useState, useEffect, useContext } from "react";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/client";
import Image from "next/image";

import {
  AppstoreOutlined,
  CarryOutOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
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

  const handleLogout = () => {
    signOut();
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("FURRENT PATH", current);
  }, [current]);

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

        {/* key does not work cuz of user not loaded initialy */}
        {user &&
          (user.role && user.role.includes("Instructor") ? (
            <div>
              <Item
                key="/instructor/course/create"
                onClick={(e) => setCurrent(e.key)}
                icon={<CarryOutOutlined />}
              >
                <Link href="/instructor/course/create">
                  <a>Create Course</a>
                </Link>
              </Item>
            </div>
          ) : (
            <div>
              <Item
                key="/me/become-instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
              >
                <Link href="/me/become-instructor">
                  <a>Become Instructor</a>
                </Link>
              </Item>
            </div>
          ))}

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

        {user && user !== null && (
          <div className="ml-auto">
            <SubMenu
              className="mr-3"
              icon={
                <Avatar
                  shape="circle"
                  size={50}
                  src={user.avatar && user.avatar.url}
                  className="mr-1"
                />
              }
              title={user && user.name}
            >
              <ItemGroup>
                <Item key="/me/update">
                  <Link href="/me/update">
                    <a>Profile</a>
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
