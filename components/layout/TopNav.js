import { useState, useEffect, useContext } from "react";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/client";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { UserContext } from "../../context/userContext";
import { useRouter } from "next/router";

import {
  AppstoreOutlined,
  CarryOutOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  // const [session] = useSession();
  // const user = session && session.user;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleLogout = () => {
    signOut();
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <div className="pt-2">
      <Menu mode="horizontal" selectedKeys={[current]} className="p-1">
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a>CourseYab</a>
          </Link>
        </Item>

        {user &&
          (user.role && user.role.includes("Instructor") ? (
            <Item
              key="/instructor/course/create"
              onClick={(e) => setCurrent(e.key)}
              icon={<CarryOutOutlined />}
            >
              <Link href="/instructor/course/create">
                <a>Create Course</a>
              </Link>
            </Item>
          ) : (
            <Item
              key="/me/become-instructor"
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
            >
              <Link href="/me/become-instructor">
                <a>Become Instructor</a>
              </Link>
            </Item>
          ))}

        {user === null && (
          <>
            <Item
              className="float-right"
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>

            <Item
              className="float-right"
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>
          </>
        )}

        {user !== null && (
          <SubMenu
            icon={
              <Avatar
                shape="circle"
                size={50}
                src={user.avatar && user.avatar.url}
                className="mr-2"
              />
            }
            title={user && user.name}
            className="float-right"
          >
            <ItemGroup>
              <Item>
                <Link href="/me/update">
                  <a>Profile</a>
                </Link>
              </Item>
              <Item onClick={handleLogout}>Logout</Item>
            </ItemGroup>
          </SubMenu>
        )}

        {user && user.role && user.role.includes("Instructor") && (
          <Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
            className="float-right"
          >
            <Link href="/instructor">
              <a>Instructor</a>
            </Link>
          </Item>
        )}
      </Menu>
    </div>
  );
};
export default TopNav;
