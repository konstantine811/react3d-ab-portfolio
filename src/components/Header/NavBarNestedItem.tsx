import { cn } from "@lib/merge-classes-utils";
import {
  Link,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
// models
import { IRouterConfiguration } from "@models/navigation.model";

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
          onTouchStart={() => {
            setIsShowing((m) => true);
          }}
          onTouchEnd={() => {
            setIsShowing(false);
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
                    className={cn("w-full flex gap-3 px-3 py-2 justify-start")}
                    href={iCh.path}
                    color={pathname === iCh.path ? "primary" : "foreground"}
                    isDisabled={pathname === iCh.path}
                  >
                    {iCh.icon ? (
                      <span
                        className={
                          pathname === iCh.path ? "primary" : "text-success"
                        }
                        key={indexCh}
                      >
                        {iCh.icon}
                      </span>
                    ) : null}

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
