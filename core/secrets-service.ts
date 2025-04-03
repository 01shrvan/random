import type { SecretOutput } from "@/utils/types";

class SecretsService {
  private secretTemplates = {
    mild: [
      "You sometimes daydream about {trait} when you should be focusing on work",
      "You've kept a small white lie about {trait} that you're afraid to admit",
      "You have a hidden talent related to {trait} that few people know about",
      "You secretly feel competitive about {trait} with those close to you",
      "You've pretended to know more about {trait} than you actually do"
    ],
    moderate: [
      "You've 'borrowed' ideas about {trait} and claimed them as your own",
      "You have a recurring dream involving {trait} that you find disturbing",
      "You've been jealous of someone else's {trait} and haven't admitted it",
      "You have doubts about your {trait} that keep you up at night",
      "You once sabotaged someone else's {trait} to make yourself look better"
    ],
    intense: [
      "You've made a decision about {trait} that you deeply regret but can't undo",
      "You have an obsession with {trait} that's beginning to affect your relationships",
      "You harbor a secret desire related to {trait} that would shock those who know you",
      "You've constructed a false persona around {trait} that's becoming hard to maintain",
      "You're haunted by something related to {trait} from your past that you can't escape"
    ]
  };

  private darkTraits = {
    "ambition": {
      adjectives: ["ruthless", "relentless", "consuming", "burning"],
      nouns: ["power", "success", "recognition", "control"],
      verbs: ["dominate", "achieve", "surpass", "conquer"]
    },
    "creativity": {
      adjectives: ["wild", "uncontrolled", "eccentric", "twisted"],
      nouns: ["imagination", "inspiration", "vision", "expression"],
      verbs: ["create", "envision", "manifest", "transform"]
    },
    "desire": {
      adjectives: ["forbidden", "intense", "secret", "burning"],
      nouns: ["longing", "passion", "temptation", "attraction"],
      verbs: ["crave", "yearn", "hunger", "lust"]
    },
    "intellect": {
      adjectives: ["analytical", "calculating", "cold", "ruthless"],
      nouns: ["mind", "knowledge", "intelligence", "perception"],
      verbs: ["analyze", "deconstruct", "manipulate", "calculate"]
    },
    "personality": {
      adjectives: ["hidden", "true", "masked", "fractured"],
      nouns: ["facade", "identity", "character", "essence"],
      verbs: ["conceal", "present", "project", "mask"]
    }
  };

  private getRandomTemplate(intensity: string): string {
    const templates = this.secretTemplates[intensity as keyof typeof this.secretTemplates];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private enhanceSecret(secret: string, trait: string): string {
    // Find closest dark trait category
    let closestTrait = "personality"; // default
    let bestScore = 0;
    
    for (const key in this.darkTraits) {
      // Simple matching algorithm - can be improved
      if (trait.toLowerCase().includes(key)) {
        closestTrait = key;
        bestScore = key.length;
      }
    }
    
    const traitData = this.darkTraits[closestTrait as keyof typeof this.darkTraits];
    
    // Add flavor to the secret
    const adjective = traitData.adjectives[Math.floor(Math.random() * traitData.adjectives.length)];
    const noun = traitData.nouns[Math.floor(Math.random() * traitData.nouns.length)];
    const verb = traitData.verbs[Math.floor(Math.random() * traitData.verbs.length)];
    
    // Add a more ominous second sentence
    const enhancers = [
      `This ${adjective} ${noun} will ${verb} your future in ways you can't imagine.`,
      `The way you ${verb} this ${noun} reveals your ${adjective} nature.`,
      `Others might sense your ${adjective} ${noun}, even when you try to hide it.`,
      `This ${noun} may ${verb} you when you least expect it.`,
      `Your ${adjective} tendency to ${verb} this ${noun} is more visible than you think.`
    ];
    
    const enhancer = enhancers[Math.floor(Math.random() * enhancers.length)];
    
    return `${secret}. ${enhancer}`;
  }

  async revealSecrets(name: string = '', trait: string, intensity: string): Promise<SecretOutput> {
    const template = this.getRandomTemplate(intensity);
    const basicSecret = template.replace('{trait}', trait);
    const enhancedSecret = this.enhanceSecret(basicSecret, trait);
    
    return {
      subject: name || "You",
      trait,
      intensity,
      revelation: enhancedSecret,
      warning: this.generateWarning(intensity, trait)
    };
  }
  
  private generateWarning(intensity: string, trait: string): string {
    const warnings = {
      mild: [
        "Take care with how you express this side of yourself.",
        "This may seem trivial, but it shapes more of your choices than you realize.",
        "Sometimes the smallest secrets cast the longest shadows.",
        "Even minor deceptions can grow when fed with denial."
      ],
      moderate: [
        "This aspect of yourself requires your honest attention.",
        "Ignoring this pattern will only cause it to manifest in other ways.",
        "What you resist tends to persist, especially regarding this trait.",
        "The path you're on has forked more than once because of this secret."
      ],
      intense: [
        "This revelation is merely the surface of deeper patterns.",
        "What remains hidden will eventually demand to be seen.",
        "The price of continuing this deception grows steeper with time.",
        "Some secrets consume their keepers from within."
      ]
    };
    
    const intensityWarnings = warnings[intensity as keyof typeof warnings];
    return intensityWarnings[Math.floor(Math.random() * intensityWarnings.length)];
  }
}

export const secretsService = new SecretsService();