import { useState, useEffect } from "react";
import { Card, Badge, Image } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";
import { currencyFormatter } from "../../utils/helpers";
import axios from "axios";
import absoluteURL from "next-absolute-url";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  const [students, setStudents] = useState(0);

  useEffect(() => {
    const studentsCount = async () => {
      try {
        const { origin } = absoluteURL();
        const { data } = await axios.post(
          `${origin}/api/instructor/students-count`,
          {
            courseId: course._id,
          }
        );
        setStudents(data.length);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    studentsCount();
  }, [course]);
  return (
    // <Link href="/course/[slug]" as={`/course/${slug}`}>
    //   <a>
    //     <Card
    //       hoverable
    //       style={{
    //         width: 340,
    //         height: 450,
    //       }}
    //       cover={
    //         // eslint-disable-next-line @next/next/no-img-element
    //         <img
    //           src={image}
    //           alt={name}
    //           style={{ height: "200px", objectFit: "cover" }}
    //           className="p-1"
    //         />
    //       }
    //     >
    //       <h2 className="h4 font-weight-bold">{name}</h2>
    //       <p>by {instructor.name}</p>
    //       <div className="flex justify-between">
    //         <Badge
    //           count={category}
    //           style={{ backgroundColor: "#03a9f4" }}
    //           className="pb-2 mr-2"
    //         />
    //         <Badge
    //           count={`${students}  Enrolled`}
    //           style={{ backgroundColor: "#03a9f4" }}
    //           className="pb-2 mr-2"
    //         />
    //       </div>

    //       <h4 className="pt-2">
    //         {paid
    //           ? currencyFormatter({
    //               amount: price,
    //               currency: "usd",
    //             })
    //           : "Free"}
    //       </h4>
    //     </Card>
    //   </a>
    // </Link>

    <div
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md 
     h-[430px] w-[330px] mb-5"
    >
      <Link href="/course/[slug]" as={`/course/${slug}`}>
        <a>
          <img
            src={image}
            alt={name}
            className="rounded-t-lg h-[220px] w-[100%] object-cover"
          />

          <div className="p-3">
            <h5 className=" font-weight-bold">{name}</h5>

            <div className="flex justify-between mt-4">
              <Badge
                count={category}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-2 mr-2"
              />
              <Badge
                count={`${students}  Enrolled`}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-2 mr-2"
              />
            </div>

            <div className="flex justify-between align-items-center mt-3">
              <h6 className="font-bold">
                {paid
                  ? currencyFormatter({
                      amount: price,
                      currency: "usd",
                    })
                  : "Free"}
              </h6>
              <p className="text-black"> by {instructor.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CourseCard;
