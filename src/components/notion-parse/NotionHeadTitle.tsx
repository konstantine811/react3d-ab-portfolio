import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { INotion } from "@models/server-response/notion.model";
import { FC } from "react";

export interface INotionHeadTitleProperties {
  data: INotion.ContentPageProperties;
  id: string;
}

const NotionHeadTitle: FC<INotionHeadTitleProperties> = ({ data, id }) => {
  return (
    <>
      <TextSplitAnimation
        as="h1"
        id={id}
        className="text-6xl text-center foreground uppercase overflow-hidden"
        duration={0.91}
        letterStaggerTime={0.09}
      >
        {data.title.join(" ")}
      </TextSplitAnimation>
    </>
  );
};

export default NotionHeadTitle;
