import { tool } from "ai";
import { z } from "zod";
import { therapyService } from "@/core/therapy-service";
import { memoryService } from "@/core/memory-service";

export const therapyTool = tool({
  description: "Provide personalized therapy session",
  parameters: z.object({
    userInput: z.string().describe("what the user shared in this session"),
    userId: z.string().describe("user identifier"),
    sessionType: z.string().describe("type of therapy session: check-in, crisis, goal-review, or general"),
  }),
  execute: async ({ userInput, userId, sessionType }) => {
    try {
      const userContext = memoryService.getUserContext(userId);
      const lifeState = userContext.onboardingData?.lifeState;
      const approach = userContext.onboardingData?.preferredApproach || 'mixed';
      
      const therapyOutput = await therapyService.provideTherapy(userInput, lifeState, approach);
      
      memoryService.storeMemory(userId, 'session', {
        input: userInput,
        output: therapyOutput,
        type: sessionType || 'general'
      }, 'medium');
      
      if (therapyOutput.insights && therapyOutput.insights.length > 0) {
        memoryService.storeMemory(userId, 'insight', therapyOutput.insights, 'high');
      }
      
      return therapyOutput;
    } catch (error) {
      console.error(error);
      return { error: "Failed to provide therapy session" };
    }
  },
});
