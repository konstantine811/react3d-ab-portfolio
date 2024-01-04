import { useSelector } from "react-redux";
import { Variants, motion } from "framer-motion";
import { ArrowBigLeft, Menu } from "lucide-react";
import { FC, useState } from "react";
import { isMobile } from "react-device-detect";
// storage
import { headerHeightState } from "@store/slices/changeComponentSize";
// components
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  ButtonGroup,
  Link,
  Spinner,
} from "@nextui-org/react";
// models
import { IBlog } from "@models/blog.model";
// helpers
import { getBlogPath } from "@helpers/blog";

const variants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "-100%" },
};

export interface AsideBaProps {
  blogConfigItems: IBlog.MenuItems[];
  blogId: string;
  id: string | undefined;
}

const AsideBar: FC<AsideBaProps> = ({ blogConfigItems, blogId, id }) => {
  const headerHeight = useSelector(headerHeightState);
  const [isOpen, setIsOpen] = useState(false);
  function getCurrentOpenedId(blogConfigItems: IBlog.MenuItems[]) {
    const openedItems: string[] = [];
    blogConfigItems.forEach((i) => {
      if (i.children && i.children.length) {
        const finded = i.children.find((iC) => iC.id === id);
        if (finded) {
          openedItems.push(i.id);
        }
      }
    });
    return openedItems;
  }

  return (
    <motion.div
      key={id + blogId}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className="fixed  top-0 items-start  max-w-sm  w-full z-50 "
      style={{
        top: headerHeight + 30,
        height: `calc(100% - ${headerHeight + 30 * 2}px)`,
      }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <ButtonGroup className="w-full rounded-r-lg ">
        <div className="px-3 border-b-1 border-t-1 border-r-1 rounded-r-lg bg-background border-gray-900 w-full absolute h-full overflow-y-auto top-0">
          {blogConfigItems && blogConfigItems.length ? (
            <Accordion
              keepContentMounted={true}
              defaultExpandedKeys={getCurrentOpenedId(blogConfigItems)}
            >
              {blogConfigItems.map((item) => {
                return (
                  <AccordionItem
                    key={item.id}
                    aria-label={item.title}
                    title={item.title}
                    startContent={
                      <Avatar
                        isBordered
                        color="primary"
                        radius="lg"
                        src={item.format?.page_cover}
                      />
                    }
                    indicator={
                      item.format?.page_icon ? (
                        <span>{item.format?.page_icon}</span>
                      ) : null
                    }
                  >
                    {item && item.children && item.children.length ? (
                      item?.children.map((itemC: IBlog.MenuItems) => {
                        return (
                          <div key={itemC.id}>
                            <Button
                              onClick={() => {
                                if (isMobile) {
                                  setIsOpen(false);
                                }
                              }}
                              key={itemC.id}
                              as={Link}
                              className="w-full justify-start mb-1"
                              href={getBlogPath(itemC.id)}
                              color={id === itemC.id ? "primary" : "default"}
                              variant="flat"
                            >
                              {itemC.title}
                            </Button>
                          </div>
                        );
                      })
                    ) : (
                      <Spinner />
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <Spinner />
          )}
        </div>
        <Button
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="mt-2 absolute left-full top-0"
          isIconOnly
          variant="flat"
          aria-label="Menu"
        >
          {isOpen ? <ArrowBigLeft /> : <Menu />}
        </Button>
      </ButtonGroup>
    </motion.div>
  );
};

export default AsideBar;
