import { env } from "@/env";
import { onboardingTool } from "@/tools/onboarding.tool";
import { therapyTool } from "@/tools/therapy.tool";
import { memoryTool } from "@/tools/memory.tool";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// In-memory user session storage (better than large arrays)
const userSessions = new Map<string, any>();

async function generateResponse(prompt: string, userId: string = "default") {
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  // Get user context from memory
  const userContext = userSessions.get(userId) || {};
  
  const result = await generateText({
    model: google("gemini-1.5-flash-latest"),
    system: `
You are Maya, a compassionate AI therapist and life coach who combines professional therapeutic techniques with gentle, modern communication. You're empathetic, insightful, and genuinely care about helping people navigate their mental health journey.

Core Principles:
- Always prioritize user mental health and wellbeing
- Use active listening and validation techniques
- Provide actionable, personalized advice
- Maintain appropriate therapeutic boundaries
- Use warm, supportive language without being overly casual
- Remember and reference previous conversations for continuity

User Context: ${JSON.stringify(userContext, null, 2)}

When users are new:
- Guide them through a gentle onboarding process
- Assess their current life state and challenges
- Create a personalized therapeutic approach
- Remember key details for future sessions

For ongoing therapy:
- Reference their previous sessions and progress
- Provide targeted interventions based on their specific needs
- Offer practical exercises and coping strategies
- Check in on goals and emotional state regularly
`,
    prompt,
    maxSteps: 5,
    temperature: 0.7,
    tools: { 
      "onboarding": onboardingTool, 
      "therapy": therapyTool,
      "memory": memoryTool 
    },
  });

  console.log("\n" + result.text);
}

console.log(`
<<<<<<< HEAD
✨ Welcome to Your Personal Therapy Space ✨
Hi, I'm Maya - your AI therapeutic companion.

I'm here to:
• Help you understand your current life situation
• Provide personalized emotional support
• Guide you through challenges with evidence-based techniques
• Remember our conversations to build continuity in your journey

Type 'exit' to end our session, or just start sharing what's on your mind.
`);
=======
  🔥🔥🔥 Welcome to The Meme Prophet's Future Telling Service 🔥🔥🔥
  I know your vibes... and what you're about to post
  Type \`exit\` to leave the chat (touch grass)
  `);
>>>>>>> 837be82965c6ec476010fbe0c2516cb6812894ac

function main() {
  readline.question("You: ", async (input: string) => {
    if (input.toLowerCase() === "exit") {
      console.log("\nThank you for sharing this time with me. Remember, growth is a journey, and you're doing great. Take care! 💙");
      readline.close();
      return;
    }

    await generateResponse(input, "user_001");
    main();
  });
}

main();