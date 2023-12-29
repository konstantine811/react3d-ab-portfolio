import { Progress } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { headerHeightState } from "@store/slices/changeComponentSize";

const Loader = () => {
  const headerHeight = useSelector(headerHeightState);
  return (
    <div
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      className="flex items-center justify-center min-h-screen"
    >
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
