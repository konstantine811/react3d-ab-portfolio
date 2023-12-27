import { headerHeightState } from "@store/slices/changeComponentSize";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
import { Image } from "@nextui-org/react";

const BlogArticlePage = () => {
  const blogConfigItems = QueryBlogItems();
  const headerHeight = useSelector(headerHeightState);
  const { id } = useParams();
  let blogArticle: IBlog.BlogArticle[] = [];
  if (id) {
    const resBlogArticle = QueryBlogArcticle(id);
    if (resBlogArticle) {
      blogArticle = resBlogArticle;
      console.log(blogArticle);
    }
  }
  return (
    <div>
      <AsideBar blogConfigItems={blogConfigItems}></AsideBar>
      <main className="flex flex-col gap-5 font-fira">
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
            {blogArticle && blogArticle.length
              ? blogArticle.map((item) => {
                  switch (item.type) {
                    case INotion.TypeContent.page:
                      return (
                        <NotionHeadTitle
                          key={item.id}
                          data={
                            item.properties as INotion.ContentPageProperties
                          }
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
                        <div key={item.id}>
                          <NotionImage
                            data={
                              item.properties as INotion.ContentImageProperties
                            }
                            format={item.format as IBlog.BlogImageFormat}
                          />
                        </div>
                      );
                  }
                })
              : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogArticlePage;
