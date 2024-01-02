import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// configs
import { NOTION_URL } from "@configs/navigation";
// storage
import { currentLanguage } from "@store/slices/changeLanguageSlice";
import BlogItems from "@components/Blog/BlogItems";
import { LangType } from "@models/lang.model";

const BlogPage = () => {
  const [blogId, setBlogId] = useState<string>(NOTION_URL[LangType.en]);
  const currentLang = useSelector(currentLanguage);
  useEffect(() => {
    setBlogId(NOTION_URL[currentLang]);
  }, [currentLang]);
  return (
    <main className="flex flex-col gap-5 font-fira">
      <BlogItems blogId={blogId} />
    </main>
  );
};

export default BlogPage;
