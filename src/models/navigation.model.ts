import { NavNamesPaths } from "@configs/navigation";

export interface IPopoverHoverProps {
  [key: string]: boolean;
}

export interface IRouterConfiguration {
  title: string;
  path?: NavNamesPaths | string;
  element?: JSX.Element;
  children?: IRouterConfiguration[];
  icon?: JSX.Element;
  byId?: IRouterConfigurationById;
}

export interface IRouterConfigurationById {
  param: string;
  element: JSX.Element;
}
