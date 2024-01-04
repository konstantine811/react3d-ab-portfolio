import axios from "axios";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
// config
import { NOTION_URL } from "@configs/navigation";
// models
import { INotion } from "@models/server-response/notion.model";
import { IBlog } from "@models/blog.model";

export enum BlogPostCacheNames {
  blogItems = "blogItems",
  blogNestedItems = "blogNestedItems",
  blogArticle = "blogArticle",
}

export async function fetchBlogItems<T>(id: string): Promise<T> {
  const { data } = await axios(`${NOTION_URL.baseUrl}/${id}`);
  return data as T;
}

export const QueryBlogItems = (blogId: string) => {
  const { data, error } = useQuery({
    queryKey: [BlogPostCacheNames.blogItems, blogId],
    queryFn: () => fetchBlogItems<INotion.ContentEntity>(blogId),
    select: (data) => handleNotionBlogItems(data, [blogId]),
  });
  if (!data && error) {
    console.error(error);
  }
  // Then get the blog nested itesm
  const blogNestedItems = useQueries({
    queries: data
      ? data.map((blogItem) => {
          return {
            queryKey: [BlogPostCacheNames.blogNestedItems, blogItem.id],
            queryFn: () => fetchBlogItems<INotion.ContentEntity>(blogItem.id),
            select: (data: INotion.ContentEntity) => {
              return {
                parentId: blogItem.id,
                children: handleNotionBlogItems(data, [blogId, blogItem.id]),
              } as IBlog.BlogNestedItems;
            },
          };
        })
      : [], // if blog items is undefined, an empty array will be returned
  });
  return handleBlogNestedItems(blogNestedItems, data);
};

export const QueryBlogArcticle = (id: string) => {
  const { data } = useQuery({
    queryKey: [BlogPostCacheNames.blogArticle, id],
    queryFn: () => fetchBlogItems<INotion.ContentEntity>(id),
    select: (data) => handleNotionBlogArticle(data, id),
  });
  return data;
};

function handleBlogNestedItems(
  blogNestedItems: UseQueryResult<IBlog.BlogNestedItems, Error>[],
  data: IBlog.MenuItems[] | null | undefined
): IBlog.MenuItems[] {
  return blogNestedItems
    .map((i) => {
      const blogNestedData = i.data;
      if (blogNestedData && data) {
        const parentData = data.find((iD) => iD.id === blogNestedData.parentId);
        if (!parentData) {
          return null;
        }
        return {
          title: parentData.title,
          id: parentData.id,
          format: parentData.format,
          created_time: parentData.created_time,
          last_edited_time: parentData.last_edited_time,
          children: blogNestedData.children,
        };
      }
      return null;
    })
    .filter((i) => i) as IBlog.MenuItems[];
}

export function removeStringDefise(str: string) {
  return str.split("-").join("");
}

export function handleNotionBlogItems(
  data: INotion.ContentEntity | undefined,
  ids: string[]
): IBlog.MenuItems[] | null {
  const removedDefiseIds = ids.map((i) => removeStringDefise(i));
  if (!data) return null;
  return Object.entries(data)
    .map(([key, val]) => {
      if (!removedDefiseIds.includes(removeStringDefise(key))) {
        const { properties, id, format, created_time, last_edited_time } =
          val.value;
        if (!properties) {
          return null;
        }
        return {
          title: (properties.title as string[]).join(" "),
          id: id,
          format: format,
          created_time: created_time,
          last_edited_time: last_edited_time,
        };
      }
      return null;
    })
    .filter((i) => i) as IBlog.MenuItems[];
}

export function handleNotionBlogArticle(
  data: INotion.ContentEntity | undefined,
  idTitle: string
): IBlog.BlogArticle[] | null {
  if (!data) return null;
  return Object.entries(data)
    .map(([key, val]) => {
      const { type, properties, id, format } = val.value;
      const pageType = INotion.TypeContent.page;
      if (type !== pageType || (type === pageType && idTitle === key)) {
        return {
          properties: properties,
          type: type,
          format: format,
          id: id,
        };
      }
      return null;
    })
    .filter((i) => i) as IBlog.BlogArticle[];
}
