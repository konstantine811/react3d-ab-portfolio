import { INotion } from "./server-response/notion.model";

export namespace IBlog {
  export interface MenuItems {
    title: string;
    id: string;
    children?: MenuItems[];
    format?: BlogCoverFormat;
    created_time: number;
    last_edited_time: number;
  }

  export interface BlogNestedItems {
    parentId: string;
    children: MenuItems[] | null;
  }

  export interface BlogCoverFormat {
    page_cover: string;
    page_cover_position: number;
    block_color?: string;
    page_icon?: string;
  }

  export interface BlogImageFormat {
    block_aspect_ratio: number;
    block_full_width: boolean;
    block_height: number;
    block_page_width: boolean;
    block_preserve_scale: boolean;
    block_width: number;
    display_source: string;
  }

  export interface BlogEmbedFormat {
    block_full_width: boolean;
    block_height: number;
    block_page_width: boolean;
    block_preserve_scale: boolean;
    block_width: number;
    display_source: string;
  }

  export interface BlogTableFormat {
    table_block_column_order: string[];
  }

  export interface BlogBookmarkFormat {
    bookmark_cover: string;
    bookmark_icon: string;
  }

  export interface BlogArticle {
    type: INotion.TypeContent;
    properties:
      | INotion.ContentPageProperties
      | INotion.ContentImageProperties
      | INotion.ContentCodeProperties
      | INotion.ContentTextProperties
      | INotion.ContentTableProperties
      | INotion.ContentBookmarkProperties;
    format?:
      | BlogCoverFormat
      | BlogImageFormat
      | BlogEmbedFormat
      | BlogTableFormat
      | BlogBookmarkFormat;
    id: string;
    version: number;
  }

  export interface SplitBlogArticle {
    type: INotion.ParentTypeContent;
    children: IBlog.BlogArticle[];
  }

  export interface SplitCheckData {
    splitBlogArticle: SplitBlogArticle[];
    lastTypeBlog: SplitBlogArticle;
    blogItem: BlogArticle;
    typeContent: INotion.ParentTypeContent;
  }
}
