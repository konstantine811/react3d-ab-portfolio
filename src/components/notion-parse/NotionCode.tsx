import { INotion } from "@models/server-response/notion.model";
import { FC } from "react";
// libs
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface INotionCodeProperties {
  data: INotion.ContentCodeProperties;
}

const NotionCode: FC<INotionCodeProperties> = ({ data }) => {
  return (
    <>
      {data.language ? (
        <div className="code-filename">{data.language[0]}</div>
      ) : null}
      <SyntaxHighlighter
        aria-hidden="true"
        language={data.language ? data.language[0] : "html"}
        className="rounded-lg shadow-lg"
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        style={a11yDark}
      >
        {data.title.join(" ")}
      </SyntaxHighlighter>
    </>
  );
};

export default NotionCode;
