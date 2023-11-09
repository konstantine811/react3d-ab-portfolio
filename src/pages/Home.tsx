// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <div className="container grow flex flex-col pt-32 items-center ">
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
          className="text-sm foreground max-w-lg text-center pt-10"
        >
          {t("home.intro.about-text")}
        </TextSplitAnimation>
      </div>
    </>
  );
};

export default HomePage;
