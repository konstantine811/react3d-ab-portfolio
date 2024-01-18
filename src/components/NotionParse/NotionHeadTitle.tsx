import { FC } from "react";
// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
// models
import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";

export interface INotionHeadTitleProperties {
  data: INotion.ContentPageProperties;
  id: string;
  format: IBlog.BlogCoverFormat;
}

const NotionHeadTitle: FC<INotionHeadTitleProperties> = ({
  data,
  id,
  format,
}) => {
  return (
    <div className="flex items-center">
      {format?.page_icon ? (
        <div className="mr-2 text-6xl"> {format.page_icon}</div>
      ) : null}
      <TextSplitAnimation
        as="h1"
        id={id}
        className="sm:text-6xl text-3xl text-center foreground uppercase overflow-hidden"
        duration={0.91}
        letterStaggerTime={0.09}
      >
        {data.title.map((i) => i[0]).join(" ")}
      </TextSplitAnimation>
    </div>
  );
};

export default NotionHeadTitle;
