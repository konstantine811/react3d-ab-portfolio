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
      <div className="container min-h-screen flex flex-col pt-2 gap-3 items-center ">
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

      <div className="container pt-3">
        <div className="flex gap-24">
          <motion.div
            className="w-full m-auto "
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div className="" variants={cardVariants}>
              <Map className="w-full min-h-[calc(100vh_-_190px)]  m-auto rounded-3xl overflow-hidden border" />
            </motion.div>
          </motion.div>
          <TextSplitAnimation
            isWordSplit={true}
            className="text-md foreground max-w-lg pt-10"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi saepe
            delectus, assumenda vel dolorem culpa maiores officia blanditiis.
            Cupiditate a maxime error dolore necessitatibus iste fuga impedit
            perspiciatis velit cumque. Modi quisquam voluptas quos porro, quo
            laudantium a autem quae expedita maiores architecto ipsum tenetur
            natus explicabo, voluptatibus fugiat laboriosam corporis voluptatum
            aut. Saepe, eos? Ipsa dicta nostrum ducimus placeat. Consequatur
            quam minus debitis nam nostrum voluptatibus, nihil vitae, error
            fugit architecto ut, eos ipsam veniam. Vitae quisquam, id ad
            officiis exercitationem a atque qui eius repudiandae dolorem
            excepturi ducimus. Vero sapiente ea quae in aperiam. Mollitia dolor
            minus perferendis impedit assumenda debitis consequatur voluptatem
            quas vitae architecto, modi unde, adipisci obcaecati sapiente
            veritatis sed ea maiores quis illo magni. Est voluptate provident
            voluptatem non temporibus incidunt dolore omnis iste tempora, fugiat
            quae hic odio minima molestiae quis inventore, dicta alias totam
            nesciunt error commodi assumenda placeat quaerat. Asperiores,
            necessitatibus! Aut facilis, velit maxime quae porro eos. Cumque
            accusamus quas dolorem beatae, corporis tenetur maiores velit unde
            facere alias amet. Laudantium nostrum aliquam eos necessitatibus
            porro molestias deserunt blanditiis illum. Sed saepe dolores vitae
            optio nihil harum commodi, omnis atque eaque, veniam, nesciunt
            aspernatur dignissimos in suscipit excepturi rem. Dolore repellendus
            fuga accusantium. Exercitationem enim dignissimos corporis
            perferendis alias vel? Sed adipisci autem eveniet quibusdam! Tempora
            doloremque reprehenderit odio amet saepe! Atque ut accusantium et,
            ipsa, modi illum esse maxime reiciendis dolorem repellat quo! Iusto
            rem nesciunt quam quia aut? Eligendi doloribus velit expedita culpa,
            vel tenetur! Porro quae consequuntur dolor maxime iure consequatur
            aut recusandae, aliquam exercitationem possimus fugit ratione neque
            ducimus natus esse provident temporibus obcaecati velit odio.
            Suscipit obcaecati ratione velit illum! Reprehenderit blanditiis
            provident, praesentium ex magnam sed dolorem libero consequuntur, et
            corporis in cum, voluptas perspiciatis debitis quod aperiam? Magni
            perspiciatis eos rem placeat architecto?
          </TextSplitAnimation>
        </div>
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
