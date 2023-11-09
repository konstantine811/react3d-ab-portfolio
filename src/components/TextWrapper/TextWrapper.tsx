import { ElementType, FC, ReactNode } from "react";
// utils
import { cn } from "@lib/merge-classes-utils";

export interface ITextWrapperProps {
  as?: ElementType;
  className: string;
  children: ReactNode;
}

const TextWrapper: FC<ITextWrapperProps> = (
  { as: Tag = "p", className, children, ...props },
  ref
) => {
  return (
    <Tag {...props} className={cn(className)}>
      {children}
    </Tag>
  );
};

export default TextWrapper;
