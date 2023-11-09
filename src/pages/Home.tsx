// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";

const HomePage = () => {
  return (
    <>
      <div className="container grow flex flex-col justify-around">
        <TextSplitAnimation
          as="h2"
          className="md:text-9xl sm:text-8xl text-6xl foreground"
        >
          Constantine
        </TextSplitAnimation>
        <TextSplitAnimation
          as="h2"
          className="md:text-9xl sm:text-8xl text-6xl foreground"
        >
          Portfolio
        </TextSplitAnimation>
        <TextSplitAnimation
          as="h2"
          className="md:text-9xl sm:text-8xl text-6xl foreground"
        >
          Abramov
        </TextSplitAnimation>
      </div>
    </>
  );
};

export default HomePage;
