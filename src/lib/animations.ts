export const blurFadeInOut = {
  initial: { opacity: 0, filter: "blur(5px)", scale: 0.9 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    scale: 1.1,
    transition: { delay: 0 },
  },
};
