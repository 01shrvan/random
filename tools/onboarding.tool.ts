import { tool } from "ai";
import { z } from "zod";
import { onboardingService } from "@/core/onboarding-service";
import { memoryService } from "@/core/memory-service";

export const onboardingTool = tool({
  description: "Guide user through therapeutic onboarding process",
  parameters: z.object({
    name: z.string().optional().describe("user's name"),
    emotion: z.string().optional().describe("user's current emotional state"),
    challenges: z.string().optional().describe("current challenges user is facing"),
    stress: z.string().optional().describe("stress level 1-10"),
    support: z.string().optional().describe("support system description"),
    priorities: z.string().optional().describe("life priorities"),
    goals: z.string().optional().describe("therapeutic goals"),
    userId: z.string().describe("user identifier"),
    stage: z.string().describe("onboarding stage: initial, lifeAssessment, goals, or complete"),
  }),
  execute: async ({ name, emotion, challenges, stress, support, priorities, goals, userId, stage }) => {
    try {
      if (stage === "complete") {
        const responses = {
          name: name || '',
          emotion: emotion || '',
          challenges: challenges || '',
          stress: stress || '5',
          support: support || '',
          priorities: priorities || '',
          goals: goals || '',
          therapeuticGoals: goals || ''
        };
        
        const onboardingData = await onboardingService.processOnboarding(responses, userId);
        
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
      return { error: "Failed to process onboarding" };
    }
  },
});