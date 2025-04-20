import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { blurFadeInOut } from "@/lib/animations";
import { IChatMode, IGeneratedColors } from "@/types/types";
import ColorPallets from "./ColorPallets";
import { toast } from "sonner";

export default function InputPrompt({
  mode,
  setMode,
}: {
  mode: IChatMode;
  setMode: Dispatch<SetStateAction<IChatMode>>;
}) {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [genLoading, setGenLoading] = useState<boolean>(false);
  const [generatedColors, setGeneratedColors] =
    useState<IGeneratedColors | null>(null);

  const handleGenerateColorPallets = async () => {
    if (inputPrompt.trim().length < 10) {
      toast.warning("Please enter a prompt with at least 10 characters!");
    }
    try {
      setGenLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ inputPrompt }),
      });

      const responseJson = await response.json();
      if (responseJson.error) {
        toast.error("Error generating color pallets");
        setGenLoading(false);
        return;
      }
      const colors = Object.fromEntries(
        responseJson.colors.split(",").map((item: string) => item.split(":"))
      );
      setGeneratedColors(colors as IGeneratedColors);
      setMode("generated");
    } catch (error) {
      console.log("Error details: ", error);
      toast.error("Error generating color pallets");
    } finally {
      setGenLoading(false);
    }
  };

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
        <Button
          onClick={handleGenerateColorPallets}
          loading={genLoading}
          variant="hero"
        >
          GO
        </Button>
      </motion.div>
      {mode === "generated" && (
        <ColorPallets generatedColors={generatedColors} />
      )}
    </>
  );
}
