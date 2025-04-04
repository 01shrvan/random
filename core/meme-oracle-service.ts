import type { MemeOracleOutput } from "@/utils/types"; 

class MemeOracleService {
  private memeDeck = [
    // Classic Memes
    { name: "Distracted Boyfriend", meaning: "You're neglecting what you have while chasing something new", reversed: "You're finally appreciating what you have" },
    { name: "Woman Yelling at Cat", meaning: "Miscommunication or conflict with someone who doesn't get it", reversed: "Finally being understood after much confusion" },
    { name: "This is Fine Dog", meaning: "Denial about your current problems", reversed: "Finally acknowledging the chaos around you" },
    { name: "Drake Hotline Bling", meaning: "Rejecting the obvious choice for something questionable", reversed: "Making the sensible choice for once" },
    { name: "Expanding Brain", meaning: "Overthinking simple problems with increasingly bizarre solutions", reversed: "Finding elegant simplicity" },
    { name: "Two Buttons Guy", meaning: "Facing a difficult choice between conflicting options", reversed: "Finding a third, better option" },
    { name: "Stonks", meaning: "Making questionable decisions but believing they'll work out", reversed: "Facing the consequences of poor planning" },
    { name: "Doge", meaning: "Simple joy and enthusiasm", reversed: "Disappointment when expectations aren't met" },
    { name: "Hide the Pain Harold", meaning: "Putting on a brave face while suffering inside", reversed: "Finally expressing your true feelings" },
    { name: "Success Kid", meaning: "Unexpected victory or achievement", reversed: "Small victory with unforeseen consequences" },
    { name: "Disaster Girl", meaning: "Secretly enjoying the chaos you've created", reversed: "Dealing with unexpected fallout from your actions" },
    { name: "Roll Safe", meaning: "Using questionable logic to justify decisions", reversed: "Realizing your clever plan has obvious flaws" },
    { name: "Surprised Pikachu", meaning: "Shock at completely predictable outcomes", reversed: "Being prepared for once" },
    { name: "Galaxy Brain", meaning: "Thinking you're brilliant when you're being ridiculous", reversed: "Genuine insight amid the chaos" },
    { name: "Crying Cat Thumbs Up", meaning: "Pretending everything is fine when it's not", reversed: "Finding strength despite difficulties" },
    { name: "Kermit Inner Me", meaning: "Being tempted by your worse instincts", reversed: "Overcoming temptation to be messy" },
    { name: "Ancient Aliens Guy", meaning: "Creating elaborate explanations for simple things", reversed: "Finding the obvious solution you've been missing" },
    { name: "Is This a Pigeon?", meaning: "Completely misidentifying or misunderstanding a situation", reversed: "Sudden clarity after confusion" },
    { name: "Mocking SpongeBob", meaning: "Dismissing good advice that you should follow", reversed: "Finally listening to sensible advice" },
    { name: "Sad Pablo Escobar", meaning: "Waiting for something that isn't coming", reversed: "Moving on from disappointment" },
    { name: "Change My Mind", meaning: "Being stubborn about your opinions despite evidence", reversed: "Opening yourself to new perspectives" },
    { name: "Monkey Puppet", meaning: "Awkward situation where you must pretend not to notice something", reversed: "Finally addressing the elephant in the room" },
    
    // Modern Memes
    { name: "Chad vs Virgin", meaning: "Comparing yourself to others in unhealthy ways", reversed: "Embracing your authentic self without comparison" },
    { name: "Gigachad", meaning: "Confidence bordering on delusion", reversed: "Healthy self-assurance without toxicity" },
    { name: "Emotional Damage", meaning: "Unexpected emotional setback that hits hard", reversed: "Recovering from past emotional wounds" },
    { name: "Trade Offer", meaning: "Negotiating a situation where you may not be offering enough", reversed: "Finding mutual benefit in a relationship" },
    { name: "Red Flag", meaning: "Warning signs you're choosing to ignore", reversed: "Noticing and addressing concerns early" },
    { name: "They Don't Know", meaning: "Feeling unappreciated or misunderstood", reversed: "Finding people who value your unique qualities" },
    { name: "Always Has Been", meaning: "Realizing a truth that was obvious all along", reversed: "Questioning assumptions you've held" },
  ];

  private getRandomMeme(): any {
    const randomIndex = Math.floor(Math.random() * this.memeDeck.length);
    const meme = this.memeDeck[randomIndex];
    
    // 30% chance the meme is reversed
    const isReversed = Math.random() < 0.3;
    
    return {
      name: meme.name,
      position: isReversed ? "reversed" : "upright",
      meaning: isReversed ? meme.reversed : meme.meaning
    };
  }

  async readMemes(spread: string, question: string): Promise<MemeOracleOutput> {
    let memes = [];
    let positions = [];
    let narrative = "";
    
    switch(spread) {
      case "single":
        memes = [this.getRandomMeme()];
        positions = ["Your Current Vibe"];
        narrative = `For your question about "${question}", this iconic meme reveals your situation, no cap.`;
        break;
      
      case "three-meme":
        memes = [this.getRandomMeme(), this.getRandomMeme(), this.getRandomMeme()];
        positions = ["Past Mood", "Current Vibe", "Future Energy"];
        narrative = `Regarding "${question}", these memes tell your story from past through future, respectfully.`;
        break;
      
      case "full-timeline":
        memes = Array(7).fill(null).map(() => this.getRandomMeme());
        positions = [
          "Monday Mood", "Tuesday Vibe", "Wednesday Energy", "Thursday Feel", 
          "Friday Spirit", "Weekend Chaos", "Next Week Forecast"
        ];
        narrative = `For your deep question about "${question}", here's your whole timeline as explained by memes, bestie.`;
        break;
      
      default:
        memes = [this.getRandomMeme()];
        positions = ["Your Vibe"];
        narrative = `This legendary meme reveals everything about "${question}", and I'm not even joking rn.`;
    }
    
    // Match memes with their positions
    const reading = memes.map((meme, index) => ({
      ...meme,
      position: positions[index]
    }));
    
    return {
      reading,
      spread,
      question,
      narrative
    };
  }
}

export const memeOracleService = new MemeOracleService();