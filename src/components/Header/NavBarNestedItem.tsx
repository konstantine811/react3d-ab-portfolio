import { cn } from "@lib/merge-classes-utils";
import { IRouterConfiguration } from "@models/navigation.model";
import {
  Link,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Box } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

export interface NavBarNestedItemProps {
  pathname: string;
  routerConfig: IRouterConfiguration;
}

const NavBarNestedItem: FC<NavBarNestedItemProps> = ({
  pathname,
  routerConfig,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [t] = useTranslation("global");
  return (
    <>
      {routerConfig.children?.length ? (
        <NavbarItem
          isActive={pathname === routerConfig.path}
          onMouseEnter={() => {
            setIsShowing((m) => true);
          }}
          onMouseLeave={() => {
            setIsShowing(false);
          }}
        >
          <Popover isOpen={isShowing} showArrow placement="bottom">
            <PopoverTrigger>
              <span
                className={
                  routerConfig.children
                    .map((i) => i.path as string)
                    .includes(pathname)
                    ? "text-primary"
                    : "text-foreground"
                }
              >
                {t(routerConfig.title)}
              </span>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              {routerConfig.children.map((iCh, indexCh) => {
                return (
                  <Link
                    key={indexCh}
                    className={cn("flex gap-3 px-3 py-2")}
                    href={iCh.path}
                    color={pathname === iCh.path ? "primary" : "foreground"}
                    isDisabled={pathname === iCh.path}
                  >
                    {" "}
                    <Box
                      className={
                        pathname === iCh.path ? "primary" : "text-success"
                      }
                      key={indexCh}
                    />
                    {t(iCh.title)}
                  </Link>
                );
              })}
            </PopoverContent>
          </Popover>
        </NavbarItem>
      ) : null}
    </>
  );
};

export default NavBarNestedItem;
