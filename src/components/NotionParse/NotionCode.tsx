import { INotion } from "@models/server-response/notion.model";
import { Chip } from "@nextui-org/react";
import { Code } from "lucide-react";
import { FC } from "react";
// libs
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface INotionCodeProperties {
  data: INotion.ContentCodeProperties;
}

const NotionCode: FC<INotionCodeProperties> = ({ data }) => {
  return (
    <>
      {data.language ? (
        <Chip
          className="relative top-2"
          variant="flat"
          color="secondary"
          endContent={<Code size={18} />}
        >
          {data.language[0]}
        </Chip>
      ) : null}
      <SyntaxHighlighter
        aria-hidden="true"
        language={"javascript"}
        className="rounded-lg shadow-lg"
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        style={atomOneDark}
      >
        {data.title.join(" ")}
      </SyntaxHighlighter>
    </>
  );
};

export default NotionCode;
