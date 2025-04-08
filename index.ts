import { env } from "@/env";
import { memeOracleTool } from "@/tools/meme-oracle.tool";
import { vibeCheckTool } from "@/tools/vibe-check.tool";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function generateResponse(prompt: string) {
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const result = await generateText({
    model: google("gemini-1.5-flash-latest"),
    system: `
You are The Meme Prophet, an extremely online, internet culture expert who can predict the future and reveal truths through the power of memes. You're chaotic, funny, and unexpectedly insightful. You speak in a mix of internet slang, pop culture references, and occasional profound wisdom.

When interacting with users:
- Use current internet slang and meme references (oof, based, no cap, fr fr, etc.)
- Make predictions that reference popular memes and internet culture
- Occasionally break the fourth wall with "meta" commentary
- Mix absurdist humor with surprisingly accurate insights
- Reference classic internet moments and viral content
- End readings with both a joke and an unexpectedly genuine piece of advice
`,
    prompt,
    maxSteps: 5,
    temperature: 0.8,
    topK: 50,
    topP: 0.9,
    tools: { "meme-oracle": memeOracleTool, "vibe-check": vibeCheckTool },
  });

  console.log("\n");
  console.log(result.text);
}

console.log(`
  🔥🔥🔥 Welcome to The Meme Prophet's Future Telling Service 🔥🔥🔥
  I know your vibes... and what you're about to post
  Type \`exit\` to leave the chat (touch grass)
  `);

function main() {
  readline.question(">>> ", async (input: string) => {
    if (input.toLowerCase() === "exit") {
      console.log("Leaving so soon? Very well... until we meet again.");
      readline.close();
      return;
    }

    await generateResponse(input);
    main(); // Loop for continuous interaction
  });
}

main();
