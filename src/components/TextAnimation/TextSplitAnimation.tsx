import { ElementType, FC, useEffect } from "react";
import gsap from "gsap";
// components
import TextWrapper from "@components/TextWrapper/TextWrapper";

export interface ITextSplitAnimationProps {
  as?: ElementType;
  className?: string;
  children: string;
  isWordSplit?: boolean;
  uniqKey?: string;
}

const TextSplitAnimation: FC<ITextSplitAnimationProps> = ({
  as,
  children,
  className,
  isWordSplit,
  uniqKey = "_",
}) => {
  const classAnim = `txt-anim_${as}_${uniqKey}`;
  const wordSplit = children.split(" ");
  function fadeText() {
    gsap.fromTo(
      `.${classAnim}`,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: isWordSplit ? 0.2 : wordSplit.length / 4444,
        duration: 2,
        overwrite: true,
        ease: "ease",
      }
    );
  }

  useEffect(() => {
    fadeText();
  });
  return (
    <>
      <TextWrapper as={as} className={className}>
        {wordSplit.map((word, wordIndex) => {
          return (
            <span
              aria-hidden="false"
              className={`${classAnim} opacity-0 inline-block whitespace-nowrap mr-[0.25em]`}
              key={wordIndex}
            >
              {isWordSplit
                ? word
                : word.split("").map((letter, letterIndex) => {
                    return (
                      <span
                        aria-hidden="true"
                        key={letterIndex}
                        className={`${classAnim} inline-block`}
                      >
                        {letter}
                      </span>
                    );
                  })}
            </span>
          );
        })}
      </TextWrapper>
    </>
  );
};

export default TextSplitAnimation;
