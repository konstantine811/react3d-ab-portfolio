import { Progress } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
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
