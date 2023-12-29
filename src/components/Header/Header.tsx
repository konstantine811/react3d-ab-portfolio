import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { useLocation, matchPath } from "react-router-dom";
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
// configs
import { ROUTE_PATH_CONFIG } from "../../App";
// components
import NavBarNestedItem from "@components/Header/NavBarNestedItem";
import NavMenuAccordionItem from "@components/Header/NavMenuAccordionItem";
import SelectLangButton from "@components/Header/SelectLangButton";
// models
import { IRouterConfiguration } from "@models/navigation.model";

// configs

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  const [t] = useTranslation("global");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  function isMatch(i: IRouterConfiguration): boolean {
    if (i.byId) {
      const ism = matchPath({ path: `${i.path}/${i.byId.param}` }, pathname);
      if (ism) {
        return `${i.path}/${ism.params.id}` === pathname;
      }
      return i.path === pathname;
    } else {
      return i.path === pathname;
    }
  }

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
          <NavbarBrand>
            <Link
              color="foreground"
              className="flex gap-2 "
              href={ROUTE_PATH_CONFIG[0].path}
            >
              <Box />
              <p className="font-bold text-inherit uppercase">
                CA <span className="text-sm sm:inline hidden">Portfolio</span>
              </p>
            </Link>
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
                <NavbarItem isActive={isMatch(i)} key={index}>
                  <Link
                    color={isMatch(i) ? "primary" : "foreground"}
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
          {/* <NavbarItem>
            <Tooltip content="Sing up">
              <Button variant="faded" color="primary" isIconOnly>
                <LogInIcon />
              </Button>
            </Tooltip>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarMenu className="z-[100000]">
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
                    className="w-full px-2 py-3"
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
    </>
  );
};

export default Header;
