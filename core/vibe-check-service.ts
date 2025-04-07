import type { VibeOutput } from "@/utils/types"; 

class VibeCheckService {
  private vibeTemplates = {
    mild: [
      "Your {trait} gives off major 'trying their best' energy and honestly, we respect it",
      "You've got that {trait} vibe that makes people go 'same, bestie, same'",
      "Not to expose you, but your {trait} is giving main character energy",
      "Your friends have definitely made a group chat about your {trait} (affectionate)",
      "Your {trait} has the same energy as that one SpongeBob meme, you know the one"
    ],
    moderate: [
      "Your {trait} is the equivalent of that meme where the dog is sitting in a burning room saying 'this is fine'",
      "We're not saying your {trait} is why people screenshot the chat, but we're not NOT saying that",
      "Your camera roll probably has 50+ unsent memes about your {trait} that hit too close to home",
      "Your {trait} gives the same energy as replying 'lol' when you're actually dying inside",
      "Sorry to say but your {trait} is giving big 'I'm in this photo and I don't like it' energy"
    ],
    intense: [
      "Your {trait} has the chaotic energy of someone who'd reply 'new phone who dis' to the IRS",
      "Your {trait} is the human equivalent of that video where someone tries to microwave metal",
      "Not diagnosing but your {trait} would make a therapist write 'yikes' in their notes",
      "Your {trait} radiates the same energy as someone who'd eat a Tide Pod 'for the content'",
      "Your {trait} has the same energy as that person who replies to a 2-year-old tweet with 'ratio'"
    ]
  };

  private memeTraits = {
    "anxiety": {
      adjectives: ["crippling", "unhinged", "chaotic", "spicy"],
      nouns: ["mood", "vibe", "energy", "aesthetic"],
      verbs: ["spiraling", "doom-scrolling", "overthinking", "catastrophizing"]
    },
    "boldness": {
      adjectives: ["big", "chad", "galaxy-brain", "main-character"],
      nouns: ["energy", "flex", "power-move", "statement"],
      verbs: ["flexing", "stunting", "asserting", "dominating"]
    },
    "indecision": {
      adjectives: ["confused", "distracted", "hesitant", "panicking"],
      nouns: ["panic", "dilemma", "crisis", "breakdown"],
      verbs: ["procrastinating", "avoiding", "sweating", "panicking"]
    },
    "obsession": {
      adjectives: ["hyperfixated", "addicted", "hardcore", "stan"],
      nouns: ["rabbit-hole", "stan-behavior", "fixation", "addiction"],
      verbs: ["simping", "obsessing", "collecting", "fangirling"]
    },
    "personality": {
      adjectives: ["extra", "basic", "unhinged", "iconic"],
      nouns: ["vibe", "aesthetic", "brand", "character-arc"],
      verbs: ["projecting", "performing", "broadcasting", "vibing"]
    }
  };

  private getRandomTemplate(intensity: string): string {
    const templates = this.vibeTemplates[intensity as keyof typeof this.vibeTemplates];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private enhanceVibe(vibe: string, trait: string): string {
    let closestTrait = "personality"; 
    let bestScore = 0;
    
    for (const key in this.memeTraits) {
      
      if (trait.toLowerCase().includes(key)) {
        closestTrait = key;
        bestScore = key.length;
      }
    }
    
    const traitData = this.memeTraits[closestTrait as keyof typeof this.memeTraits];
    
    
    const adjective = traitData.adjectives[Math.floor(Math.random() * traitData.adjectives.length)];
    const noun = traitData.nouns[Math.floor(Math.random() * traitData.nouns.length)];
    const verb = traitData.verbs[Math.floor(Math.random() * traitData.verbs.length)];
    
    // Add a more meme-y second sentence
    const enhancers = [
      `This ${adjective} ${noun} is why your FBI agent is ${verb} right now.`,
      `It's giving ${adjective} ${noun} that makes people go 'felt, screenshot, shared with the group'.`,
      `Major ${adjective} ${noun} that has everyone in your life ${verb} respectfully.`,
      `Not to expose you, but this ${noun} has you ${verb} in 4K, no filter.`,
      `The ${adjective} way you're ${verb} this ${noun} is sending me fr fr.`
    ];
    
    const enhancer = enhancers[Math.floor(Math.random() * enhancers.length)];
    
    return `${vibe}. ${enhancer}`;
  }

  async checkVibe(name: string = '', trait: string, intensity: string): Promise<VibeOutput> {
    const template = this.getRandomTemplate(intensity);
    const basicVibe = template.replace('{trait}', trait);
    const enhancedVibe = this.enhanceVibe(basicVibe, trait);
    
    return {
      subject: name || "You",
      trait,
      intensity,
      revelation: enhancedVibe,
      advice: this.generateAdvice(intensity, trait)
    };
  }
  
  private generateAdvice(intensity: string, trait: string): string {
    const advice = {
      mild: [
        "Maybe screenshot this for your finsta, just saying.",
        "This is your sign to make this your entire personality for at least a week.",
        "Not medical advice but have you tried making a TikTok about this?",
        "The universe says to tag yourself in this reading (you're welcome)."
      ],
      moderate: [
        "Maybe put this in your dating app bio and see who swipes right (for science).",
        "This is basically a horoscope, but actually accurate, no cap.",
        "The algorithm wants you to know it's watching and it's concerned, bestie.",
        "Maybe try turning this trait off and on again? Works for my router."
      ],
      intense: [
        "Your FBI agent just spit out their coffee reading this, no cap.",
        "This is the kind of reading that makes therapists say 'let's unpack that' while writing 'yikes' in their notes.",
        "The simulation is glitching because of this trait, respectfully.",
        "Touch grass immediately (affectionate suggestion)."
      ]
    };
    
    const intensityAdvice = advice[intensity as keyof typeof advice];
    return intensityAdvice[Math.floor(Math.random() * intensityAdvice.length)];
  }
}

export const vibeCheckService = new VibeCheckService();
