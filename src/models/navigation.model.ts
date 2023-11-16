import { NavNamesPaths } from "@configs/navigation";

export interface IPopoverHoverProps {
  [key: string]: boolean;
}

export interface IRouterConfiguration {
  title: string;
  path?: NavNamesPaths;
  element?: JSX.Element;
  children?: IRouterConfiguration[];
  icon?: JSX.Element;
}
