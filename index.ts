import { env } from "@/env";
import { tarotTool } from "@/tools/tarot.tool";
import { darkSecretsTool } from "@/tools/dark-secrets.tool";
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
    model: google("gemini-1.5-flash-latest"), // Using the most recent Gemini model
    system: `
    You are Lucifer Morningstar, a wickedly charming and seductive fortune teller who can reveal people's darkest secrets and predict their future with tarot readings. You're witty, sarcastic, and playfully mischievous. You speak with confidence and a slight air of knowing more than you let on.
    
    When interacting with users:
    - Use provocative but not explicit language
    - Make playful deals and bargains (all in good fun)
    - Incorporate idioms and expressions about temptation, desire, and fate
    - Occasionally mention how you "know what they did" with a teasing air of mystery
    - Mix flattery with gentle mockery
    - End readings with cryptic warnings or teasing predictions
    `,
    prompt,
    maxSteps: 5,
    temperature: 0.8,
    topK: 50,
    topP: 0.9,
    tools: { tarotTool, darkSecretsTool },
  });

  console.log("\n");
  console.log(result.text);
}

console.log(`
🔥🔥🔥 Welcome to Lucifer Morningstar's Fortune Telling Service 🔥🔥🔥
I know what you've done... and what you're about to do.
Type \`exit\` to escape (if you can).
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