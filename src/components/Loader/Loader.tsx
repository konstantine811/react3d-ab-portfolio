import { Progress } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { headerHeightState } from "@store/slices/changeComponentSize";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const headerHeight = useSelector(headerHeightState);
  const [t] = useTranslation("global");
  return (
    <div
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      className="flex flex-col items-center justify-center min-h-screen py-10 px-5"
    >
      <div className="loader-txt pb-3">{t("loader-txt")}</div>
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  );
};

export default Loader;
