import { ElementType, FC, ReactNode, forwardRef, memo } from "react";
// utils
import { cn } from "@lib/merge-classes-utils";

export interface ITextWrapperProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const TextWrapper = memo(
  forwardRef<HTMLElement, ITextWrapperProps>(
    ({ as: Tag = "p", className, children, ...props }, ref) => {
      return (
        <Tag ref={ref} {...props} className={cn(className)}>
          {children}
        </Tag>
      );
    }
  )
);

export default TextWrapper;
