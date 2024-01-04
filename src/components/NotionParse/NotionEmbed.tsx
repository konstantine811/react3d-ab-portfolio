import { IBlog } from "@models/blog.model";

export interface INotionEmbedProperties {
  format: IBlog.BlogEmbedFormat;
}

const NotionEmbed = ({ format }: INotionEmbedProperties) => {
  return (
    <iframe
      key={format.display_source}
      title={format.display_source}
      className="w-full"
      height={format.block_height}
      src={format.display_source}
    />
  );
};

export default NotionEmbed;
