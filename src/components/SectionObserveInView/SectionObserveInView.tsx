import { CSSProperties, ReactNode, memo, useCallback, useEffect } from "react";
// store
import { useDispatch } from "react-redux";
import { onChangeSectionScroll } from "@store/slices/changeSectionScroll";
// models
import { SectionIds } from "@models/pageSection.model";

export interface ISectionObserveInView {
  children: ReactNode;
  id: SectionIds;
  className?: string;
  style?: CSSProperties;
}

const SectionObserveInView = memo(
  ({ children, id, className, style }: ISectionObserveInView) => {
    const dispatch = useDispatch();
    const element = document.getElementById(id);
    const callbackFunction = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          dispatch(onChangeSectionScroll(id));
        }
      },
      [dispatch, id]
    );
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(callbackFunction, options);
      if (element) {
        observer.observe(element);
      }
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [element, callbackFunction]);
    return (
      <>
        <div style={style} className={className}>
          {children}
        </div>
      </>
    );
  }
);

export default SectionObserveInView;
