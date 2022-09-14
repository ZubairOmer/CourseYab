import { Card, Badge, Image } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  console.log("COURSE", course);
  return (
    <Link href="/course/[slug]" as={`/course/${slug}`}>
      <a>
        <Card
          className="mb-3"
          cover={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="h4 font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>
          {/* {category.map((c) => ( */}
          <Badge
            //   key={c.name}
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          {/* } */}
          <h4 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
