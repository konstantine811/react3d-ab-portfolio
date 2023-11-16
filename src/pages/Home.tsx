// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";
// components
import MapSection from "@components/HomeSection/MapSection/MapSection";
import TabAnchor from "@components/HomeSection/TabAnchor/TabAnchor";
import { useSelector } from "react-redux";
import { headerHeightState } from "@store/slices/changeComponentSize";
import { memo } from "react";
import SectionObserveInView from "@components/SectionObserveInView/SectionObserveInView";
import { SectionIds } from "@models/pageSection.model";

const HomePage = memo(() => {
  const [t] = useTranslation("global");
  const headerHeight = useSelector(headerHeightState);
  return (
    <>
      <SectionObserveInView
        id={SectionIds.intro}
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        className="container flex flex-col pt-20 gap-3  justify-between"
      >
        <div className="flex flex-col gap-3 sm:justify-between">
          <TextSplitAnimation
            as="h2"
            className="text-[12vw] foreground uppercase overflow-hidden"
            duration={3}
            letterStaggerTime={0.3}
          >
            Portfolio
          </TextSplitAnimation>
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
      </SectionObserveInView>
      <SectionObserveInView id={SectionIds.skills}>
        <MapSection />
      </SectionObserveInView>
      <TabAnchor />
    </>
  );
});

export default HomePage;
