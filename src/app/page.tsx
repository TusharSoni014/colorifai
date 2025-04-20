"use client";

import InputPrompt from "@/components/InputPrompt";
import { Button } from "@/components/ui/button";
import { blurFadeInOut } from "@/lib/animations";
import { IChatMode } from "@/types/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<IChatMode>("start");
  return (
    <div className="w-full h-dvh overflow-y-scroll flex  flex-col p-3">
      <div className="h-1/2 w-full justify-end items-center flex flex-col gap-3.5 pb-3.5">
        <motion.h1
          variants={blurFadeInOut}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="text-6xl font-bold"
        >
          Colorif<span className="text-red-600">ai</span>
        </motion.h1>
        <motion.p
          variants={blurFadeInOut}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl text-gray-600 text-center"
        >
          Intelligent color palettes, designed by AI,{" "}
          <span className="text-red-600">inspired by you</span>
        </motion.p>
      </div>

      <div className="h-[50%] w-full items-center flex flex-col gap-3.5">
        <AnimatePresence mode="wait">
          {mode === "start" ? (
            <motion.div
              variants={blurFadeInOut}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setMode("generate")}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button variant="hero" size="hero">
                Start Using !
              </Button>
            </motion.div>
          ) : (
            <InputPrompt mode={mode} setMode={setMode} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
