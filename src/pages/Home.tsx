// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";
// components
import MapSection from "@components/HomeSection/MapSection/MapSection";
import TabAnchor from "@components/HomeSection/TabAnchor/TabAnchor";
import { useSelector } from "react-redux";
import { headerHeightState } from "@store/slices/changeComponentSize";
import { memo, useState } from "react";

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
          className="text-[12vw] foreground uppercase overflow-hidden"
          duration={3}
          letterStaggerTime={0.3}
        >
          Portfolio
        </TextSplitAnimation>
        <div>
          <TextSplitAnimation
            as="h2"
            className="text-[6vw] foreground uppercase overflow-hidden"
            delay={1}
            letterStaggerTime={0.07}
          >
            {t("home.intro.name")}
          </TextSplitAnimation>
        </div>
        <TextSplitAnimation
          delay={1.5}
          className="text-[6vw] foreground uppercase overflow-hidden"
          letterStaggerTime={0.09}
        >
          {t("home.intro.second-name")}
        </TextSplitAnimation>
        <TextSplitAnimation
          delay={2}
          isWordSplit={true}
          duration={0.5}
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
