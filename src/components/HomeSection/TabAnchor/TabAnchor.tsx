import { Tab, Tabs } from "@nextui-org/react";
import { BookUser, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ITabAnchorProps {
  isIntroInView?: boolean;
  isMapInView?: boolean;
}

export enum TabKeys {
  intro = "intro",
  skills = "skills",
}

export default function TabAnchor({
  isMapInView,
  isIntroInView,
}: ITabAnchorProps) {
  const [t] = useTranslation("global");
  return (
    <>
      <div className="sticky bottom-3 pt-5">
        <div className="container flex flex-wrap gap-4 items-center justify-center">
          <Tabs
            onSelectionChange={(e) => {
              document.getElementById(e as string)?.scrollIntoView();
            }}
            aria-label="Options"
            color="primary"
            variant="underlined"
            className="bg-white bg-opacity-25 rounded-xl"
          >
            <Tab
              key="intro"
              title={
                <div className="flex items-center space-x-2">
                  <PartyPopper />
                  <span>{t("home.tabs.intro")}</span>
                  <span>{isIntroInView}</span>
                </div>
              }
            />
            <Tab
              key="skills"
              title={
                <div className="flex items-center space-x-2">
                  <BookUser />
                  <span>
                    {t("home.tabs.skills")} {isMapInView ? "vis" : "not"}
                  </span>
                  <span></span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    </>
  );
}
