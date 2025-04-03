import { tool } from "ai";
import { z } from "zod";
import { secretsService } from "@/core/secrets-service";

export const darkSecretsTool = tool({
  description: "Reveal 'dark secrets' based on personality analysis",
  parameters: z.object({
    name: z.string().optional().describe("name of the person to analyze"),
    trait: z.string().describe("a personality trait or preference to analyze"),
    intensity: z.enum(["mild", "moderate", "intense"])
      .default("moderate")
      .describe("how intense the revelation should be"),
  }),
  execute: async ({ name, trait, intensity }) => {
    try {
      const result = await secretsService.revealSecrets(name, trait, intensity);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to reveal secrets");
    }
  },
});