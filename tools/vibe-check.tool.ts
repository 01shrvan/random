import { tool } from "ai";
import { z } from "zod";
import { vibeCheckService } from "@/core/vibe-check-service";

export const vibeCheckTool = tool({
  description: "Check someone's vibe based on internet culture analysis",
  parameters: z.object({
    name: z.string().optional().describe("name of the person to analyze"),
    trait: z.string().describe("a personality trait or preference to analyze"),
    intensity: z.enum(["mild", "moderate", "intense"])
      .default("moderate")
      .describe("how intense the reading should be"),
  }),
  execute: async ({ name, trait, intensity }) => {
    try {
      const result = await vibeCheckService.checkVibe(name, trait, intensity);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to check vibe");
    }
  },
});