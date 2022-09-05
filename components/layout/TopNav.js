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

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, []);

  const handleLogout = () => {
    signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="py-2">
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        style={{
          // position: "fixed",
          // top: "0px",
          // zIndex: 999999999999999999,
          // width: "100%",
          padding: "4px 3px",
        }}
      >
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

        {user && user.role && user.role.includes("Instructor") && (
          <div className="ml-auto">
            <Item
              key="/instructor"
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
              className="ml-auto"
            >
              <Link href="/instructor">
                <a>Instructor</a>
              </Link>
            </Item>
          </div>
        )}
        {user && user !== null && (
          <div className={`${!user.role.includes("Instructor") && "ml-auto"}`}>
            <SubMenu
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
