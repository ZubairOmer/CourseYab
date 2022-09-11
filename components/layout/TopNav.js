import { useState, useEffect, useContext } from "react";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/client";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { UserContext } from "../../context/userContext";

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
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  // const [session] = useSession();
  // const user = session && session.user;

  const handleLogout = () => {
    signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="py-2">
      <Menu
        mode="horizontal"
        style={{
          padding: "4px 3px",
        }}
      >
        <Item icon={<AppstoreOutlined />}>
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>

        {user &&
          (user.role && user.role.includes("Instructor") ? (
            <div>
              <Item icon={<CarryOutOutlined />}>
                <Link href="/instructor/course/create">
                  <a className="text-black">Create Course</a>
                </Link>
              </Item>
            </div>
          ) : (
            <div>
              <Item icon={<TeamOutlined />}>
                <Link href="/me/become-instructor">
                  <a>Become Instructor</a>
                </Link>
              </Item>
            </div>
          ))}

        {user === null && (
          <>
            <Item icon={<LoginOutlined />}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>

            <Item icon={<UserAddOutlined />}>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}

        {user && user.role && user.role.includes("Instructor") && (
          <div className="ml-auto">
            <Item icon={<TeamOutlined />} className="ml-auto">
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
                <Item>
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
