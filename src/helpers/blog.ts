import { NavNamesPaths } from "@configs/navigation";

export function getBlogPath(id: string) {
  return `${NavNamesPaths.blog}/${id}`;
}
