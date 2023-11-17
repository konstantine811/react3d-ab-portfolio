import { headerHeightState } from "@store/slices/changeComponentSize";
import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerHeight = useSelector(headerHeightState);
  return (
    <LocomotiveScrollProvider
      options={{
        smooth: false,
      }}
      containerRef={containerRef}
    >
      <main
        className="flex flex-col gap-5"
        data-scroll-container
        ref={containerRef}
      >
        <div
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
          className=" bg-orange-300"
        ></div>
        <div
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
          className=" bg-orange-300"
        ></div>
        <div
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
          className=" bg-orange-300"
        ></div>
      </main>
    </LocomotiveScrollProvider>
  );
};

export default BlogPage;
