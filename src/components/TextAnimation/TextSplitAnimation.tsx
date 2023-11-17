import {
  ElementType,
  FC,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
// components
import TextWrapper from "@components/TextWrapper/TextWrapper";

let uniqKey = 0;

export interface ITextSplitAnimationProps {
  as?: ElementType;
  className?: string;
  children: string;
  isWordSplit?: boolean;
  delay?: number;
  duration?: number;
  wordStaggerTime?: number;
  letterStaggerTime?: number;
  id?: string;
}

const TextSplitAnimation: FC<ITextSplitAnimationProps> = memo(
  ({
    as,
    children,
    className,
    isWordSplit,
    delay = 0,
    duration = 1.3,
    letterStaggerTime = 0.03,
    wordStaggerTime = 0.2,
    id,
  }) => {
    // state
    const [reversed] = useState(false);
    const textWrapRef = useRef<any>();
    const classAnim = `txt-anim_${as}_${uniqKey++}`;

    const wordSplit = children.split(" ");
    // store the timeline in a ref.
    const tl = useRef<gsap.core.Timeline>(null);

    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        const className = `.${classAnim}`;
        (tl as any).current = gsap.timeline({ delay }).fromTo(
          className,
          {
            opacity: 0,
            filter: "blur(3.33px)",
            y: 3.33,
            x: -3.33,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            stagger: isWordSplit ? wordStaggerTime : letterStaggerTime,
            ease: "ease",
            duration,
          },
          textWrapRef.current
        );
      });
      return () => ctx.revert();
    });

    useEffect(() => {
      (tl as any).current.reversed(reversed);
    }, [reversed]);
    return (
      <>
        <TextWrapper id={id} ref={textWrapRef} as={as} className={className}>
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
  }
);

export default TextSplitAnimation;
