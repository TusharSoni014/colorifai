import { IGeneratedColors } from "@/types/types";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

export default function ColorPallets({
  generatedColors,
}: {
  generatedColors: IGeneratedColors | null;
}) {
  return (
    <motion.div className="w-full max-w-[700px] flex justify-center items-center gap-3.5">
      <AnimatePresence mode="wait">
        {Object.keys(generatedColors || {}).map((key, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
              transition={{ delay: index * 0.2 }}
              key={`${key}-${JSON.stringify(generatedColors)}`}
              style={{
                backgroundColor:
                  generatedColors?.[key as keyof IGeneratedColors],
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  generatedColors?.[key as keyof IGeneratedColors] || ""
                );
                toast.success("Color copied to clipboard!");
              }}
              className="w-full h-full min-h-[150px] rounded-lg transition-transform shadow-lg group flex justify-center items-center cursor-pointer hover:scale-110 relative"
            >
              <p className="text-white mix-blend-difference opacity-0 transition-all group-hover:opacity-100">
                {generatedColors?.[key as keyof IGeneratedColors]}
              </p>
              <p className="absolute w-full font-semibold -bottom-[30px] left-1/2 text-xs text-center -translate-x-1/2">
                {key}
              </p>
            </motion.div>
          );
        })}
        <motion.div></motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
