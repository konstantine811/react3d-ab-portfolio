import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { DataFormat } from "@configs/common";
import Moment from "react-moment";
// server request helpers
import { QueryBlogItems } from "@helpers/server-request";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spinner,
} from "@nextui-org/react";
// helpers
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const blogConfigItems = QueryBlogItems();
  const [t] = useTranslation("global");
  return (
    <main className="flex flex-col gap-5 font-fira">
      {blogConfigItems && blogConfigItems.length ? (
        blogConfigItems.map((blogItem) => {
          return (
            <Fragment key={blogItem.id}>
              <Card className="h-[250px] mb-3">
                <div className="container max-w-screen-lg">
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <h1 className="text-[6vw] text-center text-white">
                      {blogItem.title}
                    </h1>
                  </CardHeader>
                </div>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={blogItem.format?.page_cover}
                />
              </Card>

              {blogItem.children && blogItem.children.length ? (
                <div className="container max-w-screen-lg">
                  <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {blogItem.children.map((blogItemChild) => {
                      return (
                        <Card
                          isPressable
                          onPress={() => navigate(blogItemChild.id)}
                          key={blogItemChild.id}
                        >
                          <CardBody className="overflow-visible p-0">
                            <Image
                              shadow="sm"
                              radius="lg"
                              width="100%"
                              alt={blogItemChild.title}
                              className="w-full object-cover h-[140px]"
                              src={blogItemChild.format?.page_cover}
                            />
                          </CardBody>
                          <CardFooter className=" flex-col items-start">
                            <p className="text-tiny uppercase font-bold">
                              <span className="mr-1">
                                {t("blog.blog-items.created-time")}
                              </span>
                              <Moment format={DataFormat.pointTime}>
                                {blogItemChild.created_time}
                              </Moment>
                            </p>
                            <small className="text-default-500">
                              <span className="mr-1">
                                {t("blog.blog-items.edited-time")}
                              </span>
                              <Moment format={DataFormat.pointTime}>
                                {blogItemChild.last_edited_time}
                              </Moment>
                            </small>
                            <h4 className="font-bold text-large text-left">
                              {blogItemChild.format?.page_icon ? (
                                <span className="mr-2">
                                  {" "}
                                  {blogItemChild.format?.page_icon}
                                </span>
                              ) : null}

                              {blogItemChild.title}
                            </h4>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default BlogPage;
