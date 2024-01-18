import { Divider } from "@nextui-org/react";
// models
import { INotion } from "@models/server-response/notion.model";
import { IBlog } from "@models/blog.model";
// components
import NotionHeadTitle from "@components/NotionParse/NotionHeadTitle";
import NotionCode from "@components/NotionParse/NotionCode";
import NotionText from "@components/NotionParse/NotionText";
import NotionImage from "@components/NotionParse/NotionImage";
import NotionEmbed from "@components/NotionParse/NotionEmbed";

export interface IBlogArticleItemsProps {
  data: IBlog.BlogArticle[];
}

const BlogArticleItems = ({ data }: IBlogArticleItemsProps) => {
  return (
    <>
      {data.map((item) => {
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
                  data={item.properties as INotion.ContentCodeProperties}
                />
              </div>
            );
          case INotion.TypeContent.text:
          case INotion.TypeContent.header:
          case INotion.TypeContent.sub_header:
          case INotion.TypeContent.sub_sub_header:
          case INotion.TypeContent.quote:
          case INotion.TypeContent.bulleted_list:
            return (
              <div key={item.id}>
                {item.properties ? (
                  <NotionText
                    data={
                      (item.properties as INotion.ContentTextProperties).title
                    }
                    type={item.type}
                    id={item.id}
                  />
                ) : null}
              </div>
            );
          case INotion.TypeContent.numbered_list:
            return (
              <li key={item.id}>
                {item.properties ? (
                  <NotionText
                    data={
                      (item.properties as INotion.ContentTextProperties).title
                    }
                    type={item.type}
                    id={item.id}
                  />
                ) : null}
              </li>
            );
          case INotion.TypeContent.image:
            return (
              <div className="my-2" key={item.id}>
                <NotionImage
                  data={item.properties as INotion.ContentImageProperties}
                  format={item.format as IBlog.BlogImageFormat}
                />
              </div>
            );
          case INotion.TypeContent.embed:
            return (
              <div className="my-2" key={item.id}>
                <NotionEmbed format={item.format as IBlog.BlogEmbedFormat} />
              </div>
            );
          case INotion.TypeContent.divider:
            return (
              <Divider
                key={item.id}
                className="h-px mt-3 mb-20 w-full space-x-4"
                orientation="vertical"
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlogArticleItems;
