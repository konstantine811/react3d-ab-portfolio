import { INotion } from "@models/server-response/notion.model";
import { Chip } from "@nextui-org/react";
import React, { FC } from "react";

export interface INotionTextProperties {
  data: INotion.ContentTextProperties;
}

export type INotionClassProps = { [key: string]: any };

export const isComponentName: INotionClassProps = {
  h: "Chip",
};

export const NotionTypeClassToTailwind: INotionClassProps = {
  b: "font-bold",
  h: isComponentName.h,
};

const NotionText: FC<INotionTextProperties> = ({ data }) => {
  return (
    <>
      <div className="text-lg">
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
          return (
            <span className={objClasses.join(" ")} key={text}>
              {componentName ? <Chip>{text} </Chip> : <span>{text}</span>}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default NotionText;
