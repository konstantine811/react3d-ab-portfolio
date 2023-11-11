import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// store
import { ThemeType } from "@models/theme.model";
import { onChangeHeaderHeight } from "@store/slices/changeComponentSize";
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
  Switch,
} from "@nextui-org/react";
import { Box, Moon, Sun } from "lucide-react";
// components
import NavBarNestedItem from "@components/Header/NavBarNestedItem";
import NavMenuAccordionItem from "@components/Header/NavMenuAccordionItem";
import { ROUTE_PATH_CONFIG } from "../../App";
import SelectLangButton from "@components/Header/SelectLangButton";

// configs

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  const [t] = useTranslation("global");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const headerHeight = refHeader.current?.getBoundingClientRect().height;
    dispatch(onChangeHeaderHeight(headerHeight ? headerHeight : 0));
  }, [refHeader, dispatch]);

  return (
    <>
      <Navbar ref={refHeader} maxWidth="2xl" onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden order-2"
        />
        <NavbarContent>
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
                    {t(i.title)}
                  </Link>
                </NavbarItem>
              );
            }
          })}
        </NavbarContent>
        <NavbarContent justify="end" className="order-1">
          <NavbarItem>
            <Switch
              size="md"
              color="primary"
              isSelected={ThemeType.dark === theme}
              startContent={<Sun />}
              endContent={<Moon />}
              onValueChange={(status) => {
                const themeType = status ? ThemeType.dark : ThemeType.light;
                setTheme(themeType);
              }}
            ></Switch>
          </NavbarItem>
          <NavbarItem>
            <SelectLangButton />
          </NavbarItem>
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
                    {t(i.title)}
                  </Link>
                  <Divider orientation="horizontal" />
                </NavbarMenuItem>
              );
            }
          })}
        </NavbarMenu>
      </Navbar>
      <Divider />
    </>
  );
};

export default Header;
