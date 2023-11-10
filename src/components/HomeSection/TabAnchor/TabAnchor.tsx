import { Tab, Tabs } from "@nextui-org/react";
import { BookUser, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TabAnchor() {
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
            variant="solid"
          >
            <Tab
              key="intro"
              title={
                <div className="flex items-center space-x-2">
                  <PartyPopper />
                  <span>{t("home.tabs.intro")}</span>
                </div>
              }
            />
            <Tab
              key="skills"
              title={
                <div className="flex items-center space-x-2">
                  <BookUser />
                  <span>{t("home.tabs.skills")}</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    </>
  );
}
