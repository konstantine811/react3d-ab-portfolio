import TextWrapper from "@components/TextWrapper/TextWrapper";
import { removeStringDefise } from "@helpers/server-request";
import { INotion } from "@models/server-response/notion.model";
import { Chip, Link } from "@nextui-org/react";
import { FC, ElementType } from "react";

export interface INotionTextProperties {
  data: any[];
  type: INotion.TypeContent;
  id: string;
  as?: ElementType;
  className?: string;
}

export type INotionClassProps = { [key: string]: any };

export const isComponentName: INotionClassProps = {
  h: "Chip",
  c: "Chip",
  a: "Link",
  bullet: "BulletChip",
  bulletLocalLink: "BulletLocalLink",
};

export const NotionTypeClassToTailwind: INotionClassProps = {
  b: "font-bold",
  h: isComponentName.h,
  a: isComponentName.a,
  c: isComponentName.c,
  bullet: isComponentName.bullet,
  bulletLocalLink: isComponentName.bulletLocalLink,
};

export interface ITagClass {
  as?: ElementType;
  className?: string;
}

const NotionText: FC<INotionTextProperties> = ({
  data,
  type,
  id,
  className = "text-lg mt-6",
  as = "div",
}) => {
  const currentTagClass = getCurrentTagClass();
  function getCurrentTagClass(): ITagClass {
    switch (type) {
      case INotion.TypeContent.header:
        return {
          as: "h2",
          className: "text-4xl bold mt-52",
        };
      case INotion.TypeContent.sub_header:
        return {
          as: "h3",
          className: "text-2xl bold mt-16",
        };
      case INotion.TypeContent.sub_sub_header:
        return {
          as: "h4",
          className: "text-xl bold mt-16",
        };
      case INotion.TypeContent.bulleted_list:
        return {
          as: "div",
          className: "text-lg mt-1",
        };
      case INotion.TypeContent.quote:
        return {
          as: "span",
          className:
            "text-lg inline-block px-4 shadow-lg bg-primary rounded-lg text-white mb-1 mt-6",
        };
      default:
        return {
          as,
          className,
        };
    }
  }
  return (
    <>
      <TextWrapper
        as={currentTagClass.as}
        className={currentTagClass.className}
        id={removeStringDefise(id)}
      >
        {data?.map((i, index) => {
          const [text, styleArr] = i;
          let objClasses: string[] = [];
          let link = "#";
          let absoluteLink = "";
          let componentName;
          if (styleArr && styleArr.length) {
            styleArr.forEach((iStyle: string[]) => {
              const prop = iStyle[0];
              const propName = NotionTypeClassToTailwind[prop];
              if (propName !== isComponentName[prop]) {
                objClasses.push(propName);
              } else if (
                type === INotion.TypeContent.bulleted_list &&
                propName === NotionTypeClassToTailwind.a &&
                iStyle[1].includes("#")
              ) {
                componentName = NotionTypeClassToTailwind.bulletLocalLink;
                link += iStyle[1].split(link)[1];
              } else {
                componentName = propName;
              }
              if (propName === isComponentName.a) {
                absoluteLink = iStyle[1];
              }
              if (
                type === INotion.TypeContent.bulleted_list &&
                propName !== NotionTypeClassToTailwind.a
              ) {
                componentName = NotionTypeClassToTailwind.bullet;
              }
            });
          }
          if (text === " ") {
            return null;
          }

          return (
            <span className={objClasses.join(" ")} key={index}>
              {(() => {
                switch (componentName) {
                  case isComponentName.h:
                  case isComponentName.c:
                    return <Chip>{text}</Chip>;
                  case isComponentName.a:
                    return (
                      <Link href={absoluteLink} target="_blank">
                        {text}
                      </Link>
                    );
                  case isComponentName.bulletLocalLink:
                    return (
                      <a href={link}>
                        <Chip
                          className="text-lg p-5 transition hover:bg-foreground hover:text-background"
                          color="warning"
                          variant="dot"
                        >
                          {text}
                        </Chip>
                      </a>
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
