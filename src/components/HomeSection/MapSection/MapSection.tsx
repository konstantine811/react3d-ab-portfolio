import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// components
import Map from "@components/Map/Map";

interface IMapSection {
  id: string;
}

export default function MapSection({ id }: IMapSection) {
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mapWrapRef,
    offset: ["end end", "start end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  return (
    <>
      <div id={id} className="container pt-10">
        <div className="grid grid-cols-6 gap-10">
          <motion.div
            style={{ scale, opacity }}
            ref={mapWrapRef}
            className="overflow-hidden rounded-3xl lg:col-span-4 col-span-6"
          >
            <Map className="w-full md:h-[800px] h-96 m-auto   border" />
          </motion.div>
          <p className="text-md foreground lg:col-span-2 col-span-6">
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
          </p>
        </div>
      </div>
    </>
  );
}
