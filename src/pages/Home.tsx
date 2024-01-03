// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo } from "react";
// components
import MapSection from "@components/HomeSection/MapSection/MapSection";
// storage
import { headerHeightState } from "@store/slices/changeComponentSize";
// model
import { SectionIds } from "@models/pageSection.model";

const HomePage = memo(() => {
  const [t] = useTranslation("global");
  const headerHeight = useSelector(headerHeightState);
  return (
    <>
      <div
        id={SectionIds.intro}
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        className="container flex flex-col pt-20 gap-3  justify-between"
      >
        <div className="flex flex-col gap-3 sm:justify-between">
          <div>
            <TextSplitAnimation
              as="h2"
              id={SectionIds.intro}
              className="text-[12vw] foreground uppercase overflow-hidden"
              duration={3}
              letterStaggerTime={0.3}
            >
              Portfolio
            </TextSplitAnimation>
          </div>
          <TextSplitAnimation
            as="h2"
            className="text-[6vw] foreground uppercase overflow-hidden"
            delay={1}
            letterStaggerTime={0.1}
          >
            {t("home.intro.name")}
          </TextSplitAnimation>
          <TextSplitAnimation
            delay={2}
            className="text-[6vw] foreground uppercase overflow-hidden"
            letterStaggerTime={0.1}
          >
            {t("home.intro.second-name")}
          </TextSplitAnimation>
        </div>
        <TextSplitAnimation
          delay={3}
          isWordSplit={true}
          duration={0.5}
          as="p"
          className="text-sm pb-20   foreground self-center text-center lg:pt-10 pt-4 overflow-hidden"
        >
          {t("home.intro.about-text")}
        </TextSplitAnimation>
      </div>
      <MapSection />
      {/* <TabAnchor /> */}
    </>
  );
});

export default HomePage;
