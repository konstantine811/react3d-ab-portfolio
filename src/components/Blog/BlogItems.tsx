import { useTranslation } from "react-i18next";
import { FC, Fragment, useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Loader from "@components/Loader/Loader";
// server request helpers
import { FilterName, QueryBlogItems } from "@helpers/server-request";
// configs
import { DataFormat } from "@configs/common";

export interface IBlogItemsProps {
  blogId: string;
}

const BlogItems: FC<IBlogItemsProps> = ({ blogId }) => {
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [filterBlog, setFilterBlog] = useState<string>(FilterName.all);
  useEffect(() => {
    setFilterBlog(FilterName.all);
  }, [blogId]);
  const blogSelectedItems = QueryBlogItems(blogId, filterBlog);
  const blogConfigItems = QueryBlogItems(blogId);
  return (
    <Fragment key={blogId}>
      {blogConfigItems && blogConfigItems.length > 1 ? (
        <div className="container max-w-screen-lg">
          <div className="flex justify-end">
            <Tabs
              key={blogId}
              color="primary"
              variant="bordered"
              aria-label="Tabs blog config"
              defaultSelectedKey={t("blog.all_sections")}
              onSelectionChange={(e) => {
                if (e === t("blog.all_sections")) {
                  setFilterBlog(FilterName.all);
                } else {
                  setFilterBlog(e as string);
                }
              }}
            >
              <Tab
                key={t("blog.all_sections")}
                title={t("blog.all_sections")}
              />
              {blogConfigItems.map((key) => (
                <Tab
                  title={
                    <div className="flex items-center space-x-2">
                      <Avatar
                        className="w-6 h-6 text-tiny"
                        src={key.format?.page_cover}
                      />
                      <span>{key.title}</span>
                    </div>
                  }
                  key={key.title}
                />
              ))}
            </Tabs>
          </div>
        </div>
      ) : null}
      {blogSelectedItems && blogSelectedItems.length ? (
        blogSelectedItems.map((blogItem) => {
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
        <Loader />
      )}
    </Fragment>
  );
};

export default BlogItems;
