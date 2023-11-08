import { useState } from "react";
import { FC } from "react";
import { useLocation } from "react-router-dom";
// lib components
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
} from "@nextui-org/react";
import { Box } from "lucide-react";
// components
import NavBarNestedItem from "./NavBarNestedItem";
import NavMenuAccordionItem from "./NavMenuAccordionItem";
import { ROUTE_PATH_CONFIG } from "../../App";
// configs

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden order-1"
        />
        <NavbarBrand className="gap-2">
          <Box />
          <p className="font-bold text-inherit uppercase">
            CA <span className="text-sm">Portfolio</span>
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {ROUTE_PATH_CONFIG.map((i, index) => {
          if (i.children?.length) {
            return (
              <NavBarNestedItem
                key={index}
                pathname={pathname}
                routerConfig={i}
              />
            );
          } else {
            return (
              <NavbarItem isActive={pathname === i.path} key={index}>
                <Link
                  color={pathname === i.path ? "primary" : "foreground"}
                  href={i.path}
                >
                  {i.title}
                </Link>
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>
      <NavbarMenu>
        {ROUTE_PATH_CONFIG.map((i, index) => {
          if (i.children?.length) {
            return (
              <NavMenuAccordionItem
                key={index}
                pathname={pathname}
                routerConfig={i}
              />
            );
          } else {
            return (
              <NavbarMenuItem key={index}>
                <Link
                  color={pathname === i.path ? "primary" : "foreground"}
                  href={i.path}
                  className="w-full p-2"
                >
                  {i.title}
                </Link>
                <Divider orientation="horizontal" />
              </NavbarMenuItem>
            );
          }
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
