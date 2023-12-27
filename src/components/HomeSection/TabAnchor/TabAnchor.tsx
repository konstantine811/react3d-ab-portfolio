import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// lib components
import { BookUser, PartyPopper } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/react";
// storage
import { currentSectionState } from "@store/slices/changeSectionScroll";
// models
import { SectionIds } from "@models/pageSection.model";

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
  const onCurrentSectionState = useSelector(currentSectionState);
  return (
    <>
      <div className="sticky bottom-3 pt-5">
        <div className="container flex flex-wrap gap-4 items-center justify-center">
          <Tabs
            onSelectionChange={(e) => {
              document.getElementById(e as string)?.scrollIntoView();
            }}
            selectedKey={onCurrentSectionState}
            aria-label="Options"
            color="primary"
          >
            <Tab
              key={SectionIds.intro}
              title={
                <div className="flex items-center space-x-2">
                  <PartyPopper />
                  <span>{t("home.tabs.intro")}</span>
                  <span>{isIntroInView}</span>
                </div>
              }
            />
            <Tab
              key={SectionIds.skills}
              title={
                <div className="flex items-center space-x-2">
                  <BookUser />
                  <span>{t("home.tabs.skills")}</span>
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
