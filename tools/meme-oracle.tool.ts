import { tool } from "ai";
import { z } from "zod";
import { memeOracleService } from "@/core/meme-oracle-service";

export const memeOracleTool = tool({
  description: "Predict the future using classic internet memes",
  parameters: z.object({
    spread: z.enum(["single", "three-meme", "full-timeline"])
      .default("three-meme")
      .describe("type of meme spread to perform"),
    question: z.string().describe("the question or concern to focus on during the reading"),
  }),
  execute: async ({ spread, question }) => {
    try {
      const result = await memeOracleService.readMemes(spread, question);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to perform meme reading");
    }
  },
});