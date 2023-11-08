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

export interface NavBarNestedItemProps {
  pathname: string;
  routerConfig: IRouterConfiguration;
}

const NavBarNestedItem: FC<NavBarNestedItemProps> = ({
  pathname,
  routerConfig,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      {routerConfig.children?.length ? (
        <NavbarItem
          isActive={pathname === routerConfig.path}
          onMouseEnter={() => {
            setIsShowing((m) => true);
          }}
        >
          <Popover
            onMouseLeave={() => {
              setIsShowing(false);
            }}
            isOpen={isShowing}
            showArrow
            placement="bottom"
          >
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
                {routerConfig.title}
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
                    <Box key={indexCh} />
                    {iCh.title}
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
