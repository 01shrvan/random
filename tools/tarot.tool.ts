import { tool } from "ai";
import { z } from "zod";
import { tarotService } from "@/core/tarot-service";

export const tarotTool = tool({
  description: "Draw tarot cards for fortune telling",
  parameters: z.object({
    spread: z.enum(["single", "three-card", "celtic-cross"])
      .default("three-card")
      .describe("type of tarot spread to perform"),
    question: z.string().describe("the question or concern to focus on during the reading"),
  }),
  execute: async ({ spread, question }) => {
    try {
      const result = await tarotService.drawCards(spread, question);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to perform tarot reading");
    }
  },
});