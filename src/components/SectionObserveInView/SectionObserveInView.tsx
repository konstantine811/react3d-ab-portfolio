import { CSSProperties, ReactNode, memo, useRef } from "react";
import { useScroll } from "framer-motion";
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
    const { scrollYProgress } = useScroll({
      target: ref,
    });
    scrollYProgress.on("change", (e) => {
      dispatch(onChangeSectionScroll(id));
    });
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
