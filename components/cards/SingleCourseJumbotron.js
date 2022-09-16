import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal } from "antd";
import ReactPlayer from "react-player";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
}) => {
  // console.log("FUCKING COURSEasfsdafsdf", course);
  // destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          {/* title */}
          <h1 className="text-light font-weight-bold">{name}</h1>
          {/* description */}
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          {/* category */}
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          />
          {/* author put name instead of id*/}
          <p>Created by {instructor.name}</p>
          {/* updated at */}
          <p>Last udpated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
          <h4 className="text-light">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </div>
        <div className="col-md-4">
          {/* show vedio preview or course image */}
          {lessons[0].vedio && lessons[0].vedio.url ? (
            <div
              onClick={() => {
                setPreview(lessons[0].vedio.url);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].vedio.url}
                light={image}
                width="100%"
                height="225px"
                // controls
              />
            </div>
          ) : (
            <>
              <img src={image} alt={name} className="img img-fluid" />
            </>
          )}
          {/* enroll button */}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
