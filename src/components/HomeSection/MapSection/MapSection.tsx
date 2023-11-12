import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";
// components
import Map from "@components/Map/Map";

interface IMapSection {
  id: string;
}

const MapSection = forwardRef<HTMLDivElement, IMapSection>(({ id }, ref) => {
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mapWrapRef,
    offset: ["end end", "start end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  return (
    <>
      <div ref={ref} id={id} className="container pt-10">
        <div className="grid grid-cols-6 gap-10 items-center">
          <motion.div
            style={{ scale, opacity }}
            ref={mapWrapRef}
            className="overflow-hidden rounded-3xl lg:col-span-4 col-span-6"
          >
            <Map className="w-full md:h-[800px] h-96 m-auto   border" />
          </motion.div>
          <p className="text-md foreground lg:col-span-2 col-span-6 max-w-sm text-right">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi saepe
            delectus, assumenda vel dolorem culpa maiores officia blanditiis.
            Cupiditate a maxime error dolore necessitatibus iste fuga impedit
            perspiciatis velit cumque. Modi quisquam voluptas quos porro, quo
            laudantium a autem quae expedita maiores architecto ipsum tenetur
            natus explicabo, voluptatibus fugiat laboriosam corporis voluptatum
            aut. Saepe, eos? Ipsa dicta nostrum ducimus placeat. Consequatur
            quam minus debitis nam nostrum voluptatibus, nihil vitae, error
            fugit architecto ut, eos ipsam veniam. Vitae quisquam, id ad
            officiis exercitationem a atque qui eius repudiandae dolorem
            excepturi ducimus.
          </p>
        </div>
      </div>
    </>
  );
});

export default MapSection;
