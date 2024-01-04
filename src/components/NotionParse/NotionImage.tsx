import { FC } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
// models
import { INotion } from "@models/server-response/notion.model";
import { IBlog } from "@models/blog.model";

export interface INotionImageProperties {
  data: INotion.ContentImageProperties;
  format: IBlog.BlogImageFormat;
}

const NotionImage: FC<INotionImageProperties> = ({ data, format }) => {
  return (
    <div className="flex justify-center">
      <Card isFooterBlurred>
        <Image
          removeWrapper
          className="object-cover"
          width={format.block_width}
          height={format.block_height}
          alt={data.title ? data.title[0] : "image"}
          src={format.display_source}
        />

        {data.caption && data.caption.length ? (
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">{data.caption[0]}</p>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
};

export default NotionImage;
