import { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import absoluteURL from "next-absolute-url";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
const { Item } = Menu;

const UserCourse = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  // below is to force react to updated
  const [state, setState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCompletedLessons = async () => {
    const { origin } = absoluteURL();
    const { data } = await axios.post(`${origin}/api/course/list-completed`, {
      courseId: course._id,
    });
    console.log(data);
    setCompletedLessons(data);
  };

  const loadCourse = async () => {
    const { origin } = absoluteURL();
    const { data } = await axios.get(`${origin}/api/user/course/${slug}`);
    setCourse(data.course);
  };

  const markCompleted = async () => {
    const { origin } = absoluteURL();
    const { data } = await axios.post(`${origin}/api/course/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markInCompleted = async () => {
    const { origin } = absoluteURL();
    try {
      const { data } = await axios.post(
        `${origin}/api/course/mark-Incomplete`,
        {
          courseId: course._id,
          lessonId: course.lessons[clicked]._id,
        }
      );
      const all = completedLessons;
      const index = all.indexOf(course.lessons[clicked]._id);

      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setState(!state);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="row">
      <div className="px-3">
        <Button
          onClick={() => setCollapsed(!collapsed)}
          className="text-primary mt-1 btn-block mb-2"
        >
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
          {!collapsed && "Lessons"}
        </Button>
        <Menu
          defaultSelectedKeys={[clicked]}
          inlineCollapsed={collapsed}
          style={{ height: "80vh", overflow: "auto" }}
        >
          {course.lessons.map((lesson, index) => (
            <Item
              onClick={() => setClicked(index)}
              key={index}
              icon={<Avatar>{index + 1}</Avatar>}
            >
              {lesson.title.substring(0, 30)}

              {completedLessons.includes(lesson._id) ? (
                <CheckCircleFilled
                  className="float-right text-primary ml-2"
                  style={{ marginTop: "13px" }}
                />
              ) : (
                <MinusCircleFilled
                  className="float-right text-danger ml-2"
                  style={{ marginTop: "13px" }}
                />
              )}
            </Item>
          ))}
        </Menu>
      </div>

      <div className="col">
        {clicked !== -1 ? (
          <>
            <div className="col alert alert-primary square">
              <b>{course.lessons[clicked].title.substring(0, 30)}</b>
              {!completedLessons.includes(course.lessons[clicked]._id) ? (
                <span className="float-right pointer" onClick={markCompleted}>
                  Mark as completed
                </span>
              ) : (
                <span className="float-right pointer" onClick={markInCompleted}>
                  Mark as incomplete
                </span>
              )}
            </div>

            {course.lessons[clicked].vedio &&
              course.lessons[clicked].vedio.url && (
                <>
                  <div className="wrapper">
                    <ReactPlayer
                      className="player"
                      url={course.lessons[clicked].vedio.url}
                      width="100%"
                      height="90vh"
                      controls
                      onEnded={() => markCompleted()}
                    />
                  </div>
                </>
              )}

            <ReactMarkdown
              source={course.lessons && course.lessons[clicked].content}
              className="single-post"
            />
          </>
        ) : (
          <div className="d-flex justify-content-center p-5">
            <div className="text-center p-5">
              <PlayCircleOutlined className="text-primary display-1 p-5" />
              <p className="lead">Clcik on the lessons to start learning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourse;
