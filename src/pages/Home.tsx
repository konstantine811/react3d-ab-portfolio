// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";
import { Pagination, Tab, Tabs } from "@nextui-org/react";
import { BookUser, NutOff, NutOffIcon, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import Card from "@components/Card/Card";
import Map from "../components/Map/Map";

const HomePage = () => {
  const [t] = useTranslation("global");
  const cardVariants: Variants = {
    offscreen: {
      scale: 0.3,
    },
    onscreen: {
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.1,
        duration: 1.8,
      },
    },
  };
  return (
    <>
      <div className="container grow flex flex-col pt-2 gap-3 items-center ">
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

      <div className="container">
        <motion.div
          className="w-full m-auto"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div className="" variants={cardVariants}>
            <Map className="max-w-9xl h-96 m-auto" />
          </motion.div>
        </motion.div>
      </div>
      <div className="sticky bottom-3 pt-5">
        <div className="container flex flex-wrap gap-4 items-center justify-center">
          <Tabs
            onSelectionChange={(e) => {
              console.log(e);
            }}
            aria-label="Options"
            color="primary"
            variant="solid"
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <BookUser />
                  <span>About me</span>
                </div>
              }
            />
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <NutOffIcon />
                  <span>Projects</span>
                </div>
              }
            />
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <PartyPopper />
                  <span>Contacts</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
