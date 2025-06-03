import { tool } from "ai";
import { z } from "zod";
import { onboardingService } from "@/core/onboarding-service";
import { memoryService } from "@/core/memory-service";

export const onboardingTool = tool({
  description: "Guide user through therapeutic onboarding process",
  parameters: z.object({
    responses: z.record(z.string()).describe("user responses to onboarding questions"),
    userId: z.string().default("default").describe("user identifier"),
    stage: z.enum(["initial", "lifeAssessment", "goals", "complete"]).describe("onboarding stage"),
  }),
  execute: async ({ responses, userId, stage }) => {
    try {
      if (stage === "complete") {
        const onboardingData = await onboardingService.processOnboarding(responses, userId);
        
        // Store in memory
        memoryService.storeMemory(userId, 'onboarding', onboardingData, 'high');
        
        return {
          success: true,
          message: "Onboarding completed successfully",
          data: onboardingData,
          nextSteps: "Ready to begin personalized therapy sessions"
        };
      }
      
      return {
        success: true,
        stage,
        message: "Continue with onboarding process"
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to process onboarding");
    }
  },
});
