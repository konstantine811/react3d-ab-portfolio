import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";

export interface INotionEmbedProperties {
  format: IBlog.BlogEmbedFormat;
  data: INotion.ContentEmbedProperties;
}

const NotionEmbed = ({ format, data }: INotionEmbedProperties) => {
  return (
    <iframe
      key={format.display_source ? format.display_source : data.source[0]}
      title={format.display_source ? format.display_source : data.source[0]}
      className="w-full"
      height={format.block_height ? format.block_height : 500}
      src={format.display_source ? format.display_source : data.source[0]}
    />
  );
};

export default NotionEmbed;
