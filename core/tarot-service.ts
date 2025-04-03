import type { TarotOutput } from "@/utils/types";

class TarotService {
  private tarotDeck = [
    // Major Arcana
    { name: "The Fool", meaning: "New beginnings, innocence, spontaneity", reversed: "Recklessness, risk-taking, inconsideration" },
    { name: "The Magician", meaning: "Manifestation, resourcefulness, power", reversed: "Manipulation, poor planning, untapped talents" },
    { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, disconnected from intuition, withdrawal" },
    { name: "The Empress", meaning: "Femininity, beauty, nature, abundance", reversed: "Creative block, dependence on others, emptiness" },
    { name: "The Emperor", meaning: "Authority, structure, control, fatherhood", reversed: "Domination, excessive control, rigidity" },
    { name: "The Hierophant", meaning: "Spiritual wisdom, tradition, conformity", reversed: "Rebellion, subversiveness, new ideas" },
    { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment", reversed: "Disbalance, one-sidedness, disharmony" },
    { name: "The Chariot", meaning: "Control, willpower, success, determination", reversed: "Lack of direction, aggression, defeat" },
    { name: "Strength", meaning: "Courage, persuasion, influence, compassion", reversed: "Self-doubt, weakness, insecurity" },
    { name: "The Hermit", meaning: "Soul-searching, introspection, guidance", reversed: "Isolation, loneliness, withdrawal" },
    { name: "Wheel of Fortune", meaning: "Change, cycles, fate, destiny", reversed: "Bad luck, resistance to change, breaking cycles" },
    { name: "Justice", meaning: "Justice, fairness, truth, cause and effect", reversed: "Unfairness, dishonesty, lack of accountability" },
    { name: "The Hanged Man", meaning: "Suspension, letting go, surrender", reversed: "Delays, resistance, indecision" },
    { name: "Death", meaning: "End of cycle, transitions, transformation", reversed: "Resistance to change, inability to move on" },
    { name: "Temperance", meaning: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, lack of harmony" },
    { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment" },
    { name: "The Tower", meaning: "Sudden change, upheaval, revelation, awakening", reversed: "Fear of change, avoiding disaster, delayed disaster" },
    { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, discouragement" },
    { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious", reversed: "Release of fear, repressed emotions, confusion" },
    { name: "The Sun", meaning: "Joy, success, celebration, positivity", reversed: "Temporary depression, lack of success" },
    { name: "Judgment", meaning: "Rebirth, inner calling, absolution", reversed: "Self-doubt, lack of self-awareness, failure to learn lessons" },
    { name: "The World", meaning: "Completion, accomplishment, travel", reversed: "Lack of closure, incomplete goals, stagnation" },
    
    // Selected cards from Minor Arcana
    { name: "Ace of Cups", meaning: "New feelings, intuition, intimacy", reversed: "Emotional loss, blocked creativity, emptiness" },
    { name: "Nine of Swords", meaning: "Anxiety, hopelessness, trauma", reversed: "Hope, reaching out, despair" },
    { name: "Ten of Pentacles", meaning: "Legacy, family, establishment", reversed: "Family disputes, bankruptcy, loss of home" },
    { name: "Knight of Wands", meaning: "Energy, passion, impulsiveness", reversed: "Delays, frustration, scattered energy" },
    { name: "Queen of Cups", meaning: "Compassion, calm, comfort", reversed: "Martyrdom, insecurity, dependence" },
    { name: "King of Swords", meaning: "Mental clarity, authority, truth", reversed: "Manipulation, cruelty, harsh judgment" },
  ];

  private getRandomCard(): any {
    const randomIndex = Math.floor(Math.random() * this.tarotDeck.length);
    const card = this.tarotDeck[randomIndex];
    
    // 30% chance the card is reversed
    const isReversed = Math.random() < 0.3;
    
    return {
      name: card.name,
      position: isReversed ? "reversed" : "upright",
      meaning: isReversed ? card.reversed : card.meaning
    };
  }

  async drawCards(spread: string, question: string): Promise<TarotOutput> {
    let cards = [];
    let positions = [];
    let narrative = "";
    
    switch(spread) {
      case "single":
        cards = [this.getRandomCard()];
        positions = ["Your Current Situation"];
        narrative = `For your question about "${question}", the card reveals your path.`;
        break;
      
      case "three-card":
        cards = [this.getRandomCard(), this.getRandomCard(), this.getRandomCard()];
        positions = ["Past", "Present", "Future"];
        narrative = `Regarding "${question}", these cards reveal your journey from past through future.`;
        break;
      
      case "celtic-cross":
        cards = Array(10).fill(null).map(() => this.getRandomCard());
        positions = [
          "Present", "Challenge", "Past", "Future", "Above", 
          "Below", "Advice", "External Influence", "Hopes/Fears", "Outcome"
        ];
        narrative = `For your deep inquiry about "${question}", the celtic cross reveals the complex forces at work.`;
        break;
      
      default:
        cards = [this.getRandomCard()];
        positions = ["Your Path"];
        narrative = `The card reveals insights about "${question}".`;
    }
    
    // Match cards with their positions
    const reading = cards.map((card, index) => ({
      ...card,
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

export const tarotService = new TarotService();