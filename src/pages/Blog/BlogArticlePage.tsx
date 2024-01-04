import { headerHeightState } from "@store/slices/changeComponentSize";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RefObject, memo, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// lib components
import { Button, Image } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// server request helpers
import { QueryBlogArcticle, QueryBlogItems } from "@helpers/server-request";
// model
import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";
import { LangType } from "@models/lang.model";
// components
import NotionHeadTitle from "@components/NotionParse/NotionHeadTitle";
import NotionCode from "@components/NotionParse/NotionCode";
import NotionText from "@components/NotionParse/NotionText";
import NotionImage from "@components/NotionParse/NotionImage";
import Loader from "@components/Loader/Loader";
import AsideBar from "@components/AsideBar/AsideBar";
// helpers
import { getBlogPath } from "@helpers/blog";
// storage
import { currentLanguage } from "@store/slices/changeLanguageSlice";
// config
import { NOTION_URL } from "@configs/navigation";
import NotionEmbed from "@components/NotionParse/NotionEmbed";

function getPrevNextId(
  blogConfigItems: IBlog.MenuItems[],
  id: string | undefined
) {
  let prevId = null;
  let nextId = null;
  if (id) {
    blogConfigItems.forEach((i) => {
      if (i.children && i.children.length) {
        const findedIndex = i.children.findIndex((iC) => iC.id === id);
        if (findedIndex !== -1) {
          const nextItem = i.children[findedIndex + 1];
          const prevItem = i.children[findedIndex - 1];
          if (nextItem) {
            nextId = nextItem.id;
          }
          if (prevItem) {
            prevId = prevItem.id;
          }
        }
      }
    });
  }

  return { prevId, nextId };
}

function getCurrentLangId(
  blogConfigItems: IBlog.MenuItems[],
  id: string | undefined,
  currentPageCoverUrl: string | null
) {
  let isCurrent = false;
  let findedIdByCover = null;
  if (id) {
    blogConfigItems.forEach((i) => {
      if (i.children && i.children.length) {
        const findeded = i.children.find((iC) => iC.id === id);
        const findededByCoverUrl = i.children.find(
          (iC) => iC.format?.page_cover === currentPageCoverUrl
        );
        if (findeded) {
          isCurrent = !!findeded;
        }
        if (findededByCoverUrl) {
          findedIdByCover = findededByCoverUrl.id;
        }
      }
    });
  }

  return { isCurrent, findedIdByCover };
}

const BlogArticlePage = memo(() => {
  const refArticle = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refArticle as RefObject<HTMLElement>,
    offset: ["end end", "start start"],
  });

  const distance = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [blogId, setBlogId] = useState<string>(NOTION_URL[LangType.en]);
  let blogConfigItems = QueryBlogItems(blogId);
  const [prevId, setPrevId] = useState<string | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);
  const currentLang = useSelector(currentLanguage);
  const headerHeight = useSelector(headerHeightState);
  const { id } = useParams();
  const navigate = useNavigate();
  let blogArticle: IBlog.BlogArticle[] = [];
  let currentPageCoverUrl: string | null = null;
  const [t] = useTranslation("global");

  // find prev and next index
  useEffect(() => {
    const { prevId, nextId } = getPrevNextId(blogConfigItems, id);
    setPrevId(prevId);
    setNextId(nextId);
  }, [blogConfigItems, id, setPrevId, setNextId]);

  useEffect(() => {
    const { isCurrent, findedIdByCover } = getCurrentLangId(
      blogConfigItems,
      id,
      currentPageCoverUrl
    );
    if (!isCurrent && findedIdByCover) {
      navigate(getBlogPath(findedIdByCover));
    }
  }, [blogConfigItems, id, currentPageCoverUrl, navigate]);

  useEffect(() => {
    setBlogId(NOTION_URL[currentLang]);
  }, [currentLang]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // query current blog article
  if (id) {
    const resBlogArticle = QueryBlogArcticle(id);
    if (resBlogArticle) {
      blogArticle = resBlogArticle;
      blogArticle.forEach((i) => {
        if (i.type === INotion.TypeContent.page && i.format) {
          const data = i.format as IBlog.BlogCoverFormat;
          currentPageCoverUrl = data.page_cover;
        }
      });
    }
  }
  return (
    <>
      <motion.div
        className="w-full fixed top-[60px] z-[50] h-1 rounded-lg bg-gradient-to-r from-indigo-500 to-foreground/25 origin-left"
        style={{ scaleX: distance, top: `${headerHeight}px` }}
      />

      <AsideBar blogConfigItems={blogConfigItems} blogId={blogId} id={id} />
      <main className="flex flex-col gap-5 mb-10 progress-bar" ref={refArticle}>
        {blogArticle &&
        blogArticle.length &&
        blogArticle[0].format &&
        (blogArticle[0].format as IBlog.BlogCoverFormat).page_cover ? (
          <>
            <Image
              removeWrapper
              alt={blogArticle[0].properties.title[0]}
              className="z-0 w-full h-[350px] object-cover"
              src={(blogArticle[0].format as IBlog.BlogCoverFormat).page_cover}
            />
          </>
        ) : null}
        <div className="container max-w-screen-lg">
          <div style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
            {blogArticle && blogArticle.length ? (
              blogArticle.map((item) => {
                switch (item.type) {
                  case INotion.TypeContent.page:
                    return (
                      <NotionHeadTitle
                        key={item.id}
                        data={item.properties as INotion.ContentPageProperties}
                        format={item.format as IBlog.BlogCoverFormat}
                        id={item.id}
                      />
                    );
                  case INotion.TypeContent.code:
                    return (
                      <div key={item.id} className="mb-4">
                        <NotionCode
                          data={
                            item.properties as INotion.ContentCodeProperties
                          }
                        />
                      </div>
                    );
                  case INotion.TypeContent.text:
                  case INotion.TypeContent.header:
                  case INotion.TypeContent.sub_header:
                  case INotion.TypeContent.sub_sub_header:
                  case INotion.TypeContent.quote:
                  case INotion.TypeContent.bulleted_list:
                    return (
                      <div key={item.id}>
                        {item.properties ? (
                          <NotionText
                            data={
                              item.properties as INotion.ContentTextProperties
                            }
                            type={item.type}
                          />
                        ) : null}
                      </div>
                    );
                  case INotion.TypeContent.image:
                    return (
                      <div className="my-2" key={item.id}>
                        <NotionImage
                          data={
                            item.properties as INotion.ContentImageProperties
                          }
                          format={item.format as IBlog.BlogImageFormat}
                        />
                      </div>
                    );
                  case INotion.TypeContent.embed:
                    return (
                      <div className="my-2" key={item.id}>
                        <NotionEmbed
                          format={item.format as IBlog.BlogEmbedFormat}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <Loader />
            )}
          </div>
          <div className="flex w-full mt-10">
            {prevId ? (
              <Button
                color="primary"
                variant="flat"
                aria-label={t("blog.next_article")}
                onClick={() => {
                  navigate(getBlogPath(prevId));
                }}
                startContent={<ChevronLeft />}
              >
                {t("blog.prev_article")}
              </Button>
            ) : null}
            {nextId ? (
              <Button
                className="ml-auto"
                color="primary"
                variant="flat"
                onClick={() => {
                  navigate(getBlogPath(nextId));
                }}
                aria-label={t("blog.next_article")}
                endContent={<ChevronRight />}
              >
                {t("blog.next_article")}
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
});

export default BlogArticlePage;
