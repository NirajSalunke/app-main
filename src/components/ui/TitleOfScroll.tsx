import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { MorphingText } from "@/components/magicui/morphing-text";

const texts = [
  "Boilerplate? You mean boiler-boring.",
  "MERN? MEVN? MEAN? Yeah, we do all",
  "Focus on bugs. We'll handle the stack setup.",
  "Start your stack in seconds. Brag for hours.",
  "React, Vue, Angular... Choose your chaos.",
  "Skip the 300-tab tutorial setup spiral.",
  "Vault Base: Only command needed Start",
];

export function TitleOfScroll() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-1px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {isInView && <MorphingText texts={texts} />}
    </motion.div>
  );
}
