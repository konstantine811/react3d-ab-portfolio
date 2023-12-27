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

  export interface ContentTextProperties {
    title: any[];
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
      | ContentTextProperties;
    space_id: string;
    type: TypeContent;
    version: number;
  }
}
