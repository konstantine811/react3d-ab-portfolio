import { IRouterConfiguration } from "@models/navigation.model";
import { Accordion, AccordionItem, Divider, Link } from "@nextui-org/react";
import { Box } from "lucide-react";
import { FC } from "react";

export interface NavMenuAccordionItemProps {
  pathname: string;
  routerConfig: IRouterConfiguration;
}

const NavMenuAccordionItem: FC<NavMenuAccordionItemProps> = ({
  pathname,
  routerConfig,
}) => {
  return (
    <>
      {routerConfig.children?.length ? (
        <>
          <Accordion isCompact>
            <AccordionItem
              aria-label={routerConfig.title}
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
                  {routerConfig.title}
                </h3>
              }
              startContent={<Box className="text-primary" />}
            >
              {routerConfig.children.map((i, index) => {
                return (
                  <Link
                    color={pathname === i.path ? "primary" : "foreground"}
                    isDisabled={pathname === i.path}
                    href={i.path}
                    className="w-full"
                    key={index}
                  >
                    {" "}
                    {i.title}
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
