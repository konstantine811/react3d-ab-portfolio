import TextWrapper from "@components/TextWrapper/TextWrapper";
import { INotion } from "@models/server-response/notion.model";
import { Chip, Link } from "@nextui-org/react";
import { FC, ElementType } from "react";

export interface INotionTextProperties {
  data: INotion.ContentTextProperties;
  type: INotion.TypeContent;
}

export type INotionClassProps = { [key: string]: any };

export const isComponentName: INotionClassProps = {
  h: "Chip",
  a: "Link",
  bullet: "BulletChip",
};

export const NotionTypeClassToTailwind: INotionClassProps = {
  b: "font-bold",
  h: isComponentName.h,
  a: isComponentName.a,
  bullet: isComponentName.bullet,
};

export interface ITagClass {
  as?: ElementType;
  className?: string;
}

const NotionText: FC<INotionTextProperties> = ({ data, type }) => {
  const currentTagClass = getCurrentTagClass();
  function getCurrentTagClass(): ITagClass {
    switch (type) {
      case INotion.TypeContent.header:
        return {
          as: "h2",
          className: "text-4xl bold mt-6",
        };
      case INotion.TypeContent.sub_header:
        return {
          as: "h3",
          className: "text-2xl bold mt-6",
        };
      case INotion.TypeContent.sub_sub_header:
        return {
          as: "h4",
          className: "text-xl bold mt-6",
        };
      case INotion.TypeContent.bulleted_list:
        return {
          as: "li",
          className: "text-lg list-disc mt-3",
        };
      case INotion.TypeContent.quote:
        return {
          as: "span",
          className:
            "text-lg inline-block px-4 shadow-lg bg-primary rounded-lg text-white mb-1 mt-6",
        };
      default:
        return {
          as: "div",
          className: "text-lg mt-6",
        };
    }
  }
  return (
    <>
      <TextWrapper
        as={currentTagClass.as}
        className={currentTagClass.className}
      >
        {data?.title?.map((i) => {
          const [text, styleArr] = i;
          let objClasses: string[] = [];
          let componentName;
          if (styleArr && styleArr.length) {
            styleArr.forEach((iStyle: string[]) => {
              const prop = iStyle[0];
              const propName = NotionTypeClassToTailwind[prop];
              if (propName !== isComponentName[prop]) {
                objClasses.push(propName);
              } else {
                componentName = propName;
              }
            });
          }
          switch (type) {
            case INotion.TypeContent.bulleted_list:
              componentName = NotionTypeClassToTailwind.bullet;
              break;
            default:
          }
          return (
            <span className={objClasses.join(" ")} key={text}>
              {(() => {
                switch (componentName) {
                  case isComponentName.h:
                    return <Chip>{text}</Chip>;
                  case isComponentName.a:
                    return (
                      <Link href={text} target="_blank">
                        {text}
                      </Link>
                    );
                  case isComponentName.bullet:
                    return (
                      <Chip
                        className="text-lg p-5"
                        color="warning"
                        variant="dot"
                      >
                        {text}
                      </Chip>
                    );
                  default:
                    return <span>{text}</span>;
                }
              })()}
            </span>
          );
        })}
      </TextWrapper>
    </>
  );
};

export default NotionText;
