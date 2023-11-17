import { headerHeightState } from "@store/slices/changeComponentSize";
import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useSelector } from "react-redux";
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";

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
        <div className="container">
          <div style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
            <TextSplitAnimation as="h1" className="text-[6vw] text-center">
              What is SVG
            </TextSplitAnimation>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextSplitAnimation duration={0.1} as="p">
                  The svg tag defines a container for SVG graphics. SVG has
                  several methods for drawing paths, boxes, circles, text, and
                  graphic images. To learn more about SVG, please read our SVG
                  Tutorial.
                </TextSplitAnimation>
              </div>
              <iframe
                src="https://codesandbox.io/embed/kind-bird-qfs924?fontsize=14&hidenavigation=1&theme=dark"
                className="w-full h-96 border-0 rounded overflow-hidden md:col-span-1 col-span-2"
                title="kind-bird-qfs924"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            </div>
          </div>
          <div style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}></div>
          <div
            style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
            className=" bg-orange-300"
          ></div>
        </div>
      </main>
    </LocomotiveScrollProvider>
  );
};

export default BlogPage;
