import { env } from "@/env";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { memoryService } from "@/core/memory-service";
// import { therapyService } from "@/core/therapy-service";
import { onboardingService } from "@/core/onboarding-service";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userSessions = new Map<string, any>();

async function generateResponse(prompt: string, userId: string = "default") {
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const userContext = memoryService.getUserContext(userId);
  
  const needsOnboarding = !userContext.onboardingData;
  
  let contextInfo = "";
  if (needsOnboarding) {
    contextInfo = "This appears to be a new user who needs onboarding.";
  } else {
    contextInfo = `User context: ${JSON.stringify(userContext, null, 2)}`;
  }

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

${contextInfo}

When users are new, gently gather information about:
- Their name and what they'd like to be called
- What brings them here and what's on their mind
- Their current emotional state and challenges
- Their stress level and support system
- What they hope to achieve

For ongoing conversations:
- Reference their previous sessions and progress
- Provide targeted interventions based on their specific needs
- Offer practical exercises and coping strategies
- Check in on goals and emotional state regularly

Always respond with empathy and provide concrete, actionable advice.
`,
    prompt,
    temperature: 0.7,
    maxTokens: 1000,
  });

  if (needsOnboarding && prompt.toLowerCase().includes("my name is") || prompt.toLowerCase().includes("i'm") || prompt.toLowerCase().includes("call me")) {
    const responses = {
      name: extractName(prompt),
      emotion: prompt,
      challenges: prompt,
      stress: "5", 
      support: "",
      priorities: "",
      goals: "",
      therapeuticGoals: ""
    };
    
    try {
      const onboardingData = await onboardingService.processOnboarding(responses, userId);
      memoryService.storeMemory(userId, 'onboarding', onboardingData, 'high');
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  }

  try {
    const sessionData = {
      input: prompt,
      timestamp: new Date(),
      mood: extractMood(prompt)
    };
    memoryService.storeMemory(userId, 'session', sessionData, 'medium');
  } catch (error) {
    console.error("Session storage error:", error);
  }

  console.log("\n" + result.text);
}

function extractName(text: string): string {
  const namePatterns = [
    /my name is (\w+)/i,
    /i'm (\w+)/i,
    /call me (\w+)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function extractMood(text: string): string {
  const moodKeywords = {
    anxious: ['anxious', 'worried', 'nervous', 'stressed'],
    sad: ['sad', 'depressed', 'down', 'low'],
    angry: ['angry', 'frustrated', 'irritated', 'mad'],
    hopeful: ['hopeful', 'optimistic', 'positive', 'good'],
    confused: ['confused', 'uncertain', 'lost', 'unclear']
  };

  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return mood;
    }
  }
  return 'neutral';
}

console.log(`
✨ Welcome to Your Personal Therapy Space ✨
Hi, I'm Maya - your AI therapeutic companion.

I'm here to:
• Help you understand your current life situation
• Provide personalized emotional support
• Guide you through challenges with evidence-based techniques
• Remember our conversations to build continuity in your journey

Type 'exit' to end our session, or just start sharing what's on your mind.
`);

function main() {
  readline.question("You: ", async (input: string) => {
    if (input.toLowerCase() === "exit") {
      console.log(
        "\nThank you for sharing this time with me. Remember, growth is a journey, and you're doing great. Take care! 💙"
      );
      readline.close();
      return;
    }

    await generateResponse(input, "user_001");
    main();
  });
}

main();