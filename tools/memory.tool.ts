import { tool } from "ai";
import { z } from "zod";
import { memoryService } from "@/core/memory-service";

export const memoryTool = tool({
  description: "Access user memory and context for personalized responses",
  parameters: z.object({
    userId: z.string().default("default").describe("user identifier"),
    action: z.enum(["get_context", "get_recent", "get_progress"]).describe("memory action to perform"),
  }),
  execute: async ({ userId, action }) => {
    try {
      switch (action) {
        case "get_context":
          return memoryService.getUserContext(userId);
        case "get_recent":
          return memoryService.getRecentMemories(userId, 5);
        case "get_progress":
          const sessions = memoryService.getMemoriesByType(userId, 'session');
          return {
            totalSessions: sessions.length,
            recentProgress: sessions.slice(-3),
            trends: "Progress analysis would go here"
          };
        default:
          return { error: "Unknown action" };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to access memory");
    }
  },
});