// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";
// components
import MapSection from "@components/HomeSection/MapSection/MapSection";
import TabAnchor from "@components/HomeSection/TabAnchor/TabAnchor";
import { useSelector } from "react-redux";
import { headerHeightState } from "@store/slices/changeComponentSize";
import { memo } from "react";

const HomePage = memo(() => {
  const [t] = useTranslation("global");
  const headerHeight = useSelector(headerHeightState);
  return (
    <>
      <div
        id="intro"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        className="container flex flex-col pt-20 gap-3  justify-between"
      >
        <TextSplitAnimation
          as="h2"
          duration={3}
          className="text-[12vw] foreground uppercase overflow-hidden"
        >
          Portfolio
        </TextSplitAnimation>
        <div>
          <TextSplitAnimation
            as="h2"
            delay={2}
            duration={10}
            className="text-[6vw] foreground uppercase overflow-hidden"
          >
            {t("home.intro.name")}
          </TextSplitAnimation>
        </div>
        <TextSplitAnimation className="text-[3.33vw] foreground uppercase overflow-hidden">
          {t("home.intro.second-name")}
        </TextSplitAnimation>
        <TextSplitAnimation
          as="p"
          className="text-sm pb-20   foreground self-center text-center lg:pt-10 pt-4 overflow-hidden"
        >
          {t("home.intro.about-text")}
        </TextSplitAnimation>
      </div>
      <MapSection id="skills" />
      <TabAnchor />
    </>
  );
});

export default HomePage;
