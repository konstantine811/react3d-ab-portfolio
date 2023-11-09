// components
import TextSplitAnimation from "@components/TextAnimation/TextSplitAnimation";

const HomePage = () => {
  return (
    <>
      <div className="container grow flex flex-col pt-32 items-center">
        <TextSplitAnimation
          as="h2"
          className="md:text-9xl sm:text-8xl text-6xl foreground"
        >
          Constantine
        </TextSplitAnimation>
        <TextSplitAnimation className="md:text-9xl sm:text-8xl text-6xl foreground">
          Abramov
        </TextSplitAnimation>
        <TextSplitAnimation
          as="p"
          className="foreground max-w-lg text-center pt-10"
        >
          Welcome to my portfolio! I'm a passionate and skilled front-end
          programmer with a diverse set of tools and technologies at my
          disposalfe.
        </TextSplitAnimation>
      </div>
    </>
  );
};

export default HomePage;
