import { NavNamesPaths } from "@configs/navigation";
// models
import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";

export function getBlogPath(id: string) {
  return `${NavNamesPaths.blog}/${id}`;
}

function splitCheckPushData({
  blogItem,
  lastTypeBlog,
  splitBlogArticle,
  typeContent,
}: IBlog.SplitCheckData) {
  if (lastTypeBlog && lastTypeBlog.type === typeContent) {
    lastTypeBlog.children.push(blogItem);
  } else if (!lastTypeBlog || lastTypeBlog.type !== typeContent) {
    splitBlogArticle.push({
      type: typeContent,
      children: [blogItem],
    });
  }
}

export function splitBlogByConfig(
  splitBlogArticle: IBlog.SplitBlogArticle[],
  blogItem: IBlog.BlogArticle
) {
  const lastTypeBlog = splitBlogArticle[splitBlogArticle.length - 1];
  const splitBlogCheckData: IBlog.SplitCheckData = {
    splitBlogArticle,
    lastTypeBlog,
    blogItem,
    typeContent: INotion.ParentTypeContent.other,
  };
  switch (blogItem.type) {
    case INotion.TypeContent.numbered_list:
      splitBlogCheckData.typeContent = INotion.ParentTypeContent.numbered_list;
      splitCheckPushData(splitBlogCheckData);
      break;
    case INotion.TypeContent.table:
    case INotion.TypeContent.table_row:
      splitBlogCheckData.typeContent = INotion.ParentTypeContent.table;
      splitCheckPushData(splitBlogCheckData);
      break;
    default:
      splitCheckPushData(splitBlogCheckData);
      break;
  }
  return splitBlogArticle;
}
