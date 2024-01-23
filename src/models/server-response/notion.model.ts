import { IBlog } from "@models/blog.model";

export namespace INotion {
  export interface ContentEntity {
    [key: string]: Content;
  }

  export interface Content {
    role: string;
    value: ContentValue;
  }

  export enum TypeContent {
    page = "page",
    code = "code",
    text = "text",
    image = "image",
    sub_sub_header = "sub_sub_header",
    sub_header = "sub_header",
    header = "header",
    quote = "quote",
    bulleted_list = "bulleted_list",
    numbered_list = "numbered_list",
    embed = "embed",
    video = "video",
    divider = "divider",
    table = "table",
    table_row = "table_row",
    bookmark = "bookmark",
  }

  export enum ParentTypeContent {
    other = "other",
    numbered_list = "numbered_list",
    table = "table",
  }

  export interface ContentPageProperties {
    title: string[];
  }

  export interface ContentImageProperties {
    title: string[];
    source: string[];
    size: string[];
    caption?: string[];
  }

  export interface ContentCodeProperties {
    title: string[];
    language: string[];
  }

  export interface ContentEmbedProperties {
    source: string[];
    title: string[];
  }

  export interface ContentTextProperties {
    title: any[];
  }

  export interface ContentTableProperties {
    [key: string]: any[];
  }

  export interface ContentBookmarkProperties {
    description: string[];
    link: string[];
    title: string[];
  }

  export interface ContentValue {
    alive: boolean;
    content: string[];
    created_by_id: string;
    created_by_table: string;
    created_time: number;
    id: string;
    last_edited_by_id: string;
    last_edited_by_table: string;
    last_edited_time: number;
    parent_id: string;
    parent_table: string;
    format?: IBlog.BlogCoverFormat | IBlog.BlogImageFormat;
    properties:
      | ContentPageProperties
      | ContentImageProperties
      | ContentCodeProperties
      | ContentTextProperties
      | ContentEmbedProperties
      | ContentBookmarkProperties;
    space_id: string;
    type: TypeContent;
    version: number;
  }
}
