import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { blurFadeInOut } from "@/lib/animations";
import { IChatMode } from "@/types/input-prompt-types";
import ColorPallets from "./ColorPallets";

export default function InputPrompt({
  mode,
  setMode,
}: {
  mode: IChatMode;
  setMode: Dispatch<SetStateAction<IChatMode>>;
}) {
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const handleGenerateColorPallets = async () => {};
  
  return (
    <>
      <motion.div
        variants={blurFadeInOut}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex justify-center items-center gap-2 max-w-[400px]"
      >
        <Input
          className="w-full bg-white shadow-none rounded-sm"
          placeholder="Type details of your website"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
        />
        <Button variant="hero">GO</Button>
      </motion.div>
      {mode === "generated" && <ColorPallets />}
    </>
  );
}
