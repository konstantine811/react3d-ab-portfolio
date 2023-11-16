import {
  CSSProperties,
  ReactNode,
  RefObject,
  memo,
  useEffect,
  useRef,
} from "react";
import { useInView, useScroll, useTransform } from "framer-motion";
import { useDispatch } from "react-redux";
import { onChangeSectionScroll } from "@store/slices/changeSectionScroll";
import { SectionIds } from "@models/pageSection.model";

export interface ISectionObserveInView {
  children: ReactNode;
  id: SectionIds;
  className?: string;
  style?: CSSProperties;
}

const SectionObserveInView = memo(
  ({ children, id, className, style }: ISectionObserveInView) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const isInView = useInView(ref, { margin: "-100px 0px 0px 0px" });
    const { scrollYProgress } = useScroll({
      target: ref,
    });
    scrollYProgress.on("change", (e) => {
      console.log("e", id, e);
      dispatch(onChangeSectionScroll(id));
    });
    /*     useEffect(() => {
      if (isInView) {
        console.log("in View");
        dispatch(onChangeSectionScroll(id));
      }
    }, [id, isInView, dispatch]); */
    return (
      <>
        <div id={id} ref={ref} className={className} style={style}>
          {children}
        </div>
      </>
    );
  }
);

export default SectionObserveInView;
