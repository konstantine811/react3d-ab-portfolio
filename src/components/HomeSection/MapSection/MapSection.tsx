import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
// storage
import { headerHeightState } from "@store/slices/changeComponentSize";
// components
import Map from "@components/Map/Map";
import TextAboutSection from "@components/HomeSection/TextAboutSection/TextAboutSection";
import { HomeChapters } from "@components/Map/Map";

interface IMapSection {
  id?: string;
}

const MapSection = ({ id }: IMapSection) => {
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const headerHeight = useSelector(headerHeightState);
  const [isChapterView, setIsChapterView] = useState<HomeChapters>();
  const { scrollYProgress } = useScroll({
    target: mapWrapRef,
    offset: ["end end", "start end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  function getMinFullScreen() {
    return `calc(100vh - ${headerHeight}px)`;
  }
  return (
    <>
      <div className="container pt-10">
        <div className="grid grid-cols-6 gap-10">
          <motion.div
            style={{ scale, opacity, top: `${headerHeight + 10}px` }}
            ref={mapWrapRef}
            className="lg:col-span-4 col-span-6 overflow-hidden  rounded-lg sticky"
          >
            <Map
              isChapterView={isChapterView}
              className="w-full lg:h-[calc(100vh_-_136px)] h-96 m-auto"
            />
          </motion.div>
          <div
            style={{ minHeight: getMinFullScreen() }}
            className="lg:col-span-2 col-span-6 flex items-center"
          >
            <TextAboutSection
              onChapterView={(chapter) => setIsChapterView(chapter)}
              id={HomeChapters.vasilivka}
            />
          </div>
          <div
            style={{ minHeight: getMinFullScreen() }}
            className="lg:col-start-5 lg:col-span-2 col-span-6"
          >
            <TextAboutSection
              onChapterView={(chapter) => setIsChapterView(chapter)}
              id={HomeChapters.zp}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MapSection;
