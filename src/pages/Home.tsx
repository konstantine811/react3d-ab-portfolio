import { Button } from "@nextui-org/react";
// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <TextSplitAnimation as="h2" className="m-auto text-9xl foreground">
          Constantine
        </TextSplitAnimation>
        <TextSplitAnimation as="h2" className="m-auto text-9xl foreground">
          Portfolio
        </TextSplitAnimation>
        <TextSplitAnimation as="h2" className="m-auto text-9xl foreground">
          Abramov
        </TextSplitAnimation>
      </div>
    </>
  );
};

export default HomePage;
