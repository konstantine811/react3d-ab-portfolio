import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";
import { Card, CardBody, Image } from "@nextui-org/react";

export interface INotionBookmarkProperties {
  data: INotion.ContentBookmarkProperties;
  format: IBlog.BlogBookmarkFormat;
}

const NotionBookmark = ({ data, format }: INotionBookmarkProperties) => {
  return data.link[0] ? (
    <a href={data.link[0]} rel="noreferrer" target="_blank">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody className="p-0">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2 p-3 justify-between">
              <h3 className="text-large font-normal mt-2">{data.title[0]}</h3>
              <h6 className="text-foreground/90">{data.description[0]}</h6>
              <div className="flex gap-2">
                {format.bookmark_icon ? (
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={20}
                    width={20}
                    shadow="md"
                    src={format.bookmark_icon}
                  />
                ) : null}
                <p className="text-small text-foreground/80">{data.title[0]}</p>
              </div>
            </div>
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={format.bookmark_cover}
                width="100%"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </a>
  ) : null;
};

export default NotionBookmark;
