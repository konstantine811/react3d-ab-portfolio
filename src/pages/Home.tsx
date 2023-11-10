// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";
// components
import MapSection from "@components/HomeSection/MapSection/MapSection";
import TabAnchor from "@components/HomeSection/TabAnchor/TabAnchor";

const HomePage = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <div
        id="intro"
        className="container flex flex-col pt-2 gap-3 items-center "
      >
        <TextSplitAnimation
          as="h2"
          className="text-[13vw] foreground uppercase"
        >
          {t("home.intro.name")}
        </TextSplitAnimation>
        <TextSplitAnimation className="text-[13vw] foreground uppercase">
          {t("home.intro.second-name")}
        </TextSplitAnimation>
        <TextSplitAnimation
          as="p"
          className="text-sm foreground max-w-lg text-center lg:pt-10 pt-4"
        >
          {t("home.intro.about-text")}
        </TextSplitAnimation>
      </div>
      <MapSection id="skills" />
      <TabAnchor />
    </>
  );
};

export default HomePage;
