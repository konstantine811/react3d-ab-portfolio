import { headerHeightState } from "@store/slices/changeComponentSize";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
// lib components
import { Button, Image } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// server request helpers
import { QueryBlogArcticle, QueryBlogItems } from "@helpers/server-request";
// model
import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";
// components
import AsideBar from "@components/AsideBar/AsideBar";
import NotionHeadTitle from "@components/notion-parse/NotionHeadTitle";
import NotionCode from "@components/notion-parse/NotionCode";
import NotionText from "@components/notion-parse/NotionText";
import NotionImage from "@components/notion-parse/NotionImage";
import Loader from "@components/Loader/Loader";
// helpers
import { getBlogPath } from "@helpers/blog";

function getPrevNextId(
  blogConfigItems: IBlog.MenuItems[],
  id: string | undefined
) {
  let prevId = null;
  let nextId = null;
  if (id) {
    blogConfigItems.forEach((i) => {
      if (i.children && i.children.length) {
        const findedIndex = i.children.findIndex((iC) => iC.id === id);
        if (findedIndex !== -1) {
          const nextItem = i.children[findedIndex + 1];
          const prevItem = i.children[findedIndex - 1];
          if (nextItem) {
            nextId = nextItem.id;
          }
          if (prevItem) {
            prevId = prevItem.id;
          }
        }
      }
    });
  }

  return { prevId, nextId };
}

const BlogArticlePage = () => {
  const blogConfigItems = QueryBlogItems();
  const headerHeight = useSelector(headerHeightState);
  const { id } = useParams();
  const navigate = useNavigate();
  let blogArticle: IBlog.BlogArticle[] = [];
  const [t] = useTranslation("global");
  // find prev and next index
  const { prevId, nextId } = getPrevNextId(blogConfigItems, id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // query current blog article
  if (id) {
    const resBlogArticle = QueryBlogArcticle(id);
    if (resBlogArticle) {
      blogArticle = resBlogArticle;
    }
  }
  return (
    <>
      <AsideBar blogConfigItems={blogConfigItems}></AsideBar>
      <main className="flex flex-col gap-5 mb-10">
        {blogArticle &&
        blogArticle.length &&
        blogArticle[0].format &&
        (blogArticle[0].format as IBlog.BlogCoverFormat).page_cover ? (
          <>
            <Image
              removeWrapper
              alt={blogArticle[0].properties.title[0]}
              className="z-0 w-full h-[350px] object-cover"
              src={(blogArticle[0].format as IBlog.BlogCoverFormat).page_cover}
            />
          </>
        ) : null}
        <div className="container max-w-screen-lg">
          <div style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
            {blogArticle && blogArticle.length ? (
              blogArticle.map((item) => {
                switch (item.type) {
                  case INotion.TypeContent.page:
                    return (
                      <NotionHeadTitle
                        key={item.id}
                        data={item.properties as INotion.ContentPageProperties}
                        format={item.format as IBlog.BlogCoverFormat}
                        id={item.id}
                      />
                    );
                  case INotion.TypeContent.code:
                    return (
                      <div key={item.id} className="mb-4">
                        <NotionCode
                          data={
                            item.properties as INotion.ContentCodeProperties
                          }
                        />
                      </div>
                    );
                  case INotion.TypeContent.text:
                  case INotion.TypeContent.header:
                  case INotion.TypeContent.sub_header:
                  case INotion.TypeContent.sub_sub_header:
                  case INotion.TypeContent.quote:
                    return (
                      <div key={item.id} className="mt-6">
                        {item.properties ? (
                          <NotionText
                            data={
                              item.properties as INotion.ContentTextProperties
                            }
                            type={item.type}
                          />
                        ) : null}
                      </div>
                    );
                  case INotion.TypeContent.image:
                    return (
                      <div className="my-2" key={item.id}>
                        <NotionImage
                          data={
                            item.properties as INotion.ContentImageProperties
                          }
                          format={item.format as IBlog.BlogImageFormat}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <Loader />
            )}
          </div>
          <div className="flex w-full mt-10">
            {prevId ? (
              <Button
                color="primary"
                variant="flat"
                aria-label={t("blog.next_article")}
                onClick={() => {
                  navigate(getBlogPath(prevId));
                }}
                startContent={<ChevronLeft />}
              >
                {t("blog.prev_article")}
              </Button>
            ) : null}
            {nextId ? (
              <Button
                className="ml-auto"
                color="primary"
                variant="flat"
                onClick={() => {
                  navigate(getBlogPath(nextId));
                }}
                aria-label={t("blog.next_article")}
                endContent={<ChevronRight />}
              >
                {t("blog.next_article")}
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogArticlePage;
