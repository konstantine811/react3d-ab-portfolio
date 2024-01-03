import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
// components
import { HomeChapters } from "@components/Map/Map";

interface ITextAboutSectionProps {
  id: HomeChapters;
  onChapterView: (chapterName: HomeChapters) => void;
}

const TextAboutSection = ({ id, onChapterView }: ITextAboutSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      onChapterView(id);
    }
  }, [isInView, id, onChapterView]);
  document.addEventListener("scroll", () => {
    if (ref.current) {
      const { top, bottom } = ref.current.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        onChapterView(id);
      }
    }
  });
  return (
    <div ref={ref}>
      <p className="text-md lg:max-w-sm ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi saepe
        delectus, assumenda vel dolorem culpa maiores officia blanditiis.
        Cupiditate a maxime error dolore necessitatibus iste fuga impedit
        perspiciatis velit cumque. Modi quisquam voluptas quos porro, quo
        laudantium a autem quae expedita maiores architecto ipsum tenetur natus
        explicabo, voluptatibus fugiat laboriosam corporis voluptatum aut.
        Saepe, eos? Ipsa dicta nostrum ducimus placeat. Consequatur quam minus
        debitis nam nostrum voluptatibus, nihil vitae, error fugit architecto
        ut, eos ipsam veniam. Vitae quisquam, id ad officiis exercitationem a
        atque qui eius repudiandae dolorem excepturi ducimus.
      </p>
    </div>
  );
};

export default TextAboutSection;
