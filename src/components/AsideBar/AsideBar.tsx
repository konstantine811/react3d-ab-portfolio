import { useSelector } from "react-redux";
import { Variants, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ArrowBigLeft, Menu } from "lucide-react";
import { FC, useState } from "react";
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
}

const AsideBar: FC<AsideBaProps> = ({ blogConfigItems }) => {
  const headerHeight = useSelector(headerHeightState);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  function getCurrentOpenedId(blogConfigItems: IBlog.MenuItems[]) {
    const opendItems: string[] = [];
    blogConfigItems.forEach((i) => {
      if (i.children && i.children.length) {
        const finded = i.children.find((iC) => getBlogPath(iC.id) === pathname);
        if (finded) {
          opendItems.push(i.id);
        }
      }
    });
    return opendItems;
  }

  return (
    <motion.div
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
                              key={itemC.id}
                              as={Link}
                              className="w-full justify-start mb-1"
                              href={getBlogPath(itemC.id)}
                              color={
                                pathname === getBlogPath(itemC.id)
                                  ? "primary"
                                  : "default"
                              }
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
