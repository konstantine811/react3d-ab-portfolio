import { IRouterConfiguration } from "@models/navigation.model";
import { Accordion, AccordionItem, Divider, Link } from "@nextui-org/react";
import { Box } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface NavMenuAccordionItemProps {
  pathname: string;
  routerConfig: IRouterConfiguration;
  closeMenu: () => void;
}

const NavMenuAccordionItem: FC<NavMenuAccordionItemProps> = ({
  pathname,
  routerConfig,
  closeMenu,
}) => {
  const [t] = useTranslation("global");
  return (
    <>
      {routerConfig.children?.length ? (
        <>
          <Accordion isCompact>
            <AccordionItem
              aria-label={t(routerConfig.title)}
              title={
                <h3
                  className={
                    routerConfig.children
                      .map((i) => i.path as string)
                      .includes(pathname)
                      ? "text-primary"
                      : "text-foreground"
                  }
                >
                  {t(routerConfig.title)}
                </h3>
              }
              startContent={<Box className="text-primary" />}
            >
              <Divider orientation="horizontal" />
              {routerConfig.children.map((i, index) => {
                return (
                  <Link
                    color={pathname === i.path ? "primary" : "foreground"}
                    isDisabled={pathname === i.path}
                    href={i.path}
                    className="w-full pt-3 pb-1"
                    key={index}
                    onClick={() => {
                      closeMenu();
                    }}
                  >
                    {" "}
                    {t(i.title)}
                  </Link>
                );
              })}
            </AccordionItem>
          </Accordion>
          <Divider orientation="horizontal" />
        </>
      ) : null}
    </>
  );
};

export default NavMenuAccordionItem;
